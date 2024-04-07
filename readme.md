# stimulus 运行原理分析

## start 阶段

```ts
const application = Application.start();


//application.ts
 async start() {
    await domReady() //等待文档加载完成
    this.logDebugActivity("application", "starting")
    this.dispatcher.start()
    this.router.start()
    this.logDebugActivity("application", "start")
  }
```

调用 Application.start()后会创建 Application 示例，为其初始化 dispatcher，router 实例，然后等待文档加载完成后，将后续启动过程加入微队列。所以会先进入 register 阶段。

## register 阶段

```ts
application.register("demo", Demo);

/**
 * application.register()会将id，与构造函数维护成一个Definition对象，定义如下
 *
 */
export interface Definition {
  identifier: string
  controllerConstructor: ControllerConstructor
}

//然后会调用router模块加载
this.router.loadDefinition(definition)

//router.ts
loadDefinition(definition: Definition) {
    this.unloadIdentifier(definition.identifier)
    //实例化一个module
    const module = new Module(this.application, definition)
    this.connectModule(module)
    const afterLoad = (definition.controllerConstructor as any).afterLoad
    if (afterLoad) {
      afterLoad.call(definition.controllerConstructor, definition.identifier, this.application)
    }
}

//
 private connectModule(module: Module) {
    this.modulesByIdentifier.set(module.identifier, module)
    const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier)
    scopes.forEach((scope) => module.connectContextForScope(scope))
  }

//module.ts
constructor(application: Application, definition: Definition) {
    this.application = application
    //处理controller的定义
    this.definition = blessDefinition(definition)
    this.contextsByScope = new WeakMap()
    this.connectedContexts = new Set()
  }



//blessDefinition.ts
export function blessDefinition(definition: Definition): Definition {
  return {
    identifier: definition.identifier,
    //在这里，处理我们定义的controller
    controllerConstructor: bless(definition.controllerConstructor),
  }
}

//bless.ts
export function bless<T>(constructor: Blessable<T>): Constructor<T> {
  //返回一个shadowConstructor，该构造函数的原型是传入的controller的实例
  return shadow(constructor, getBlessedProperties(constructor))
}



function getBlessedProperties<T>(constructor: Constructor<T>) {
  /**
   *blessings=[
    ClassPropertiesBlessing,
    TargetPropertiesBlessing（ Target处理函数）,
    ValuePropertiesBlessing（ Values处理函数）,
    OutletPropertiesBlessing,
   ]
   */
  //会找到给定构造函数的所有原型，然后取出上面的所有blessings属性，在这里结果如上
  const blessings = readInheritableStaticArrayValues(constructor, "blessings") as Blessing<T>[]
  return blessings.reduce((blessedProperties, blessing) => {
    //在这里用上面提到的4个函数，递归的处理constructor的Class、Target、Value、 Outlet等静态属性
    const properties = blessing(constructor)
    for (const key in properties) {
      const descriptor = blessedProperties[key] || ({} as PropertyDescriptor)
      blessedProperties[key] = Object.assign(descriptor, properties[key])
    }
    return blessedProperties
  }, {} as PropertyDescriptorMap)

  /**
   * 最终返回的结果blessedProperties如下：
   *
   *
   */
}


//inheritable_statics.ts
//在处理 Class、target、 Outlet时使用这个函数获取原型树上的属性
export function readInheritableStaticArrayValues<T, U = string>(constructor: Constructor<T>, propertyName: string) {
  //获取构造函数的所有原型
  const ancestors = getAncestorsForConstructor(constructor)
  return Array.from(
    ancestors.reduce((values, constructor) => {
      //获取所有原型的StaticArray
      getOwnStaticArrayValues(constructor, propertyName).forEach((name) => values.add(name))
      return values
    }, new Set() as Set<U>)
  )
}

//在处理Value时，使用下面这个函数
export function readInheritableStaticObjectPairs<T, U>(constructor: Constructor<T>, propertyName: string) {
  const ancestors = getAncestorsForConstructor(constructor)
  return ancestors.reduce((pairs, constructor) => {
    pairs.push(...(getOwnStaticObjectPairs(constructor, propertyName) as any))
    return pairs
  }, [] as [string, U][])
}

function getOwnStaticObjectPairs<T, U>(constructor: Constructor<T>, propertyName: string) {
  const definition = (constructor as any)[propertyName]
  /**
   * 将controller上定义的value拆分成元组，[key,{define}]的形式
   *
   */
  return definition ? Object.keys(definition).map((key) => [key, definition[key]] as [string, U]) : []
}


```

### controller 基类

```ts
//controller.ts
export class Controller<ElementType extends Element = Element> {
  //定义data-target、data-value语法的处理函数
  static blessings = [
    ClassPropertiesBlessing,
    TargetPropertiesBlessing,
    ValuePropertiesBlessing,
    OutletPropertiesBlessing,
  ];

  //.............
}
```

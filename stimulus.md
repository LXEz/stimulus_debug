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
    controllerConstructor: bless(definition.controllerConstructor),
  }
}

```

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

## register 阶段

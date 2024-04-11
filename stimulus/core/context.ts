import { Application } from "./application";
import { BindingObserver } from "./binding_observer";
import { Controller } from "./controller";
import { Dispatcher } from "./dispatcher";
import { ErrorHandler } from "./error_handler";
import { Module } from "./module";
import { Schema } from "./schema";
import { Scope } from "./scope";
import { ValueObserver } from "./value_observer";
import { TargetObserver, TargetObserverDelegate } from "./target_observer";
import { OutletObserver, OutletObserverDelegate } from "./outlet_observer";
import { namespaceCamelize } from "./string_helpers";

export class Context
  implements ErrorHandler, TargetObserverDelegate, OutletObserverDelegate
{
  readonly module: Module;
  readonly scope: Scope;
  readonly controller: Controller;
  private bindingObserver: BindingObserver;
  private valueObserver: ValueObserver;
  private targetObserver: TargetObserver;
  private outletObserver: OutletObserver;
  private childrenNodes: Map<Element, NamedNodeMap>;

  constructor(module: Module, scope: Scope) {
    this.module = module;
    this.scope = scope;
    this.controller = new module.controllerConstructor(this);
    this.bindingObserver = new BindingObserver(this, this.dispatcher);
    this.valueObserver = new ValueObserver(this, this.controller);
    this.targetObserver = new TargetObserver(this, this);
    this.outletObserver = new OutletObserver(this, this);
    this.childrenNodes = new Map();

    try {
      this.controller.initialize();
      this.logDebugActivity("initialize");
    } catch (error: any) {
      this.handleError(error, "initializing controller");
    }
  }

  connect() {
    this.bindingObserver.start();
    this.valueObserver.start();
    this.targetObserver.start();
    this.outletObserver.start();
    //处理子节点
    this.handleChildrenNodes();

    try {
      this.controller.connect();
      this.logDebugActivity("connect");
    } catch (error: any) {
      this.handleError(error, "connecting controller");
    }
  }

  refresh() {
    this.outletObserver.refresh();
  }

  //缓存子节点

  cacheChildrenNode() {
    Array.from(this.element.children).forEach((dom) => {
      this.childrenNodes.set(dom, dom.attributes);
    });
  }

  handleChildrenNodes() {
    this.cacheChildrenNode();

    const findSlotNodeInChildren = () => {
      let childrenMap = this.childrenNodes;

      let values = childrenMap.entries();

      for (const [dom, value] of values) {
        const slotName = value.getNamedItem("slot")?.nodeValue;
        if (!slotName) {
          continue;
        }
        //匹配到slot

        this.scope.slots.add({
          element: dom,
          controller: this.controller,
          name: slotName,
        });
      }
    };

    //找到当前子节点中作为插槽的部分
    findSlotNodeInChildren();
  }
  disconnect() {
    try {
      this.controller.disconnect();
      this.logDebugActivity("disconnect");
    } catch (error: any) {
      this.handleError(error, "disconnecting controller");
    }

    this.outletObserver.stop();
    this.targetObserver.stop();
    this.valueObserver.stop();
    this.bindingObserver.stop();
  }

  get application(): Application {
    return this.module.application;
  }

  get identifier(): string {
    return this.module.identifier;
  }

  get schema(): Schema {
    return this.application.schema;
  }

  get dispatcher(): Dispatcher {
    return this.application.dispatcher;
  }

  get element(): Element {
    return this.scope.element;
  }

  get parentElement(): Element | null {
    return this.element.parentElement;
  }

  // Error handling

  handleError(error: Error, message: string, detail: object = {}) {
    const { identifier, controller, element } = this;
    detail = Object.assign({ identifier, controller, element }, detail);
    this.application.handleError(error, `Error ${message}`, detail);
  }

  // Debug logging

  logDebugActivity = (functionName: string, detail: object = {}): void => {
    const { identifier, controller, element } = this;
    detail = Object.assign({ identifier, controller, element }, detail);
    this.application.logDebugActivity(this.identifier, functionName, detail);
  };

  // Target observer delegate

  targetConnected(element: Element, name: string) {
    this.invokeControllerMethod(`${name}TargetConnected`, element);
  }

  targetDisconnected(element: Element, name: string) {
    this.invokeControllerMethod(`${name}TargetDisconnected`, element);
  }

  // Outlet observer delegate

  outletConnected(outlet: Controller, element: Element, name: string) {
    this.invokeControllerMethod(
      `${namespaceCamelize(name)}OutletConnected`,
      outlet,
      element
    );
  }

  outletDisconnected(outlet: Controller, element: Element, name: string) {
    this.invokeControllerMethod(
      `${namespaceCamelize(name)}OutletDisconnected`,
      outlet,
      element
    );
  }

  // Private

  invokeControllerMethod(methodName: string, ...args: any[]) {
    const controller: any = this.controller;
    if (typeof controller[methodName] == "function") {
      controller[methodName](...args);
    }
  }
}

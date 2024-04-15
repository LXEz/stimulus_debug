import { Context } from "..";

/**
 * 在处理链条中记录当前的位置
 */
export class ProcessState {
  currentContext: Context | null;
  currentControllerDom: Element | null;
  observerHandle: ObserverHandle;
  description: string;

  constructor() {
    this.currentContext = null;
    this.observerHandle = ObserverHandle.NULL;
    this.currentControllerDom = null;
    this.description = "";
  }
}

enum ObserverHandle {
  HANDLE_ACTION,
  HANDLE_VALUE,
  HANDLE_OUTLET,
  HANDLE_TARGET,
  NULL,
}

import { Context } from "..";

/**
 * 在处理链条中记录当前的位置
 */
export class ProcessState {
  currentContext: Context | null;
  currentControllerDom: Element | null;
  observerHandle: ObserverHandle;
  description: string;
  currentDom: Element | null;
  removeOrAdd: AddOrRemove;
  isMutation: Boolean;
  elementObserverDom: Element | null;

  constructor() {
    this.currentContext = null;
    this.observerHandle = ObserverHandle.NULL;
    this.currentControllerDom = null;
    this.description = "";
    this.currentDom = null;
    this.removeOrAdd = AddOrRemove.NULL;
    this.isMutation = false;
    this.elementObserverDom = null;
  }
}

export enum ObserverHandle {
  HANDLE_ACTION = "HANDLE_ACTION",
  HANDLE_VALUE = "HANDLE_VALUE",
  HANDLE_OUTLET = "HANDLE_OUTLET",
  HANDLE_TARGET = "HANDLE_TARGET",
  NULL = "NULL",
}

export enum AddOrRemove {
  REMOVE = "REMOVE",
  ADD = "ADD",
  NULL = "NULL",
}

let process: ProcessState | null = null;
export function getProcess() {
  if (!process) {
    process = new ProcessState();
  }

  return process;
}

//@ts-ignore
window.getProcess = getProcess;

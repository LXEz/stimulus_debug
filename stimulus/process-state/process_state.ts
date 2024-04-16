import { Context, ElementObserver } from "..";

export enum MutationObserverType {
  ATTRIBUTE_CHANGE = "ATTRIBUTE_CHANGE",
  CHILD_LIST_ADD = "CHILD_LIST_ADD",
  CHILD_LIST_REMOVE = "CHILD_LIST_REMOVE",
  NULL = "NULL",
}

interface MutationObserverContext {
  /**
   *本次mutation是的类型
   */
  type: MutationObserverType;
  TargetElement: Element;
  attributeName: string;
  mutations: MutationRecord[] | null | any;
}
/**
 * 在处理链条中记录当前的位置
 */
export class ProcessState {
  currentContext: Context | null;
  /**
   * 当前context类对应的dom
   */
  currentControllerDom: Element | null;
  observerHandle: ObserverHandle;
  description: string;
  /**
   * 当前操作的dom
   */
  currentDom: Element | null;
  removeOrAdd: AddOrRemove;
  isMutation: Boolean;
  elementObserverDom: Element | null;
  mutationObserverContext: MutationObserverContext | null;

  constructor() {
    this.currentContext = null;
    this.observerHandle = ObserverHandle.NULL;
    this.currentControllerDom = null;
    this.description = "";
    this.currentDom = null;
    this.removeOrAdd = AddOrRemove.NULL;
    this.isMutation = false;
    this.elementObserverDom = null;
    this.mutationObserverContext = null;
  }
}

export function updateProcessByElementObserver(
  elementObserver: ElementObserver
) {
  const processState = getProcess();
  processState.mutationObserverContext = {
    type: MutationObserverType.NULL,
    TargetElement: elementObserver.element,
    attributeName: elementObserver.delegate.attributeName,
    mutations: null,
  };
}

export function updateMutationObserverContextType(type: MutationObserverType) {
  getProcess().mutationObserverContext!.type = type;
}

export function updateMutations(mutations: MutationRecord[] | null) {
  getProcess().mutationObserverContext!.mutations = mutations;
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

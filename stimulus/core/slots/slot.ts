import { Controller } from "..";

export interface Slot {
  name: String;
  element: Element[];
  controller: Controller;
}

export const DEFAULT_SLOTS_NAME = "defaultSlots";

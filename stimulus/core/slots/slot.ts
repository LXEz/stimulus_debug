import { Controller } from "..";

export interface Slot {
  name: String;
  element: string[];
  controller: Controller;
}

export const DEFAULT_SLOTS_NAME = "defaultSlots";

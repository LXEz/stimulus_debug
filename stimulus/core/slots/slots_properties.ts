import { Controller } from "../controller";
import { Constructor } from "../constructor";
import { readInheritableStaticArrayValues } from "../inheritable_statics";
import { DEFAULT_SLOTS_NAME } from "./slot";

export function SlotPropertiesBlessing<T>(constructor: Constructor<T>) {
  const slots = readInheritableStaticArrayValues(constructor, "slots");
  return slots.reduce((properties, targetDefinition) => {
    return Object.assign(
      properties,
      propertiesForSlotDefinition(targetDefinition)
    );
  }, {} as PropertyDescriptorMap);
}

function propertiesForSlotDefinition(name: string) {
  return {
    [name]: {
      get(this: Controller) {
        const target = getSlotByName(this, name);
        // const target = "TODO: 关联slot与上下文";
        if (target) {
          return target;
        } else {
          throw new Error(
            `Missing slots element "${name}" for "${this.identifier}" controller`
          );
        }
      },
    },

    defaultSlots: {
      get(this: Controller) {
        return getSlotByName(this, DEFAULT_SLOTS_NAME);
      },
    },
  };
}

function getSlotByName(con: Controller, name: string) {
  return Array.from(con.slots.values()).find((slot) => {
    if (slot.name == name) {
      return true;
    }
  });
}

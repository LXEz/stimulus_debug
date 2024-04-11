import { Controller } from "../controller";
import { Constructor } from "../constructor";
import { readInheritableStaticArrayValues } from "../inheritable_statics";

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
        const target = Array.from(this.slots.values()).find((slot) => {
          if (slot.name == name) {
            return true;
          }
        });
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
  };
}

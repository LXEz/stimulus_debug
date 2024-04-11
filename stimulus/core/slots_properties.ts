import { Controller } from "./controller";
import { Constructor } from "./constructor";
import { readInheritableStaticArrayValues } from "./inheritable_statics";

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
        const target = this.slots.has(name);
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

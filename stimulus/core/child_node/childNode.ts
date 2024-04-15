import { DEFAULT_SLOTS_NAME } from "../slots/slot";
import { Context } from "./../context";
//处理子节点
export function handleChildrenNodes(context: Context) {
  cacheChildrenNode(context);

  const childrenList = Array.from(context.childrenNodes);

  const handleDefaultSlots = () => {
    //过滤出default-slot
    const defaultSlots = childrenList.filter(([dom, value]) => {
      const isDefault = !value.getNamedItem("slot")?.nodeValue;

      if (isDefault) {
        removeChildFromDom(dom);
      }

      return isDefault;
    });

    context.scope.slots.add({
      element: defaultSlots.map(([dom]) => dom.outerHTML),
      name: DEFAULT_SLOTS_NAME,
      controller: context.controller,
    });
  };
  const findSlotNodeInChildren = () => {
    for (const [dom, value] of childrenList) {
      const slotName = value.getNamedItem("slot")?.nodeValue;
      if (!slotName) {
        continue;
      }
      //匹配到slot

      removeChildFromDom(dom);

      context.scope.slots.add({
        element: Array.from(dom.children).map((dom) => dom.outerHTML),
        controller: context.controller,
        name: slotName,
      });
    }
  };

  handleDefaultSlots();
  //找到当前子节点中作为插槽的部分
  findSlotNodeInChildren();
}

function cacheChildrenNode(context: Context) {
  Array.from(context.element.children).forEach((dom) => {
    context.childrenNodes.set(dom, (dom as Element).attributes);
  });
}

function removeChildFromDom(dom: Element) {
  const parent = dom.parentElement;
  parent?.removeChild(dom);
}

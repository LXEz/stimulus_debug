import { AttributeObserver } from "..";

export function attribute_match_strate(
  tree: Element,
  attributeObserver: AttributeObserver
): Element[] {
  //如果是HTML标签，则认为是首次加载
  if (tree.nodeName === "HTML") {
    const matchDa = tree.querySelector(attributeObserver.selector) ?? [];
    return [matchDa as Element];
  }

  const match = attributeObserver.matchElement(tree) ? [tree] : [];

  return match;
}

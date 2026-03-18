/**
 * Rehype plugin to wrap content between H2 headings into <section> elements.
 *
 * This enables section-based pagination for long chapters.
 * Each section gets a data-section-index and data-section-title attribute.
 *
 * Content before the first H2 becomes section 0 (intro).
 * Each H2 starts a new section containing all content until the next H2.
 */
import type { Root, Element, RootContent } from "hast";

export function rehypeSections() {
  return (tree: Root) => {
    const children = tree.children;
    const sections: RootContent[][] = [];
    const titles: string[] = [];
    let current: RootContent[] = [];

    for (const node of children) {
      if (
        node.type === "element" &&
        node.tagName === "h2"
      ) {
        // Push previous section
        if (current.length > 0 || sections.length === 0) {
          sections.push(current);
          if (sections.length === 1) {
            titles.push("Introduction");
          }
        }
        current = [node];
        // Extract title text from H2
        titles.push(getTextContent(node));
      } else {
        current.push(node);
      }
    }
    // Push final section
    if (current.length > 0) {
      sections.push(current);
      if (titles.length < sections.length) {
        titles.push("Introduction");
      }
    }

    // Only wrap if there are multiple sections (i.e., at least one H2)
    if (sections.length <= 1) return;

    tree.children = sections.map((sectionChildren, idx): Element => ({
      type: "element",
      tagName: "section",
      properties: {
        "data-section-index": idx,
        "data-section-title": titles[idx] || "",
        className: "chapter-section",
      },
      children: sectionChildren as Element["children"],
    }));
  };
}

function getTextContent(node: RootContent): string {
  if (node.type === "text") return node.value;
  if (node.type === "element" && node.children) {
    return node.children.map(getTextContent).join("");
  }
  return "";
}

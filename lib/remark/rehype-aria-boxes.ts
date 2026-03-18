/**
 * Rehype plugin to transform blockquotes with ARIA markers into styled boxes.
 *
 * Detects patterns like:
 *   > **ANALOGY**: Some explanation text...
 *
 * And transforms the blockquote into a div with appropriate classes.
 */
import type { Root, Element, Text } from "hast";
import { visit } from "unist-util-visit";

const ARIA_MARKERS: Record<string, { className: string; label: string }> = {
  ANALOGY: { className: "aria-analogy", label: "Analogy" },
  "REAL-LIFE": { className: "aria-reallife", label: "Real-Life Example" },
  INTUITION: { className: "aria-intuition", label: "Why This Exists" },
  EXERCISE: { className: "aria-exercise", label: "Try It Yourself" },
  CALLOUT: { className: "aria-callout", label: "Note" },
};

function getTextContent(node: Element): string {
  let text = "";
  visit(node, "text", (textNode: Text) => {
    text += textNode.value;
  });
  return text;
}

function findMarker(
  blockquote: Element
): { marker: string; info: (typeof ARIA_MARKERS)[string] } | null {
  // Look at the first paragraph's text content for a bold marker
  const firstChild = blockquote.children.find(
    (c): c is Element => c.type === "element" && c.tagName === "p"
  );
  if (!firstChild) return null;

  // Check if first child of paragraph is a <strong> tag
  const strongEl = firstChild.children.find(
    (c): c is Element => c.type === "element" && c.tagName === "strong"
  );
  if (!strongEl) return null;

  const strongText = getTextContent(strongEl);

  for (const [marker, info] of Object.entries(ARIA_MARKERS)) {
    if (strongText === marker) {
      // Check that after the strong, there's a ": " text
      const strongIdx = firstChild.children.indexOf(strongEl);
      const nextSibling = firstChild.children[strongIdx + 1];
      if (
        nextSibling &&
        nextSibling.type === "text" &&
        nextSibling.value.startsWith(": ")
      ) {
        // Remove the marker prefix from the text
        nextSibling.value = nextSibling.value.slice(2);
        // Remove the strong element
        firstChild.children.splice(strongIdx, 1);
        return { marker, info };
      }
    }
  }

  return null;
}

export function rehypeAriaBoxes() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "blockquote") return;

      const result = findMarker(node);
      if (!result) return;

      const { info } = result;

      // Transform blockquote into aria-box div
      node.tagName = "div";
      node.properties = {
        className: `aria-box ${info.className}`,
      };

      // Prepend the label
      const label: Element = {
        type: "element",
        tagName: "div",
        properties: { className: "aria-label" },
        children: [{ type: "text", value: info.label }],
      };

      node.children.unshift(label);
    });
  };
}

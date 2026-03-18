/**
 * Rehype plugin to detect ASCII diagram code blocks and mark them
 * with a special class for enhanced visual styling.
 *
 * Detects code blocks containing box-drawing characters like:
 * ─ │ ├ └ ┌ ┐ ┘ ┤ ┬ ┴ ═ ║ → ← ↓ ↑ ──→ ────
 */
import type { Root, Element, Text } from "hast";
import { visit } from "unist-util-visit";

const BOX_DRAWING_PATTERN = /[─│├└┌┐┘┤┬┴═║╔╗╚╝╠╣╦╩→←↓↑┼╬────]/;
const MIN_BOX_CHARS = 5;

function countBoxChars(text: string): number {
  let count = 0;
  for (const char of text) {
    if (BOX_DRAWING_PATTERN.test(char)) count++;
  }
  return count;
}

function getTextContent(node: Element): string {
  let text = "";
  visit(node, "text", (textNode: Text) => {
    text += textNode.value;
  });
  return text;
}

export function rehypeDiagramBlocks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      // Look for <pre> elements (code blocks)
      if (node.tagName !== "pre") return;

      const text = getTextContent(node);
      if (countBoxChars(text) >= MIN_BOX_CHARS) {
        // Mark with data attribute (survives Tailwind CSS purging)
        node.properties["data-diagram"] = "true";
      }
    });
  };
}

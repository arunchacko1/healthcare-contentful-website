export function richTextToPlainTextBlocks(value: unknown) {
  if (!value || typeof value !== "object") {
    return [];
  }

  const blocks = collectTextBlocks(value);

  return blocks.length > 0 ? blocks : [];
}

function collectTextBlocks(node: unknown): string[] {
  if (!node || typeof node !== "object") {
    return [];
  }

  const nodeRecord = node as Record<string, unknown>;
  const content = Array.isArray(nodeRecord.content) ? nodeRecord.content : [];

  if (nodeRecord.nodeType === "paragraph") {
    const paragraphText = collectTextLeaves(content).trim();

    return paragraphText ? [paragraphText] : [];
  }

  return content.flatMap((child) => collectTextBlocks(child));
}

function collectTextLeaves(nodes: unknown[]): string {
  return nodes
    .map((node) => {
      if (!node || typeof node !== "object") {
        return "";
      }

      const nodeRecord = node as Record<string, unknown>;

      if (typeof nodeRecord.value === "string") {
        return nodeRecord.value;
      }

      return Array.isArray(nodeRecord.content)
        ? collectTextLeaves(nodeRecord.content)
        : "";
    })
    .join("");
}

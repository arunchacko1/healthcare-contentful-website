import type { CmsRichTextDocument } from "@/lib/contentful/types";

export function createRichTextDocumentFromParagraphs(
  paragraphs: string[],
): CmsRichTextDocument {
  return {
    nodeType: "document",
    content: paragraphs.map((paragraph) => ({
      nodeType: "paragraph",
      content: [
        {
          nodeType: "text",
          value: paragraph,
          marks: [],
          data: {},
        },
      ],
      data: {},
    })),
  };
}

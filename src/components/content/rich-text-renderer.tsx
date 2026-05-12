import type { ReactNode } from "react";

type RichTextRendererProps = Readonly<{
  document: unknown;
}>;

type RichTextNode = Readonly<{
  nodeType?: string;
  value?: string;
  content?: RichTextNode[];
  data?: {
    uri?: string;
  };
}>;

export function RichTextRenderer({ document }: RichTextRendererProps) {
  const nodes = getContent(document);

  if (nodes.length === 0) {
    return null;
  }

  return <div className="grid gap-5">{nodes.map(renderNode)}</div>;
}

function renderNode(node: RichTextNode, index: number): ReactNode {
  const children = getContent(node).map(renderNode);
  const key = `${node.nodeType}-${index}`;

  switch (node.nodeType) {
    case "heading-2":
      return (
        <h2 className="text-2xl font-bold text-slate-950" key={key}>
          {children}
        </h2>
      );
    case "heading-3":
      return (
        <h3 className="text-xl font-semibold text-slate-950" key={key}>
          {children}
        </h3>
      );
    case "paragraph":
      return (
        <p className="leading-7 text-slate-600" key={key}>
          {children}
        </p>
      );
    case "unordered-list":
      return (
        <ul className="grid list-disc gap-2 pl-6 text-slate-600" key={key}>
          {children}
        </ul>
      );
    case "ordered-list":
      return (
        <ol className="grid list-decimal gap-2 pl-6 text-slate-600" key={key}>
          {children}
        </ol>
      );
    case "list-item":
      return <li key={key}>{children}</li>;
    case "hyperlink":
      return (
        <a
          className="font-medium text-teal-800 underline underline-offset-4"
          href={node.data?.uri}
          key={key}
        >
          {children}
        </a>
      );
    case "text":
      return node.value;
    default:
      return <div key={key}>{children}</div>;
  }
}

function getContent(value: unknown): RichTextNode[] {
  if (!value || typeof value !== "object") {
    return [];
  }

  const node = value as RichTextNode;

  return Array.isArray(node.content) ? node.content : [];
}

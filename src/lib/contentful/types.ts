export type CmsAsset = Readonly<{
  title: string;
  url: string;
  width?: number;
  height?: number;
  description?: string;
}>;

export type CmsRichTextDocument = Readonly<{
  nodeType: "document";
  content: unknown[];
}>;

export type CmsSeo = Readonly<{
  title: string;
  description: string;
  canonicalPath?: string;
  noIndex?: boolean;
  image?: CmsAsset;
}>;

export type CmsPage = Readonly<{
  title: string;
  slug: string;
  eyebrow?: string;
  heroTitle: string;
  heroText: string;
  body?: CmsRichTextDocument;
  seo: CmsSeo;
}>;

export type CmsService = Readonly<{
  title: string;
  slug: string;
  summary: string;
  description?: CmsRichTextDocument;
  careHighlights: string[];
  seo: CmsSeo;
}>;

export type CmsProvider = Readonly<{
  name: string;
  slug: string;
  role: string;
  specialties: string[];
  bio: CmsRichTextDocument;
  image?: CmsAsset;
  seo: CmsSeo;
}>;

export type CmsArticle = Readonly<{
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  authorName?: string;
  body: CmsRichTextDocument;
  seo: CmsSeo;
}>;

export type CmsFaqItem = Readonly<{
  question: string;
  answer: CmsRichTextDocument;
  category?: string;
}>;

export type CmsContentCollection<T> = Readonly<{
  items: T[];
  total: number;
}>;

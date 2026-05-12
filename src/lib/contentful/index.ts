export { contentfulContentModel } from "@/lib/contentful/content-model";
export {
  contentfulEnvironmentVariableNames,
  hasContentfulConfig,
} from "@/lib/contentful/env";
export {
  listOrFallback,
  seoOrFallback,
  slugOrFallback,
  textOrFallback,
} from "@/lib/contentful/fallbacks";
export type {
  ContentfulContentTypePlan,
  ContentfulFieldPlan,
  ContentfulFieldType,
} from "@/lib/contentful/content-model";
export type { ContentfulEnvironmentConfig } from "@/lib/contentful/env";
export type {
  CmsArticle,
  CmsAsset,
  CmsContentCollection,
  CmsFaqItem,
  CmsPage,
  CmsProvider,
  CmsRichTextDocument,
  CmsSeo,
  CmsService,
} from "@/lib/contentful/types";

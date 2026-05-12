export { contentfulContentModel } from "@/lib/contentful/content-model";
export { getContentfulClient } from "@/lib/contentful/client";
export {
  contentfulEnvironmentVariableNames,
  getContentfulEnvironmentConfig,
  hasContentfulConfig,
} from "@/lib/contentful/env";
export {
  listOrFallback,
  seoOrFallback,
  slugOrFallback,
  textOrFallback,
} from "@/lib/contentful/fallbacks";
export {
  fallbackHomePageContent,
  getHomePageContent,
} from "@/lib/contentful/home";
export {
  fallbackArticleContent,
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
} from "@/lib/contentful/articles";
export {
  fallbackPatientResourcesPage,
  getPageBySlug,
  getPatientResourcesPage,
} from "@/lib/contentful/pages";
export {
  fallbackServiceContent,
  getServiceBySlug,
  getServiceSlugs,
  getServices,
} from "@/lib/contentful/services";
export {
  fallbackProviderContent,
  getProviderBySlug,
  getProviderSlugs,
  getProviders,
} from "@/lib/contentful/providers";
export type {
  ContentfulContentTypePlan,
  ContentfulFieldPlan,
  ContentfulFieldType,
} from "@/lib/contentful/content-model";
export type { ContentfulEnvironmentConfig } from "@/lib/contentful/env";
export type { ArticleContent } from "@/lib/contentful/articles";
export type { HomePageContent } from "@/lib/contentful/home";
export type { PageContent } from "@/lib/contentful/pages";
export type { ProviderContent } from "@/lib/contentful/providers";
export type { ServiceContent } from "@/lib/contentful/services";
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

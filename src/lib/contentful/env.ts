export type ContentfulEnvironmentConfig = Readonly<{
  spaceId: string;
  deliveryToken: string;
  previewToken?: string;
  environment: string;
  preview: boolean;
}>;

export const contentfulEnvironmentVariableNames = [
  "CONTENTFUL_SPACE_ID",
  "CONTENTFUL_DELIVERY_TOKEN",
  "CONTENTFUL_PREVIEW_TOKEN",
  "CONTENTFUL_ENVIRONMENT",
  "CONTENTFUL_PREVIEW",
] as const;

export function hasContentfulConfig(
  config: Partial<ContentfulEnvironmentConfig>,
): config is ContentfulEnvironmentConfig {
  return Boolean(config.spaceId && config.deliveryToken && config.environment);
}

export function getContentfulEnvironmentConfig() {
  return {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    deliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
    preview: process.env.CONTENTFUL_PREVIEW === "true",
  };
}

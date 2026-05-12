export type ContentfulEnvironmentConfig = Readonly<{
  spaceId: string;
  deliveryToken: string;
  previewToken?: string;
  environment: string;
}>;

export const contentfulEnvironmentVariableNames = [
  "CONTENTFUL_SPACE_ID",
  "CONTENTFUL_DELIVERY_TOKEN",
  "CONTENTFUL_PREVIEW_TOKEN",
  "CONTENTFUL_ENVIRONMENT",
] as const;

export function hasContentfulConfig(
  config: Partial<ContentfulEnvironmentConfig>,
): config is ContentfulEnvironmentConfig {
  return Boolean(config.spaceId && config.deliveryToken && config.environment);
}

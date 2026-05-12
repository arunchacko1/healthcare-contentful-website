import { createClient } from "contentful";
import {
  getContentfulEnvironmentConfig,
  hasContentfulConfig,
} from "@/lib/contentful/env";

export function getContentfulClient() {
  const config = getContentfulEnvironmentConfig();

  if (!hasContentfulConfig(config)) {
    return null;
  }

  const accessToken =
    config.preview && config.previewToken
      ? config.previewToken
      : config.deliveryToken;

  return createClient({
    space: config.spaceId,
    accessToken,
    environment: config.environment,
    host: config.preview ? "preview.contentful.com" : "cdn.contentful.com",
  });
}

import Image from "next/image";
import type { CmsAsset } from "@/lib/contentful";

type ProviderAvatarProps = Readonly<{
  image?: CmsAsset;
  name: string;
  size?: "large" | "small";
}>;

const sizeClasses = {
  large: "h-32 w-32 text-3xl",
  small: "h-20 w-20 text-xl",
};

const imageSizes = {
  large: 128,
  small: 80,
};

export function ProviderAvatar({
  image,
  name,
  size = "small",
}: ProviderAvatarProps) {
  const pixelSize = imageSizes[size];

  if (image?.url) {
    return (
      <Image
        alt={image.description || `${name} profile photo`}
        className={`${sizeClasses[size]} rounded-full object-cover`}
        height={pixelSize}
        sizes={`${pixelSize}px`}
        src={image.url}
        width={pixelSize}
      />
    );
  }

  return (
    <div
      aria-label={`${name} profile photo placeholder`}
      className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-teal-100 font-bold text-teal-800`}
      role="img"
    >
      {getInitials(name)}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

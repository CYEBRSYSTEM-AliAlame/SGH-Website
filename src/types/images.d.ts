/**
 * Type declarations for image file imports
 * Allows TypeScript to recognize image imports from src/assets directory
 * This is required for Next.js static image imports
 */

declare module '*.jpg' {
  const value: import('next/image').StaticImageData;
  export default value;
}

declare module '*.jpeg' {
  const value: import('next/image').StaticImageData;
  export default value;
}

declare module '*.png' {
  const value: import('next/image').StaticImageData;
  export default value;
}

declare module '*.gif' {
  const value: import('next/image').StaticImageData;
  export default value;
}

declare module '*.webp' {
  const value: import('next/image').StaticImageData;
  export default value;
}

declare module '*.svg' {
  const value: import('next/image').StaticImageData;
  export default value;
}


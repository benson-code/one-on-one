/// <reference types="vite/client" />

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_LOG_LEVEL?: string
  readonly VITE_LOG_SERVICE_URL?: string
  readonly VITE_MOCK_CUSTOMER_EMAIL?: string
  readonly VITE_MOCK_CUSTOMER_PASSWORD?: string
  readonly VITE_MOCK_GUIDE_EMAIL?: string
  readonly VITE_MOCK_GUIDE_PASSWORD?: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly NODE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
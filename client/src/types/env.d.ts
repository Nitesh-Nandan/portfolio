/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_DEV_MODE: string
  readonly VITE_API_MODE: 'static' | 'api'
  readonly VITE_STATIC_DATA_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 
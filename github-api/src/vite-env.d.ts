/// <reference types="vite/client" />
/// <reference types="react" />

interface ImportMetaEnv {
  readonly VITE_API_CLIENT: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

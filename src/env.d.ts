interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_ID: string;
  readonly VITE_MEASUREMENT_ID: string;

  readonly VITE_EMAIL_JS_SERVICE_ID: string;
  readonly VITE_EMAIL_JS_TEMPLATE_ID: string;
  readonly VITE_EMAIL_JS_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: string;

  export { ReactComponent };
  export default content;
}

interface Window {
  dataLayer?: object[];
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GTM_ID: string;
    NEXT_PUBLIC_CONTACT_URL: string;
    NEXT_PUBLIC_GTM_EVENT_DOWNLOAD: string;
    NEXT_PUBLIC_GTM_EVENT_COPY: string;
    NEXT_PUBLIC_GTM_EVENT_FILE_SELECT: string;
    NEXT_PUBLIC_GTM_EVENT_FILE_DROP: string;
    NEXT_PUBLIC_GTM_EVENT_FILE_CLEAR: string;
    NEXT_PUBLIC_GTM_EVENT_DETECT_ERROR: string;
    NEXT_PUBLIC_GTM_EVENT_MANUAL_APPROVE: string;
    NEXT_PUBLIC_GTM_EVENT_MANUAL_REJECT: string;
    NEXT_PUBLIC_GTM_EVENT_MANUAL_RESET: string;
    NEXT_PUBLIC_ORIGIN: string;
  }
}

declare module '*.css';
declare module '*.scss';

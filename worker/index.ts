import "./googlefont";
import { handleFetch } from "./iconv";

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("fetch", handleFetch);

import "./googlefont";
import { handleFetch } from "./file";

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("fetch", handleFetch);

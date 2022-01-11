const path = require("path");
// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW
module.exports = {
  swSrc: path.join(__dirname, "src/service-worker.ts"),
  swDest: path.join(__dirname, "public/sw.js"),
  // offlineGoogleAnalytics: {}
};

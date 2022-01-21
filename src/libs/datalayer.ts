export const pushDataLayer = (event: any) => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  window.dataLayer.push(event);
};

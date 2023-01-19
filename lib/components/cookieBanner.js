export const cookieBanner = ({ title, description }) => {
  return `<div class="crumbs-banner" tabIndex="-1" role="dialog">
    <div class="crumbs-banner__content">
      <h4 class="crumbs-banner__title">${title}</h4>
      <p class="crumbs-banner__description">${description}</p>
    </div>
    <div>
      <button class="crumbs-button crumbs-edit-settings">Choose cookies</button>
      <button class="crumbs-button crumbs-accept-all">Accept all cookies</button>
    </div>
  </div>
`;
};

export const editScreen = ({ title, description }) => {
  return `
    <div class="crumbs-edit" role="dialog" aria-labelledby="crumbs-dialog-title" aria-describedby="crumbs-dialog-descrption" tabindex="-1">
      <div class="crumbs-edit__content">
        <div class="crumbs-edit__container">
          <h3 id="crumbs-dialog-title" class="crumbs-edit__title">${title}</h3>
          <p id="crumbs-dialog-description" class="crumbs-edit__description">${description}</p>
          <div id="cookie-categories"></div>
        </div>
      </div>
      <div class="crumbs-edit__cta">
        <button class="crumbs-button crumbs-edit-accept">Set cookie preferences</button>
      </div>
      <button class="crumbs-edit-close">
        <span class="crumbs__hidden">Close cookie settings</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
    </div>
  `;
};

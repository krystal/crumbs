export const editScreen = `
  <div class="crumbs-edit" role="dialog" aria-labelledby="crumbs-dialog-title" aria-describedby="crumbs-dialog-descrption" tabindex="0">
    <div class="crumbs-edit__content">
      <div class="crumbs-edit__container">
        <h3 id="crumbs-dialog-title" class="crumbs-edit__title">Edit cookie settings</h3>
        <p id="crumbs-dialog-description" class="crumbs-edit__description">There are a number of cookies we need to use in order for our website to work properly. These cannot be disabled. However, you can disable non-essential cookies for the third-party services we use to help us provide better customer support, measure the performance of this website and run more effective marketing campaigns.</p>
        <div id="cookie-categories"></div>
      </div>
    </div>
    <div class="crumbs-edit__cta">
      <button class="crumbs-button crumbs-edit-accept">Set cookie preferences</button>
    </div>
    <button class="crumbs-edit-close">
      <span class="crumbs__hidden">Close cookie settings</span>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" aria-hidden="true" focusable="false"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
    </button>
  </div>
`;

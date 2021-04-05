export const editScreen = `
  <div class="crumbs-edit" role="dialog" aria-labelledby="crumbs-dialog-title" aria-describedby="crumbs-dialog-descrption" tabIndex="0">
    <div class="crumbs-edit__content">
      <div class="crumbs-edit__container">
        <h3 id="crumbs-dialog-title" class="crumbs-edit__title">Edit cookie settings</h3>
        <p id="crumbs-dialog-description" class="crumbs-edit__description">There are a number of cookies we need to use in order for our website to work properly. These cannot be disabled. However, you can disable non-essential cookies for the third-party services we use to help us provide better customer support, measure the performance of this website and run more effective marketing campaigns.</p>
        <div class="crumbs-edit__section">
          <div class="crumbs-edit__block">
            <h4>Functional</h4>
            <p class="crumbs-edit__text">These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.</p>
          </div>
          <div class="crumbs-toggle">
            <label for="off" class="crumbs-toggle__label crumbs__hidden">Off</label>
            <span class="crumbs-toggle__wrapper">
              <input class="crumbs-toggle__radio" type="radio" name="functional" id="off" checked>
              <input class="crumbs-toggle__radio crumbs-toggle__radio--on" type="radio" name="functional" id="on">
              <span aria-hidden="true" class="crumbs-toggle__background"></span>
              <span aria-hidden="true" class="crumbs-toggle__switcher"></span>
            </span>
            <label for="on" class="crumbs-toggle__label crumbs__hidden">On</label>
          </div>
        </div>
        <div class="crumbs-edit__section">
          <div class="crumbs-edit__block">
            <h4>Performance</h4>
            <p class="crumbs-edit__text">These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.</p>
          </div>
          <div class="crumbs-toggle">
            <label for="off" class="crumbs-toggle__label crumbs__hidden">Off</label>
            <span class="crumbs-toggle__wrapper">
              <input class="crumbs-toggle__radio" type="radio" name="performance" id="off" checked>
              <input class="crumbs-toggle__radio crumbs-toggle__radio--on" type="radio" name="performance" id="on">
              <span aria-hidden="true" class="crumbs-toggle__background"></span>
              <span aria-hidden="true" class="crumbs-toggle__switcher"></span>
            </span>
            <label for="on" class="crumbs-toggle__label crumbs__hidden">On</label>
          </div>
        </div>
        <div class="crumbs-edit__section">
          <div class="crumbs-edit__block">
            <h4>Targeting</h4>
            <p class="crumbs-edit__text">These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.</p>
          </div>
          <div class="crumbs-toggle">
            <label for="off" class="crumbs-toggle__label crumbs__hidden">Off</label>
            <span class="crumbs-toggle__wrapper">
              <input class="crumbs-toggle__radio" type="radio" name="targeting" id="off" checked>
              <input class="crumbs-toggle__radio crumbs-toggle__radio--on" type="radio" name="targeting" id="on">
              <span aria-hidden="true" class="crumbs-toggle__background"></span>
              <span aria-hidden="true" class="crumbs-toggle__switcher"></span>
            </span>
            <label for="on" class="crumbs-toggle__label crumbs__hidden">On</label>
          </div>
        </div>
      </div>
    </div>
    <div class="crumbs-edit__cta">
      <button class="crumbs-button crumbs-edit-accept">Set cookie preferences</button>
    </div>
    <button class="crumbs-edit-close" style="appearance:none; border: 0; box-shadow: none; background-color:transparent; cursor: pointer;">
      <span class="crumbs__hidden">Close cookie settings</span>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" aria-hidden="true" focusable="false"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
    </button>
  </div>
`;

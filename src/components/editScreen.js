export const editScreen = `
  <div class="crumbs-edit" role="dialog" aria-labelledby="crumbs-dialog-title" aria-describedby="crumbs-dialog-descrption" tabIndex="0">
    <div class="crumbs-edit__content">
      <h3 id="crumbs-dialog-title" class="crumbs-edit__title">Edit cookie settings</h3>
      <p id="crumbs-dialog-description" class="crumbs-edit__description">There are a number of cookies we need to use in order for our website to work properly. These cannot be disabled. However, you can disable non-essential cookies for the third-party services we use to help us provide better customer support, measure the performance of this website and run more effective marketing campaigns.</p>
      <div>
        <input type="checkbox" id="functional" class="crumbs-checkbox crumbs-checkbox-hidden" />
        <label for="functional">Functional</label>
      </div>
      <div>
        <input type="checkbox" id="performance" class="crumbs-checkbox crumbs-checkbox-hidden" />
        <label for="performance">Performance</label>
      </div>
      <div>
        <input type="checkbox" id="targeting" class="crumbs-checkbox crumbs-checkbox-hidden" />
        <label for="targeting">Targeting</label>
      </div>
      <button class="crumbs-edit-accept" style="margin: 1rem 0">Set cookie preferences</button>
    </div>
    <button class="crumbs-edit-close">Close</button>
  </div>
`;

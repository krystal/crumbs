export const editScreen = `
  <div class="crumbs-edit" role="dialog" aria-labelledby="crumbs-dialog-title" aria-describedby="crumbs-dialog-descrption" tabIndex="0">

    <h4 id="crumbs-dialog-title">Edit cookie settings</h4>
    <p id="crumbs-dialog-description">Check the cookies you want to accept</p>
    <div>
      <label for="functional">Functional</label>
      <input type="checkbox" id="functional" />
    </div>
    <div>
      <label for="performance">Performance</label>
      <input type="checkbox" id="performance" />
    </div>
    <div>
      <label for="targeting">Targeting</label>
      <input type="checkbox" id="targeting" />
    </div>
    <button class="crumbs-edit-accept" style="margin: 1rem 0">Set cookie preferences</button>
    <button class="crumbs-edit-close">Close</button>
  </div>
`;

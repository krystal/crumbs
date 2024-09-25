import Crumbs from "./lib";

document.addEventListener("DOMContentLoaded", () => {
  const editCookieButton = document.querySelector(".js-edit");
  const ul = document.querySelector(".js-accepted");

  const callback = (types) => {
    clear();

    Object.keys(types)
      .filter((key) => types[key])
      .forEach((key) => {
        const li = document.createElement("li");
        li.textContent = key;
        ul.append(li);
      });
  };

  const cookies = new Crumbs({
    banner: {
      title: "We use cookies",
      description: "Test description",
    },
    callbacks: {
      load: callback,
      save: callback,
    },
    days: 365,
    domain: "localhost",
    editBanner: {
      description: "This is for editing cookies",
      title: "Edit cookies",
    },
    editCookieButton,
    types: [{ identifier: "ad_personalization" }],
    version: 1,
  });

  function clear() {
    ul.innerHTML = "";
  }
});

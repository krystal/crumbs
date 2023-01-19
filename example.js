import Crumbs from "./lib/main.js";

document.addEventListener("DOMContentLoaded", () => {
  const editCookieButton = document.querySelector(".edit-cookies");
  const list = document.querySelector(".accepted-cookies");
  console.log(Crumbs);
  const cookies = new Crumbs({
    banner: {
      title: "We use cookies",
      description: "Test description",
    },
    days: 365,
    domain: "localhost",
    editCookieButton,
    editBanner: {
      title: "Edit cookies",
      description: "This is for editing cookies",
    },
    types: [
      {
        identifier: "functional",
        required: true,
        summary:
          "There are a number of cookies we need to use in order for out applications to work properly. These cannot be disabled.",
        title: "Functional",
      },
      {
        identifier: "analytics",
        required: false,
        summary:
          "We use analytics to measure the performance of our website. We do not store any personal data and your IP address is anonymised.",
        title: "Analytics",
      },
      {
        identifier: "live_chat",
        required: false,
        summary:
          "We use a live chat service so we can privide support to you where available. Various cookies are stored so chats remain active when you change page.",
        title: "Live Chat",
      },
    ],
  });

  cookies.on("onSave", (preferences) => {
    emptyList();
    preferences.forEach((preference) => {
      const li = document.createElement("li");
      li.textContent = preference;
      list.append(li);
    });
  });

  function emptyList() {
    list.innerHTML = "";
  }
});

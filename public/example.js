document.addEventListener("DOMContentLoaded", () => {
  const editCookieButton = document.querySelector(".edit-cookies");

  const cookies = new Crumbs({
    banner: {
      title: "We use cookies",
      description: "Test",
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
          "There are a number of cookies we need to use in order for DeployHQ to work properly. These cannot be disabled.",
        title: "Functional",
      },
      {
        identifier: "analytics",
        required: false,
        summary:
          "We use Google Analytics to measure the performance of our website. We do not store any personal data and your IP address is anonymised. Analytics is disabled in the application itself.",
        title: "Analytics",
      },
      {
        identifier: "live_chat",
        required: false,
        summary:
          "We use a live chat service called Crisp so we can privide support to you where available. Various cookies are stored so chats remain active when you change page.",
        title: "Live Chat",
      },
    ],
  });
});

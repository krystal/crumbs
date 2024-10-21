export const TYPES = Object.freeze({
  ad_personalization: {
    summary: "Allows personalised ads based on your preferences and activity.",
    title: "Ad Personalization",
  },
  ad_storage: {
    summary: "Stores information to show you personalised ads.",
    title: "Ad Storage",
  },
  ad_user_data: {
    summary:
      "Allows sending your data to various third-parties for advertising purposes.",
    title: "Ad User Data",
  },
  analytics_storage: {
    summary:
      "Enables tracking of website visits and how long you stay to improve performance.",
    title: "Analytics Storage",
  },
  functionality_storage: {
    summary:
      "Stores settings like your language choice to make the website work better for you.",
    title: "Functionality Storage",
    required: true,
  },
  personalization_storage: {
    summary:
      "Stores information to personalise your experience, like video suggestions.",
    title: "Personalization Storage",
  },
  security_storage: {
    summary: "Keeps data that helps protect your account and prevent fraud.",
    title: "Security Storage",
  },
});

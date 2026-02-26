const raw = {
  siteName: "{{SITE_NAME}}",
  tagline: "{{TAGLINE}}",
  aboutText: "{{ABOUT_TEXT}}",
  primaryColor: "{{PRIMARY_COLOR}}",
  service1: { title: "{{SERVICE1_TITLE}}", description: "{{SERVICE1_DESCRIPTION}}" },
  service2: { title: "{{SERVICE2_TITLE}}", description: "{{SERVICE2_DESCRIPTION}}" },
  service3: { title: "{{SERVICE3_TITLE}}", description: "{{SERVICE3_DESCRIPTION}}" },
  contact: {
    email: "{{CONTACT_EMAIL}}",
    phone: "{{CONTACT_PHONE}}",
    address: "{{CONTACT_ADDRESS}}"
  },
  social: {
    instagram: "{{SOCIAL_INSTAGRAM}}",
    facebook: "{{SOCIAL_FACEBOOK}}"
  }
};

const isPlaceholder = (v) => !v || v.startsWith('{{');

const siteConfig = {
  ...raw,
  primaryColor: isPlaceholder(raw.primaryColor) ? '#555555' : raw.primaryColor,
};

export default siteConfig;

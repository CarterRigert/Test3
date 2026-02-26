const raw = {
  siteName: "Test3",
  tagline: "Tag line test",
  aboutText: "Test about",
  primaryColor: "#3a7bd5",
  service1: { title: "Service 1", description: "Test" },
  service2: { title: "", description: "" },
  service3: { title: "", description: "" },
  contact: {
    email: "test@gmail.com",
    phone: "55555555555",
    address: ""
  },
  social: {
    instagram: "",
    facebook: ""
  }
};

const isPlaceholder = (v) => !v || v.startsWith('{{');

const siteConfig = {
  ...raw,
  primaryColor: isPlaceholder(raw.primaryColor) ? '#555555' : raw.primaryColor,
};

export default siteConfig;

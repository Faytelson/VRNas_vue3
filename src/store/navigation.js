import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavigationStore = defineStore("navigation", () => {
  // header menu
  const menuElems = ref([
    {
      title: "Home",
      id: 0,
    },
    {
      title: "Submenu",
      submenu: [
        {
          title: "SubItem1",
        },
        {
          title: "SubItem2",
        },
      ],
      id: 1,
    },
    {
      title: "About",
      id: 2,
    },
    {
      title: "Submenu2",
      submenu: [
        {
          title: "SubItem3 long text item",
        },
        {
          title: "SubItem4",
        },
      ],
      id: 3,
    },
  ]);
  const isMenuActive = ref(false);

  // footer menu
  const socialLinks = ref([
    {
      title: "twitter",
      name: "twitter",
      img: {
        path: "/icons/icon_logo-twitter.svg",
        alt: "Twitter Icon",
      },
      id: 0,
    },
    {
      title: "facebook",
      name: "facebook",
      img: {
        path: "/icons/icon_logo-facebook_simple.svg",
        alt: "Facebook Icon",
      },
      id: 0,
    },
    {
      title: "instagram",
      name: "instagram",
      img: {
        path: "/icons/icon_logo-instagram.svg",
        alt: "Instagram Icon",
      },
      id: 0,
    },
    {
      title: "github",
      name: "github",
      img: {
        path: "/icons/icon_logo-github.svg",
        alt: "Github Icon",
      },
      id: 0,
    },
  ]);

  const footerQuickLinks = ref([
    { title: "Home", id: 0 },
    { title: "Pricing Plan", id: 1 },
    { title: "Service", id: 2 },
    { title: "Blog", id: 3 },
    { title: "Our Team", id: 4 },
  ]);

  const footerSupportLinks = ref([
    { title: "About us", id: 0 },
    { title: "Contact us", id: 1 },
    { title: "Home", id: 2 },
    { title: "Tems & Conditions", id: 3 },
    { title: "Privacy Policy", id: 4 },
  ]);

  const footerHelpLinks = ref([
    {
      title: "Tanjung Sari Street no.48, Pontianak City",
      name: "address",
      img: {
        path: "/icons/icon_location.svg",
        alt: "Location icon",
      },
      id: 0,
    },
    {
      title: "Support@VRNas.com",
      name: "email",
      img: {
        path: "/icons/icon_mail.svg",
        alt: "Email icon",
      },
      id: 1,
    },
    {
      title: "+1234567890",
      name: "phone",
      img: {
        path: "/icons/icon_phone.svg",
        alt: "Phone icon",
      },
      id: 2,
    },
  ]);

  return {
    menuElems,
    isMenuActive,
    socialLinks,
    footerQuickLinks,
    footerSupportLinks,
    footerHelpLinks,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";

export const useListStore = defineStore("lists", () => {
  const featureListAboutUs = ref([
    {
      title: "Expertise",
      text: "Our team consists of experienced VR developers, designers, and technicians who have a passion for VR and a commitment to delivering quality work and give the best service",
      img: {
        path: "/icons/icon_vr-box.svg",
        alt: "Icon symbolizing VR-box",
      },
    },
    {
      title: "Customization",
      text: "Every client is unique, and we believe every VR experience should be too. We'll work with you to create a customized solution that meets your specific needs and goals",
      img: {
        path: "/icons/icon_rubik-cube.svg",
        alt: "Icon symbolizing spinning Rubik's Cube",
      },
    },
    {
      title: "Service",
      text: "We believe in providing exceptional customer service, from initial consultation to final delivery. Our goal is to ensure you're satisfied with every aspect of your VR experience.",
      img: {
        path: "/icons/icon_man-vr-goggles.svg",
        alt: "Icon symbolizing a man wearing VR-goggles",
      },
    },
  ]);

  const iconListAdvantagesVR = ref([
    {
      label: "Cutting-Edge Technology",
      id: 0,
    },
    {
      label: "Versatile Applications",
      id: 1,
    },
    {
      label: "Affordable and Accessible",
      id: 2,
    },
  ]);

  return {
    featureListAboutUs,
    iconListAdvantagesVR,
  };
});

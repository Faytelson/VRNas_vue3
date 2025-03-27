import { defineStore } from "pinia";
import { ref } from "vue";

export const useCardsStore = defineStore("cards", () => {
  const serviceCards = ref([
    {
      title: "VR Development",
      text: "From concept to creation, our team of VR developers will bring your vision to life.",
      img: {
        path: "/icons/icon_screen.svg",
        alt: "Icon representing a screen with a cube on it",
      },
      id: 0,
    },
    {
      title: "VR Design",
      text: "Our talented VR designers will create immersive and engaging environments that will captivate your audience.",
      img: {
        path: "/icons/icon_light-bulb.svg",
        alt: "Icon representing a light bulb",
      },
      id: 1,
    },
    {
      title: "VR Consulting",
      text: "Our VR consultants will work with you to ensure that your VR experience meets your goals and exceeds your expectations.",
      img: {
        path: "/icons/icon_message.svg",
        alt: "Icon representing a message from some person",
      },
      id: 2,
    },
    {
      title: "VR Games",
      text: "We offer a wide selection of VR games that are suitable for players of all ages and skill levels.",
      img: {
        path: "/icons/icon_gamepad.svg",
        alt: "Icon representing a gamepad",
      },
      id: 3,
    },
    {
      title: "VR Events",
      text: "Discover the future of entertainment with immersive VR events. Experience interactive environments, real-time engagement, and cutting-edge technology that bring your ideas to life in an unforgettable way.",
      img: {
        path: "/icons/icon_calendar.svg",
        alt: "Icon representing a calendar with upcoming happy event",
      },
      id: 4,
    },
    {
      title: "VR Entertainment",
      text: "Create a VR escape room, or offer VR experiences at a theme park, we have the expertise and experience to make it happen.",
      img: {
        path: "/icons/icon_masks.svg",
        alt: "Icon representing a theatrical masks",
      },
      id: 5,
    },
  ]);
  return {
    serviceCards,
  };
});

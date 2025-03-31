import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccordionsStore = defineStore("accordions", () => {
  const accordionAboutUs = ref([
    {
      title: "What is virtual reality?",
      text: "Virtual reality (VR) is a technology that uses headsets or other devices to create a simulated environment. Users can interact with this environment as if it were real, allowing for immersive experiences in gaming, education, training, and more.",
      id: 0,
    },
    {
      title: "What types of VR services do you offer?",
      text: "We offer a variety of VR services, including virtual tours, training simulations, gaming experiences, and interactive educational programs. Our solutions cater to individuals, businesses, and institutions looking for immersive digital experiences.",
      id: 1,
    },
    {
      title: "How much does your VR services cost?",
      text: "Our VR services vary in cost depending on the complexity and scope of the project. We provide flexible pricing options, including one-time purchases, subscriptions, and custom solutions tailored to your needs. Contact us for a detailed quote.",
      id: 2,
    },
    {
      title: "What equipment do I need to use your VR services?",
      text: "To use our VR services, you typically need a VR headset compatible with our software, such as an Oculus Quest, HTC Vive, or a similar device. Some experiences may also be accessible through a desktop or mobile device in a limited format.",
      id: 3,
    },
    {
      title: "Can I try out your VR services before I commit?",
      text: "Yes! We offer free trials or demo versions of our VR services so you can explore the experience before making a commitment. Reach out to us to learn more about available trial options.",
      id: 4,
    },
  ]);

  return {
    accordionAboutUs,
  };
});

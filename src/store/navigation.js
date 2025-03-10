import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavigationStore = defineStore("navigation", () => {
  const menuElems = ref([
    {
      title: "Home",
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
    },
    {
      title: "About",
    },
    {
      title: "Submenu2",
      submenu: [
        {
          title: "SubItem3",
        },
        {
          title: "SubItem4",
        },
      ],
    },
  ]);

  const isMenuActive = ref(false);

  return { menuElems, isMenuActive };
});

import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavigationStore = defineStore("navigation", () => {
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
          title: "SubItem3",
        },
        {
          title: "SubItem4",
        },
      ],
      id: 3,
    },
  ]);

  const isMenuActive = ref(false);

  return { menuElems, isMenuActive };
});

import { createRouter, createWebHistory } from "vue-router";

//Views
import Index from "../views/cards/Index.vue";

//Layouts
import baseLayout from "../layouts/baseLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Index,
      meta: { layout: baseLayout },
    },
  ],
});

export default router;

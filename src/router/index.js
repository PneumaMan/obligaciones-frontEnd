import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/empleados",
    name: "empleados",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/empleados.vue"),
  },
  {
    path: "/obligaciones",
    name: "obligaciones",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/obligaciones.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/hakkinda",
    name: "Hakkında",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Hakkinda.vue")
  },
  {
    path: "/hastalikzihinsel",
    name: "HZN",
    component: () => import("../views/Hastalikzihinsel.vue")
  },
  {
    path: "/ailedanismani",
    name: "Aile",
    component: () => import("../views/Ailedanismani.vue")
  },
  {
    path: "/accessbars",
    name: "AccessBars",
    component: () => import("../views/Accessbars.vue")
  },
  {
    path: "/hipnoterapi",
    name: "Hipnoterapi",
    component: () => import("../views/Hipnoterapi.vue")
  },
  {
    path: "/bilincaltidili",
    name: "Bilincalti Dili",
    component: () => import("../views/BilincaltiDili.vue")
  },
  {
    path: "/alfabioenerji",
    name: "Bioenerji",
    component: () => import("../views/Bioenerji.vue")
  },
  {
    path: "/doula",
    name: "Doula",
    component: () => import("../views/Doula.vue")
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("../views/Blog.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

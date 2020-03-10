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

function getRoutesList(routes, pre) {
  return routes.reduce((array, route) => {
    const path = `${pre}${route.path}`;

    if (route.path !== "*") {
      array.push(path);
    }

    if (route.children) {
      array.push(...getRoutesList(route.children, `${path}/`));
    }

    return array;
  }, []);
}

function getRoutesXML() {
  const list = getRoutesList(
    router.options.routes,
    "https://alyasugelisimakademisi.com"
  )
    .map(route => `<url><loc>${route}</loc></url>`)
    .join("\r\n");
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${list}
  </urlset>`;
}
console.log(getRoutesXML());
export default router;

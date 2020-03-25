import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Anasayfa",
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
  },
  {
    path: "/blog/:id",
    name: "Blog detail",
    component: () => import("../views/BlogDetail.vue")
  },
  {
    path: "/blog-duzenle/:id",
    name: "Edit blog",
    component: () => import("../views/EditBlog.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/giris",
    name: "Giriş",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/sifirla",
    name: "Sıfırla",
    component: () => import("../views/ResetPassword.vue")
  },
  {
    path: "/yeniSifre/:token",
    name: "Yeni Şifre",
    component: () => import("../views/NewPassword.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.loggedIn) {
      await store.dispatch("checkLogin", {
        redirect: "noredirect"
      });
    }
    if (!store.state.loggedIn) {
      next({
        path: '/giris',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
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

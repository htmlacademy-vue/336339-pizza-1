import { auth, isAuthenticated, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    meta: { layout: "AppLayoutWithHeader" },
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
        meta: { layout: "AppLayoutWithHeader", middlewares: [isLoggedIn] },
      },
    ],
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("../views/Login.vue"),
    meta: { layout: "AppEmptyLayout", middlewares: [isLoggedIn] },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: "AppLayoutWithHeader" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutWithSidebar",
      middlewares: [auth, isAuthenticated],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "AppLayoutWithSidebar",
      middlewares: [auth, isAuthenticated],
    },
  },
];

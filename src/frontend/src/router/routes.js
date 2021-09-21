import { auth, isAuthenticated, isLoggedIn } from "@/middlewares";

const TRANSITION_ENTER_ACTIVE_CLASS =
  " animate__animated animate__bounceInRight";

export default [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    meta: {
      layout: "AppLayoutWithHeader",
      enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,
    },
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
        meta: {
          layout: "AppLayoutWithHeader",
          middlewares: [isLoggedIn],
        },
      },
    ],
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: "AppEmptyLayout",
      middlewares: [isLoggedIn],
      enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      layout: "AppLayoutWithHeader",
      enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutWithSidebar",
      middlewares: [auth, isAuthenticated],
      enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "AppLayoutWithSidebar",
      middlewares: [auth, isAuthenticated],
      enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,
    },
  },
];

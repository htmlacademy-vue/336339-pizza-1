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
        component: () => import("../views/Main.vue"),
        meta: { layout: "AppLayoutWithHeader" },
      },
    ],
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("../views/Login.vue"),
    meta: { layout: "AppEmptyLayout" },
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
    meta: { layout: "AppLayoutWithHeader" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: "AppLayoutWithHeader" },
  },
];

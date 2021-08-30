export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Main.vue"),
    meta: { layout: "AppLayoutMain" },
  },
];

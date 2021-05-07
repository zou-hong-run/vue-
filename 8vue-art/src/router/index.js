import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@/layout";
// 安装路由功能
Vue.use(VueRouter);

// 通用路由不需要权限
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
    hidden: true, // 导航菜单忽略该项
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Home.vue"),
        name: "home",
        meta: {
          title: "Home", // 导航标题
          icon: "d", // 导航菜单
        },
      },
    ],
  },
];
// 权限路由
export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/About.vue"),
        name: "about",
        meta: {
          title: "About",
          icon: "d",
          roles: ["admin", "editor"], //可以查看角色的身份
        },
      },
    ],
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

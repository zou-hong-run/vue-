import Vue from "vue";
import VueRouter from "vue-router";

// 安装路由功能
Vue.use(VueRouter);
import Layout from "@/layout";

// 通用路由不需要权限
export const routes = [
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
    meta: {
      title: "Home", // 导航标题
      icon: "a", // 导航菜单
    },
    children: [
      {
        path: "home",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Home.vue"),
        name: "home",
        meta: {
          title: "Home2", // 导航标题
          icon: "d", // 导航菜单
        },
      },
      {
        path: "our",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Login.vue"),
        name: "our",
        meta: {
          title: "our", // 导航标题
          icon: "c", // 导航菜单
        },
      },
    ],
  },
  // 404 401 *
  {
    path: "/404",
    component: (resolve) => require(["@/views/error/404"], resolve),
    hidden: true,
  },
  {
    path: "/401",
    component: (resolve) => require(["@/views/error/401"], resolve),
    hidden: true,
  },
  // {
  //   path: '*', // 页面不存在的情况下会跳到404页面
  //   redirect: '/404',
  //   name: 'notFound',
  //   hidden: true
  // }
];
// 权限路由
export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    meta: {
      title: "About",
      icon: "d",
      roles: ["admin", "editor"], //可以查看角色的身份
    },
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
      {
        path: "index2",
        component: () => import("@/views/About.vue"),
        name: "about2",
        meta: {
          title: "About2",
          icon: "d",
          roles: ["admin", "editor"], //可以查看角色的身份
        },
      },
    ],
  },
  {
    path: "/age",
    name: "age",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/Login.vue"),
        name: "ageindex",
        meta: {
          title: "Age",
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

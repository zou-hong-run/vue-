// 路由的全局守卫
// 权限控制逻辑在这里

import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth"; // 从cookie中获取令牌

const whiteList = ["/login"]; // 无需令牌白名单

router.beforeEach(async (to, from, next) => {
  // 获取令牌判断用户是否登录
  const hasToken = getToken();
  // 有令牌说明已经登录
  if (hasToken) {
    if (to.path === "/login") {
      // 若已登录重定向至首页
      next({
        path: "/",
      });
    } else {
      // 若用户角色以附加则说明动态路由已经添加
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next(); // 继续即可
      } else {
        try {
          // 先请求获取用户信息
          const { roles } = await store.dispatch("user/getInfo");
          // 根据当前用户角色动态生成路由
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          // 添加这些理由至路由器
          router.addRoutes(accessRoutes);
          // 继续切换路由，确保addRoutes完成
          next({
            ...to,
            replace: true,
          });
        } catch (error) {
          // 出现错误，重置令牌并重新登录（令牌过期，网络错误等原因）
          await store.dispatch("user/resetToken");
          Message.error(error || "have an error");
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    // 说明没有登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单页面，可以访问
      next();
    } else {
      // 重定向至登录页面
      next(`login?redirect=${to.path}`);
    }
  }
});

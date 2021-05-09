<template>
  <div class="app-wrapper">
    <hr />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <hr />
      <h2>main-container</h2>
      <router-view />
    </div>
  </div>
</template>
<script>
import Sidebar from "./components/Sidebar/index";
export default {
  name: "Layout",
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 200px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>

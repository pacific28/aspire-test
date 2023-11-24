<template>
  <q-layout
    :view="isDesktop ? 'hHh Lpr lff' : 'lFf Lpr lHh'"
    style=""
    class="shadow-2 rounded-borders"
  >
    <q-page-container>
      <q-page>
        <!-- Desktop Layout: Side Navigation -->
        <div class="layout-container">
          <side-navigation style="width: 20%" v-if="isDesktop" />
          <div class="main-content">
            <router-view />
          </div>
        </div>

        <!-- Mobile Layout: Bottom Navigation -->
        <mobile-navigation v-if="!isDesktop" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import SideNavigation from "./SideNavigation.vue";
import MobileNavigation from "./MobileNavigation.vue";

export default {
  name: "MainLayout",
  components: {
    SideNavigation,
    MobileNavigation,
  },
  data() {
    return {
      mobileItems: [
        { label: "MOBILE A" },
        { label: "MOBILE B" },
        // Add more items as needed
      ],
      isDesktop: true,
    };
  },
  created() {
    window.addEventListener("resize", this.updateIsDesktop);
    this.updateIsDesktop();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateIsDesktop);
  },
  methods: {
    updateIsDesktop() {
      this.isDesktop = window.innerWidth >= 1024;
    },
  },
};
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100%;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  overflow: hidden; /* Add this to enable scrolling if content exceeds the container */
}
</style>

<template>
  <q-aside :width="isDesktop ? '20%' : '100%'" class="bg-grey-3">
    <!-- Add your menu items here -->
    <q-list link inset-delimiter>
      <q-item
        clickable
        v-for="(item, index) in menuItems"
        :key="index"
        @click="navigate(item.route)"
      >
        <q-item-section avatar>
          <q-avatar icon="folder" text-color="white" bg-color="purple" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ item.label }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-aside>
</template>

<script>
export default {
  name: "SideNavigation",
  props: {
    isDesktop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      menuItems: [
        { label: "Home", route: "/" },
        { label: "About", route: "/about" },
        { label: "Contact", route: "/contact" },
        // Add more menu items as needed
      ],
    };
  },
  methods: {
    navigate(route) {
      // Add logic to navigate to the specified route
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
/* Add any additional styling for your SideNavigation component here */
</style>

<template>
  <q-footer class="bg-white text-white row">
    <q-item v-for="(item, index) in mobileItems" :key="index" clickable>
      <q-item-section>
        <!-- <q-avatar :icon="item.icon" size="24px" square /> -->
        <img :src="item.icon" alt="Icon" />
        <div class="text-grey">{{ item.label }}</div>
      </q-item-section>
    </q-item>
  </q-footer>
</template>

<script>
export default {
  name: "MobileNavigation",
  data() {
    return {
      mobileItems: [
        {
          label: "Home",
          icon: "../src/assets/icon/menu/Logo.svg",
          isActive: false,
        },
        {
          label: "Cards",
          icon: "../src/assets/icon/menu/Pay.svg",
          isActive: false,
        },
        {
          label: "Payment",
          icon: "../src/assets/icon/menu/Payments.svg",
          isActive: false,
        },
        {
          label: "Credit",
          icon: "../src/assets/icon/menu/Credit.svg",
          isActive: false,
        },
        {
          label: "Profile",
          icon: "../src/assets/icon/menu/Account.svg",
          isActive: false,
        },
      ],
    };
  },
  methods: {
    toggleColor(index) {
      // Toggle the isActive state for the clicked item
      this.$set(this.mobileItems, index, {
        ...this.mobileItems[index],
        isActive: !this.mobileItems[index].isActive,
      });
    },
    getIconColor(index) {
      // Return the appropriate color based on the isActive state
      return this.mobileItems[index].isActive ? "red" : "white";
    },
  },
  // Add any other necessary configuration or logic here
};
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between; /* Adjust as needed */
}

.mobile-navigation-item {
  flex: 1;
  text-align: center;
}
</style>

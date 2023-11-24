<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="activeSlide"
      :arrows="false"
      :pagination="false"
      :autoplay="true"
      :interval="5000"
      @before-transition="onBeforeTransition"
    >
      <q-carousel-slide v-for="(card, index) in creditCards" :key="index">
        <!-- Credit Card Component -->
        <CreditCard :card="card" />
      </q-carousel-slide>
    </q-carousel>

    <!-- Navigation Dots -->
    <q-pagination v-model="activeSlide" :length="creditCards.length" />
  </div>
</template>

<script>
import CreditCard from "./CreditCard.vue"; // Import your CreditCard component

export default {
  components: {
    CreditCard,
  },
  data() {
    return {
      activeSlide: 0,
      creditCards: [
        // Your credit card data goes here
        // Example:
        {
          cardNumber: "**** **** **** 1234",
          name: "John Doe",
          expiry: "12/24",
        },
        {
          cardNumber: "**** **** **** 5678",
          name: "Jane Doe",
          expiry: "10/23",
        },
        // Add more cards as needed
      ],
    };
  },
  methods: {
    onBeforeTransition(index) {
      this.activeSlide = index;
    },
  },
};
</script>

<style scoped>
/* Add any additional styling for your component here */
</style>

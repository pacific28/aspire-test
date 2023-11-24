<template>
  <div class="container-base">
    <div class="delete-card">
      <delete-modal
        v-if="deleteBool"
        @close="closeDelete"
        @confirm="confirmDelete"
      />
    </div>
    <Header @addCard="addCard" />

    <div class="credit-card-empty" v-if="creditCards.length === 0">
      No Card To Show, Please Add Card.
    </div>
    <div class="credit-card-carousel" v-else>
      <swiper :options="swiperOptions" @slideChange="onSlideChange">
        <swiper-slide v-for="(card, index) in creditCards" :key="index">
          <!-- Credit Card Component -->
          <CreditCard :card="card" />
        </swiper-slide>
        <!-- Navigation Dots -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>

  <div class="overlay-div" :class="{ 'overlay-active': overlayActive }">
    <div class="flex flex-nowrap justify-between control-area">
      <q-item v-for="(item, index) in mobileItems" :key="index" clickable>
        <q-item-section class="control-item" @click="cardControl(index)">
          <img :src="item.icon" alt="Icon" />
          <div v-if="index === 0">{{ getMenuLabel }}</div>
          <div v-else>{{ item.label }}</div>
        </q-item-section>
      </q-item>
    </div>
    <div class="card-area">
      <div class="card-item">
        <Card icon="/src/assets/icon/Group_11889.svg" title="Card details" />
      </div>
      <div class="card-item">
        <Card
          icon="/src/assets/icon/Group_11890.svg"
          title="Recent transactions"
          :transactions="transactions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { ref, onMounted, onUnmounted } from "vue";
import "swiper/swiper-bundle.css";
import CreditCard from "@/components/cards/CreditCard.vue";
import Card from "@/components/cards/Card.vue";
import Header from "@/components/cards/Header.vue";
import CreditCardModal from "@/components/cards/CreditCardModal.vue";
import DeleteModal from "@/components/cards/DeleteModal.vue";
import { creditCardsStore, transactionsStore } from "@/util/data";

export default {
  setup() {
    const overlayActive = ref(false);
    const handleScroll = () => {
      overlayActive.value =
        window.scrollY > document.querySelector(".container-base").offsetTop;
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    const items = ref(new Array(10).fill(null));
    return {
      overlayActive,
      items,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    CreditCard,
    Card,
    CreditCardModal,
    DeleteModal,
    Header,
  },
  mounted() {
    this.creditCards = creditCardsStore;
    this.transactions = transactionsStore;
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      activeSlide: 0,
      creditCards: [],
      deleteBool: false,
      mobileItems: [
        {
          label: "Freeze card",
          icon: "/src/assets/icon/Freeze_card.svg",
          isActive: false,
        },
        {
          label: "Set spend limit",
          icon: "/src/assets/icon/Set_spend_limit.svg",
          isActive: false,
        },
        {
          label: "Add to GPay",
          icon: "/src/assets/icon/GPay.svg",
          isActive: false,
        },
        {
          label: "Replace card",
          icon: "/src/assets/icon/Replace_card.svg",
          isActive: false,
        },
        {
          label: "Cancel card",
          icon: "/src/assets/icon/Deactivate_card.svg",
          isActive: false,
        },
      ],
      transactions: [],
    };
  },
  computed: {
    getMenuLabel() {
      console.log("getMenuLabel");
      return this.creditCards[this.activeSlide]?.freeze
        ? "Unfreeze card"
        : "Freeze card";
    },
  },
  methods: {
    onSlideChange(swiper) {
      this.activeSlide = swiper.activeIndex;
    },
    addCard(form) {
      console.log("addCard", form);
      this.creditCards.push(form);
    },
    cardControl(index) {
      switch (index) {
        case 0:
          this.freezeCard();
          break;
        case 4:
          this.deleteCard();
          break;
      }
    },
    freezeCard() {
      let n = this.creditCards.length;
      if (this.activeSlide <= n) {
        let curr = this.creditCards[this.activeSlide];
        curr.freeze = !curr.freeze;
        this.creditCards[this.activeSlide] = curr;
      }
    },
    deleteCard() {
      this.deleteBool = true;
    },
    closeDelete() {
      this.deleteBool = false;
    },
    confirmDelete() {
      let n = this.creditCards.length;
      if (this.activeSlide <= n) {
        this.creditCards.splice(this.activeSlide, 1);
      }
      this.deleteBool = false;
    },
  },
};
</script>

<style scoped>
.container-base {
  background-color: #0c365a;
  padding: 20px 0 50px 0;
}
.delete-card {
  z-index: 10;
  position: fixed;
  top: 250px;
  left: 20%;
}
.credit-card-empty {
  min-height: 400px;
  text-align: center;
  color: var(--white);
  font-size: 20px;
  padding-top: 50px;
}
.credit-card-carousel {
}

.overlay-div {
  position: fixed;
  top: 450px;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  overflow: hidden;
  transition: top 0.3s, opacity 0.3s;
  z-index: 100;
  background-color: var(--white);
  border-radius: 30px;
}

.overlay-active {
  top: 0; /* Move to the top to cover the carousel */
  overflow: auto; /* Allow content to scroll if it overflows */
}

.card-control {
  padding: 0px;
}
.control-area {
  background-color: #edf3ff;
}
.control-item {
  min-width: 60px;
  max-width: 70px;
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  margin: 10px -5px 0 -5px;
}
.check {
  min-height: 100px;
  background-color: red;
  margin: 10px;
  border: 1px solid rebeccapurple;
}

.card-item {
  margin: 20px 20px;
  width: 90%;
}
</style>

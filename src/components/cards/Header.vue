<template>
  <q-section class="header-container">
    <q-item>
      <q-item-section>
        <q-item-label class="amount-label"> Account balance </q-item-label>
      </q-item-section>

      <q-item-section side top class="text-right">
        <q-item-label>
          <div class="d-flex align-items-center">
            <img
              src="/src/assets/brand/Logo_green.svg"
              height="20px"
              class="mr-2"
            />
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <div class="row">
          <!-- Dollar Sign and Account Balance in the Same Row -->
          <q-item-label class="dollar"> S$ </q-item-label>
          <q-item-label class="amount">
            {{ accountBalance }}
          </q-item-label>
        </div>
      </q-item-section>

      <q-item-section side top class="text-right" @click="openModal">
        <div class="row">
          <!-- Dollar Sign and Account Balance in the Same Row -->
          <q-item-label class="new-card-icon">
            <img src="/src/assets/icon/box.svg" height="20px" class="mr-2" />
          </q-item-label>
          <q-item-label class="new-card"> New Card </q-item-label>
        </div>
      </q-item-section>
    </q-item>

    <q-item class="menu">
      <p
        v-for="(item, index) in menuItems"
        :key="index"
        class="menu-item"
        :class="{ highlighted: item.selected }"
      >
        {{ item.name }}
      </p>
    </q-item>

    <credit-card-modal v-model="modal" @close="closeModal" @add="addCard" />
  </q-section>
</template>

<script>
import CreditCardModal from "./CreditCardModal.vue";

export default {
  components: {
    CreditCardModal,
  },
  props: {
    intialState: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  data() {
    return {
      modal: false,
      isCollapsed: true,
      accountBalance: 3000,
      transactions: [
        {
          icon: "/src/assets/icon/file-storage.svg",
          name: "Hamleys",
          date: "20 May 2020",
          type: "refund",
          amount: "S$ 150",
        },
        {
          icon: "/src/assets/icon/flights.svg",
          name: "Hamleys",
          date: "20 May 2020",
          type: "charged",
          amount: "S$ 150",
        },
        {
          icon: "/src/assets/icon/megaphone.svg",
          name: "Hamleys",
          date: "20 May 2020",
          type: "charged",
          amount: "S$ 150",
        },
        {
          icon: "/src/assets/icon/file-storage.svg",
          name: "Hamleys",
          date: "20 May 2020",
          type: "charged",
          amount: "S$ 150",
        },
        // Add more transactions as needed
      ],
      menuItems: [
        { name: "My debit cards", selected: true },
        { name: "All company cards", selected: false },
      ],
    };
  },
  computed: {
    expandIcon() {
      return this.isCollapsed
        ? "/src/assets/icon/down-arrow.svg"
        : "/src/assets/icon/up-arrow.svg";
    },
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    addCard(form) {
      this.$emit("addCard", form);
    },
  },
};
</script>

<style scoped>
.header-container {
  font-family: "Open Sans", sans-serif;
  color: var(--white);
}
.dollar {
  height: 22px;
  width: 40px;
  background-color: #01d167;
  font-weight: bold;
  font-size: 12px;
  border-radius: 4px;
  text-align: center;
  padding: 4px 0;
  margin: 5px 0 0 20px;
}

.amount-label {
  color: var(--white);
  font-size: 14px;
  font-weight: 500;
  margin: 5px 0 -20px 20px;
}
.amount {
  color: var(--white);
  font-size: 24px;
  font-weight: bold;
  padding: 0 0 0 10px;
}

.new-card {
  color: #23cefd;
  font-size: 13px;
  font-weight: bold;
  padding: 5px 0;
}

.new-card-icon {
  padding: 8px 0;
}

.menu {
  margin: 0 0 -20px 20px;
}
.menu-item {
  margin-right: 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}
.highlighted {
  color: var(--white);
  font-weight: bold;
  border-bottom: 2px solid #23cefd;
}
</style>

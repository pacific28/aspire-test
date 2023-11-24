<template>
  <q-card>
    <q-card-section
      clickable
      v-ripple
      class="flex card"
      @click="toggleCollapse"
    >
      <div class="flex flex-row">
        <img :src="icon" class="card-icon" />
        <p class="card-title">{{ title }}</p>
      </div>

      <div class="text-right q-ml-auto">
        <img :src="expandIcon" />
      </div>
    </q-card-section>

    <q-collapse v-if="isCollapsed">
      <q-card-section>
        <q-item
          v-for="(transaction, index) in transactions"
          :key="index"
          style="border-bottom: 1px solid #f5f5f5"
        >
          <!-- Transaction Icon on the Left -->
          <q-item-section
            avatar
            :style="{ backgroundColor: transaction.iconBg }"
            class="transaction-icon"
          >
            <div>
              <img
                :src="transaction.icon"
                alt="Transaction Icon"
                height="35px"
              />
            </div>
          </q-item-section>

          <!-- Transaction Details in the Center -->
          <q-item-section>
            <q-item-label lines="1">
              {{ transaction.name }}
            </q-item-label>
            <q-item-label caption lines="1">
              {{ transaction.date }}
            </q-item-label>
            <q-item-label lines="1" class="row transaction-type">
              <img
                src="/src/assets/icon/business-and-finance.svg"
                alt="Transaction Icon"
                height="35px"
              />
              {{ transactionMessage(transaction.type) }}
            </q-item-label>
          </q-item-section>

          <!-- Amount on the Right -->
          <q-item-section side top class="text-right">
            <q-item-label
              class="transaction-amount"
              :class="{ 'text-positive': transaction.type === 'refund' }"
            >
              <a v-if="transaction.type === 'refund'"> + </a>
              <a v-else> - </a>
              {{ transaction.amount }} <a class="transactions-more"> > </a>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section v-if="transactions.length > 0" class="transactions-all">
        View all card transactions
      </q-card-section>
    </q-collapse>
  </q-card>
</template>

<script>
import { QCard, QCardSection } from "quasar";

export default {
  components: {
    QCard,
    QCardSection,
  },
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    transactions: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      isCollapsed: true,
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
    transactionMessage(type) {
      if (type === "refund") {
        return "Refund on debit card";
      }
      return "Charged to debit card";
    },
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
  background-color: #fafcff;
  border: 1px solid #f5f5f5;
  box-shadow: 0 0 8px #f5f5f5;
}
.card-icon {
  height: 24px;
  padding: 0 10px;
}
.card-title {
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  color: #0c365a;
}

.transaction-icon {
  border-radius: 50%;
  padding-left: 20px;
  margin-right: 20px;
}

.transaction-type {
  color: var(--blue);
  font-size: 12px;
}
.transaction-type img {
  background-color: var(--blue);
  padding: 5px;
  border-radius: 40%;
  margin: 0 10px 0 0;
}
.transaction-amount {
  color: #222222;
  font-weight: 700;
}
.transactions-more {
  color: #aaaaaa;
  opacity: 0.4;
}
.transactions-all {
  background-color: #edfff5;
  color: var(--green1);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  border: 1px solid #ddffec;
}
</style>

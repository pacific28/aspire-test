<template>
  <div class="credit-card q-pa-md">
    <!-- Card Front -->
    <div class="card-container" :class="{ freeze: card.freeze }">
      <div class="hide-section" @click="showCardNumber">
        <img src="/src/assets/icon/remove_red_eye-24px.svg" class="hide-icon" />
        {{ label }} card number
      </div>
      <q-card class="card-front">
        <q-card-section>
          <q-row>
            <!-- Brand Logo (Top Right) -->
            <q-col col="12" class="text-right">
              <div class="brand-logo">
                <img src="/src/assets/brand/Logo.svg" alt="Icon" />
              </div>
            </q-col>

            <!-- Name (First Row) -->
            <q-col col="12">
              <div class="text-h6 card-name">{{ card.name }}</div>
            </q-col>

            <!-- Card Number (Next Row) -->
            <q-col col="12">
              <div class="text-h6 card-number">
                <span class="hidden-digits">{{
                  formatCardNumber(card.number)
                }}</span>
                <span class="visible-digits" v-if="hidden">{{
                  formatCardNumber(card.number, true)
                }}</span>
              </div>
            </q-col>
            <!-- Expiry and CVV (Next Row) -->
            <q-col col="12">
              <div class="card-exp-cvv">
                <span> Thru: {{ card.expiry }}</span>
                <span class="card-cvv"> CVV:</span>
                <span class="card-cvv-value"> {{ getCVV }} </span>
              </div>
            </q-col>

            <!-- Visa Logo (Bottom Right) -->
            <q-col col="12" class="text-right">
              <div class="brand-logo">
                <img src="/src/assets/icon/Visa.svg" alt="Icon" />
              </div>
            </q-col>
          </q-row>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hidden: true,
    };
  },
  computed: {
    label() {
      return this.hidden ? "Show" : "Hide";
    },
    getCVV() {
      return this.hidden ? "✱✱✱" : this.card.cvv;
    },
  },
  methods: {
    formatCardNumber(cardNumber, isLast) {
      const cardNumberStr = cardNumber.toString();
      if (isLast) {
        return cardNumberStr.slice(-4);
      }
      const hiddenDigits = cardNumberStr.slice(0, -4).replace(/\d/g, "●");
      const formattedHiddenDigits = hiddenDigits.replace(/(.{4})/g, "$1\t\t");
      return this.hidden ? formattedHiddenDigits : cardNumberStr;
    },
    showCardNumber() {
      this.hidden = !this.hidden;
    },
  },
};
</script>

<style scoped>
.credit-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.freeze {
  opacity: 0.3;
}
.card-front {
  min-width: 358px;
  min-height: 220px;
  border-radius: 12px;
  box-shadow: 0px 2px #00000014;
  background-color: #01d167;
  color: var(--white);
}
.hide-section {
  position: relative;
  display: flex;
  top: 5px;
  left: 208px;
  height: 35px;
  width: 150px;
  background-color: var(--white);
  color: #03d167;
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  font-weight: 700;
  border-radius: 6px 6px 0 0;
  margin-bottom: -5px;
  padding: 2px 0 0 5px;
}

.hide-icon {
  height: 15px;
  padding: 2px 5px 0 0;
}
.brand-logo {
  display: flex;
  justify-content: flex-end;
  padding: 0 10px 0px 0;
}

.card-name {
  font-size: 22px;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  margin-top: 30px;
}

.card-number {
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  margin-top: 10px;
}
.hidden-digits {
  font-size: 20px;
  letter-spacing: 3px;
}

.visible-digits {
}
.card-exp-cvv {
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
}

.card-exp {
  padding-top: -10px !important;
}
.card-cvv {
  margin-left: 20px;
}

.card-cvv-value {
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  letter-spacing: 2px;
}
</style>

<template>
  <q-dialog persistent @before-show="generateCardDetails">
    <q-card class="new-card">
      <q-card-section>
        <q-card-title class="new-card-title"> Add Credit Card </q-card-title>
      </q-card-section>

      <q-card-section>
        <q-form @submit="saveCreditCard">
          <q-input
            v-model="cardholderName"
            label="Name on Card"
            :rules="[(val) => !!val || 'Cardholder\'s Name is required']"
          />
          <q-input
            v-model="cardNumber"
            label="Card Number"
            :rules="[
              (val) =>
                (val && val.length === 16) ||
                'Credit card number must be 16 digits',
            ]"
          />
          <q-input
            v-model="cardExpiryDate"
            label="Expiry Date (MM/YYYY)"
            :rules="[
              (val) =>
                isValidExpiryDate(val) ||
                'Expiry Date must be in the format MM/YYYY && in future',
            ]"
          />
          <q-input v-model="cardCVV" label="CVV" />
          <q-card-actions align="right">
            <q-card-action>
              <q-btn label="Cancel" color="negative" @click="closeModal" />
            </q-card-action>
            <q-card-action>
              <q-btn type="submit" label="Save" class="button-save" />
            </q-card-action>
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { QCard, QCardSection, QCardActions } from "quasar";

export default {
  components: {
    QCard,
    QCardSection,
    QCardActions,
  },
  props: {},
  data() {
    return {
      cardholderName: "",
      cardNumber: "",
      cardExpiryDate: "",
      cardCVV: "",
    };
  },
  methods: {
    closeModal() {
      this.resetFields();
      this.$emit("close");
    },
    resetFields() {
      this.cardholderName = "";
      this.cardNumber = "";
      this.cardExpiryDate = "";
      this.cardCVV = "";
    },
    saveCreditCard() {
      if (!this.cardholderName) {
        return;
      }
      if (!this.isValidExpiryDate(this.cardExpiryDate)) {
        return;
      }
      let form = {
        name: this.cardholderName,
        number: this.cardNumber,
        expiry: this.cardExpiryDate,
        cvv: this.cardCVV,
        freeze: false,
      };
      this.$emit("add", form);
      this.closeModal();
    },
    isValidExpiryDate(date) {
      const pattern = /^(0[1-9]|1[0-2])\/20[2-9][0-9]$/;
      return pattern.test(date);
    },
    generateCardDetails() {
      console.log("generateCardDetails");
      let result = "";
      for (let i = 0; i < 16; i++) {
        const rd = Math.floor(Math.random() * 10);
        result += rd.toString();
      }
      this.cardNumber = result;
      let mm = Math.floor(Math.random() * 12) + 1;
      let yy = Math.floor(Math.random() * (2050 - 2023 + 1)) + 2023;
      let cardCVV = "";
      this.cardExpiryDate = `${mm.toString().padStart(2, "0")}/${yy}`;
      for (let i = 0; i < 3; i++) {
        const rd1 = Math.floor(Math.random() * 10);
        cardCVV += rd1.toString();
      }
      this.cardCVV = cardCVV;
    },
  },
};
</script>

<style scoped>
.new-card {
  min-width: 400px;
}
.new-card-title {
  font-size: 24px;
}
.button-save {
  background-color: #01d167;
  color: var(--white);
  margin: 0px 0 0 20px;
}
</style>

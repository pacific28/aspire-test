<template>
  <q-card class="custom-card">
    <q-card-section>
      <q-card-title>Delete Confirmation</q-card-title>
    </q-card-section>

    <q-card-section>
      <p>Are you sure you want to delete this item?</p>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Cancel" color="positive" @click="closeDelete" />
      <q-btn label="Delete" color="negative" @click="confirmDelete" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { QCard, QCardSection, QCardActions } from "quasar";

export default {
  components: {
    QCard,
    QCardSection,
    QCardActions,
  },
  data() {
    return {};
  },
  methods: {
    closeDelete() {
      this.$emit("close");
    },
    confirmDelete() {
      this.$emit("confirm");
    },
  },
};
</script>

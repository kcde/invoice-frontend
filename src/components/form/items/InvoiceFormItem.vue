<template>
  <div>
    <InputText label="item name" name="item-name-1" />
    <InputNumber label="qty." name="qty-1" />
    <InputNumber label="price" type="price" name="price-1" />
  </div>
</template>

<script setup lang="ts">
import InputText from '../InputText.vue'
import InputNumber from '../InputNumber.vue'
</script>

<style scoped></style>

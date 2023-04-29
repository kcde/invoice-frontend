<template>
  <div class="grid grid-cols-10 gap-4 md:grid-cols-12">
    <div class="col-span-full md:col-span-4">
      <InputText label="item name" name="item-name-1" />
    </div>

    <div class="col-span-2 md:col-span-2">
      <InputNumber label="qty." name="qty-1" />
    </div>
    <div class="col-span-3">
      <InputNumber label="price" type="price" name="price-1" />
    </div>

    <div class="col-span-5 md:col-span-3">
      <div>
        <p class="text-sm text-purple-100 capitalize dark:text-gray-200 mb-[10px]">total</p>

        <div class="flex items-center justify-between">
          <p class="py-4 font-bold">156.00</p>

          <DeleteIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from '../InputText.vue'
import InputNumber from '../InputNumber.vue'
import DeleteIcon from '../../icons/DeleteIcon.vue'
</script>

<style scoped></style>

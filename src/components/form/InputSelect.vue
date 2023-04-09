<template>
  <BaseInput label="label">
    <div class="relative">
      <div class="absolute top-2/4 -translate-y-2/4 right-5 rotate-180">
        <CaretIcon />
      </div>
      <select
        class="relative w-full py-4 pl-5 text-sm font-bold text-blue-500 transition-colors duration-200 bg-transparent border border-gray-200 rounded outline-none appearance-none cursor-pointer dark:text-white dark:border-blue-200 leading-sm focus:border-purple-200 dark:focus:border-purple-200 focus:outline-none placeholder:text-blue-500/30 dark:bg-blue-300"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
  </BaseInput>
</template>

<script setup lang="ts">
import CaretIcon from '../icons/CaretIcon.vue'
import BaseInput from './BaseInput.vue'
</script>

<style scoped>
select {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
select::after {
  content: '';
  color: red;
  height: 10px;
  height: 10px;
}
</style>

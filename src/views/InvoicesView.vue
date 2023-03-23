<template>
  <div>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg md:text-xl">Invoices</h1>

        <div class="text-sm font-medium text-gray-300 dark:text-gray-200">
          <p class="hidden md:block">There are 7 total invoices</p>

          <p class="md:hidden">7 invoices</p>
        </div>
      </div>
      <div class="flex items-center justify-between gap-[18px] md:gap-10">
        <div>
          <FilterCheckbox />
        </div>
        <p>new invoice</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FilterCheckbox from '@/components/UI/FilterCheckbox.vue'
</script>

<template>
  <div class="relative">
    <button class="flex items-center gap-4">
      <p class="text-sm font-bold">Filter <span class="hidden md:inline"> by status</span></p>

      <div class="rotate-180">
        <CaretIcon />
      </div>
    </button>

    <div
      class="absolute bg-white rounded-lg top-[calc(100%+1.5rem)] min-w-[192px] left-2/4 -translate-x-2/4 shadow-xl shadow-[#48549F40] py-6 pl-6"
    >
      <InputCheckbox />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CaretIcon from '../icons/CaretIcon.vue'
import InputCheckbox from '../form/InputCheckbox.vue'
</script>

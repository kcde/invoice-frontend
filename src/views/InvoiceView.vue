<template>
  <div>
    <div class="mb-8">
      <button class="cursor-pointer" @click="$router.push('/')">
        <div class="flex items-center gap-6 text-sm">
          <div class="-rotate-90">
            <CaretIcon />
          </div>
          Go back
        </div>
      </button>
    </div>

    <div class="grid gap-4 md:gap-6">
      <div
        class="items-center justify-between px-6 py-5 bg-white rounded-lg md:px-8 dark:bg-blue-300 md:flex"
      >
        <div class="flex items-center justify-between md:gap-4">
          <span class="text-sm">Status</span>
          <InvoiceStatus status="pending" />
        </div>

        <!-- buttons -->
        <div class="hidden gap-2 md:flex">
          <MainButton text="Delete" type="colored" />
          <MainButton text="Mark as paid" />

          <SecondaryButton text="edit" />
        </div>
      </div>

      <div class="px-6 py-5 bg-white rounded-lg md:px-8 dark:bg-blue-300"></div>
    </div>

    <h1>{{ $route.params.id }}</h1>
  </div>
</template>

<script setup lang="ts">
import MainButton from '@/components/UI/buttons/MainButton.vue'
import SecondaryButton from '@/components/UI/buttons/SecondaryButton.vue'
import CaretIcon from '@/components/icons/CaretIcon.vue'
import InvoiceStatus from '@/components/invoice/InvoiceStatus.vue'
</script>

<style scoped></style>

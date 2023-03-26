<template>
  <div class="max-w-[217px] border border-red-100 mx-auto">
    <div class="">
      <div class="px-4 mb-10">
        <img src="../assets/images/empty_invoice.svg" alt="emty invoice illustration" />
      </div>
      <div class="text-center">
        <p class="mb-6 text-lg font-bold">There is nothing here</p>
        <p class="text-sm tracking-tighter text-gray-300">
          Create an invoice by clicking <br />
          the New button and get started
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmptyAnnounceIcon from './icons/EmptyAnnounceIcon.vue'
</script>

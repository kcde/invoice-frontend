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

    <h1>{{ $route.params.id }}</h1>
  </div>
</template>

<script setup lang="ts">
import CaretIcon from '@/components/icons/CaretIcon.vue'
</script>

<style scoped></style>

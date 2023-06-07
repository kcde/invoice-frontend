<template>
  <!-- TODO -- should be dynamic to access links  -->
  <div class="w-8 h-8 overflow-hidden border border-purple-200 rounded-full lg:h-10 lg:w-10">
    <img :src="`https://robohash.org/${props.email}`" class="w-full" alt="user avatar" />
  </div>
</template>

<script setup lang="ts">
import { string } from 'yup'

const props = defineProps({
  email: {
    type: String,
    required: true
  }
})
</script>

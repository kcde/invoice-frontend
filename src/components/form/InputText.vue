<template>
  <label class="block">
    <p v-if="showLabel" class="text-sm text-purple-100 capitalize dark:text-gray-200 mb-[10px]">
      {{ label }}
    </p>
    <input
      type="text"
      name=""
      :aria-label="label"
      :title="label"
      class="w-full py-4 pl-5 text-sm font-bold text-blue-500 transition-colors duration-200 border border-gray-200 rounded dark:text-white dark:border-blue-200 leading-sm focus:border-purple-200 dark:focus:border-purple-200 focus:outline-none placeholder:text-blue-500/30 dark:bg-blue-300 caret-purple-300"
      :placeholder="placeholder"
    />
  </label>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true
  },

  showLabel: {
    type: Boolean,
    required: false,
    default: true
  },

  placeholder: {
    type: String,
    required: false
  }
})
</script>

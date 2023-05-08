<template>
  <BaseInput :label="label" :error-message="errorMessage" :show-label="showLabel">
    <input
      :type="type"
      :name="name"
      :aria-label="label"
      v-on="handleValidationListeners"
      :value="value"
      :title="label"
      class="w-full py-4 pl-5 text-sm font-bold text-blue-500 transition-colors duration-300 border rounded dark:text-white dark:border-blue-200 leading-sm focus:border-purple-200 dark:focus:border-purple-200 focus:outline-none placeholder:text-blue-500/30 dark:placeholder:text-gray-300/20 dark:bg-blue-300 caret-purple-300"
      :class="{
        'focus:border-red-200 dark:border-red-200 ': errorMessage,
        'border-red-200 dark:border-red-200': errorMessage
      }"
      :placeholder="placeholder"
    />
  </BaseInput>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import BaseInput from './BaseInput.vue'
import { useField } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true
  },

  name: {
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
  },

  type: {
    type: String as PropType<'email'>,
    required: false,
    default: 'text'
  }
})

const { errorMessage, value, handleChange } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false
})

const handleValidationListeners = computed(() => {
  {
    //this switches between agressisve validation and lazy validation

    if (!errorMessage.value) {
      return {
        blur: handleChange,
        change: handleChange
        // input: (e: Event) => handleChange(e)
      }
    }

    return {
      blur: handleChange,
      change: handleChange,
      input: handleChange
    }
  }
})
</script>

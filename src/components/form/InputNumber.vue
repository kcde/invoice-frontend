<template>
  <BaseInput :label="label" :error-message="errorMessage">
    <input
      :name="name"
      class="w-full px-5 py-4 text-sm font-bold text-blue-500 transition-colors duration-200 border border-gray-200 rounded dark:text-white dark:border-blue-200 leading-sm focus:outline-none placeholder:text-blue-500/30 dark:placeholder:text-white/30 dark:bg-blue-300 caret-purple-300 focus:border-purple-200 dark:focus:border-purple-200"
      :class="{
        'focus:border-red-200 dark:border-red-200 ': errorMessage,
        'border-red-200 dark:border-red-200': errorMessage
      }"
      @blur="handleBlur"
      ref="numberInput"
      :aria-label="label"
      v-on="handleValidationListeners"
      @input="handleChange"
      :value="value"
      :title="label"
      :placeholder="placeholder"
      type="number"
      min="0"
      :step="type == 'price' ? '0.01' : '1'"
    />
  </BaseInput>
</template>

<script setup lang="ts">
import { type PropType, ref, computed } from 'vue'
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

  type: {
    type: String as PropType<'price'>,
    required: false,
    default: 'number'
  },

  modelValue: {
    type: Number
  },
  placeholder: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['update:modelValue'])

const { errorMessage, value, handleChange, errors, validate } = useField(() => props.name)

const inputNumber = ref(props.modelValue as number)

function handleNumberInput(e: Event) {
  const newVal = (e.target as HTMLInputElement).value

  emit('update:modelValue', Number(newVal))
}

function handleBlur(e: Event) {
  if (props.type == 'price' && (e.target as HTMLInputElement).value.trim() !== '') {
    ;(e.target as HTMLInputElement).value = Number((e.target as HTMLInputElement).value).toFixed(2)
  }
}

const handleValidationListeners = computed(() => {
  {
    //this switches between agressisve validation and lazy validation

    if (!errorMessage.value) {
      return {
        blur: handleChange,
        change: handleChange,
        input: (e: Event) => handleChange(e)
      }
    }

    return {
      blur: () => {
        handleBlur
        handleChange
      },
      change: handleChange,
      input: handleChange
    }
  }
})
</script>

<style scoped></style>

<template>
  <BaseInput :label="label">
    <input
      class="w-full py-4 px-5 text-sm font-bold text-blue-500 transition-colors duration-200 border border-gray-200 rounded dark:text-white dark:border-blue-200 leading-sm focus:outline-none placeholder:text-blue-500/30 dark:placeholder:text-white/30 dark:bg-blue-300 caret-purple-300;"
      :value="inputNumber"
      @input="handleNumberInput"
      @blur="handleBlur"
      ref="numberInput"
      :placeholder="placeholder"
      type="number"
      min="0"
      :step="type == 'price' ? '0.01' : '1'"
    />
  </BaseInput>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue'
import BaseInput from './BaseInput.vue'

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

const inputNumber = ref(props.modelValue as number)

function handleNumberInput(e: Event) {
  const newVal = (e.target as HTMLInputElement).value

  emit('update:modelValue', Number(newVal))
}

function handleBlur(e: Event) {
  if (props.type == 'price') {
    ;(e.target as HTMLInputElement).value = Number((e.target as HTMLInputElement).value).toFixed(2)
  }
}
</script>

<style scoped></style>

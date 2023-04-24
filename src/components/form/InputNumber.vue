<template>
  <BaseInput :label="label">
    <input
      :value="inputNumber"
      @input="handleNumberInput"
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
</script>

<style scoped></style>

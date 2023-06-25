<template>
  <!-- @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" -->
  <label class="flex items-center gap-3 text-sm font-bold capitalize cursor-pointer">
    <input
      :type="props.type"
      :id="props.label"
      v-model="model"
      :value="props.label"
      :checked="props.checked"
      class="relative grid w-4 h-4 transition-all bg-gray-200 border border-[transparent] rounded-sm appearance-none cursor-pointer dark:bg-blue-300 hover:border-purple-300 hover:border-opacity-100 dark:checked:bg-purple-300 checked:bg-purple-300 checked:border-purple-300 place-items-center"
    />
    {{ props.label }}
  </label>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },

  set(value) {
    emit('update:modelValue', value)
  }
})
const props = defineProps({
  modelValue: {
    type: Array
  },
  label: {
    required: true,
    type: String,
    default: 'checkbox'
  },
  checked: {
    required: false,
    type: Boolean,
    default: false
  },
  type: {
    required: true,
    type: String as PropType<'radio' | 'checkbox'>
  },
  name: {
    required: true,
    type: String
  }
})
</script>

<style>
input[type='checkbox']:checked,
input[type='radio']:checked {
  background-image: url('../../assets/images/check.svg');
  background-repeat: no-repeat;
  background-position: center;
}
</style>

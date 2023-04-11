<template>
  <BaseInput label="label" ref="inputContainer">
    <div class="relative">
      <div class="relative">
        <div class="absolute top-2/4 -translate-y-2/4 right-5 rotate-180">
          <CaretIcon />
        </div>
        <button
          ref="dropdownButton"
          @click="toggleListOptionVisibility()"
          @keyup.up="toggleListOptionVisibility(true)"
          @keyup.down="toggleListOptionVisibility(true)"
          class="relative w-full py-4 pl-5 text-sm font-bold text-blue-500 transition-colors duration-200 bg-transparent border border-gray-200 rounded outline-none appearance-none cursor-pointer dark:text-white dark:border-blue-200 leading-sm focus:border-purple-200 dark:focus:border-purple-200 focus:outline-none placeholder:text-blue-500/30 dark:bg-blue-300 text-left capitalize"
          role="combobox"
          :aria-expanded="listOptionsVisibility"
        >
          {{ selectedOption }}
        </button>
      </div>

      <!-- OPTIONS -->
      <ListBox
        v-if="listOptionsVisibility"
        @item-selected="(e:string) => handleItemSelect(e)"
        :listOptions="options"
        :selectedOption="selectedOption"
      />
    </div>
  </BaseInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import ListBox from './ListBox.vue'
import CaretIcon from '../../icons/CaretIcon.vue'
import BaseInput from '../BaseInput.vue'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['item-selected'])
const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    required: true
  },
  selectedOption: {
    type: String,
    required: true
  }
})

const inputContainer = ref(null)
const listOptionsVisibility = ref(false)
// POINTS TO THE CONTAINER THAT HOLDS THE OPTIONS
const dropdownButton = ref(null)

onClickOutside(inputContainer, () => {
  toggleListOptionVisibility(false)
})

function toggleListOptionVisibility(state: boolean | undefined = undefined) {
  if (state != undefined) {
    listOptionsVisibility.value = state
    return
  }

  listOptionsVisibility.value = !listOptionsVisibility.value
}

function handleItemSelect(item: string) {
  emit('item-selected', item)
  toggleListOptionVisibility(false)
  ;(dropdownButton.value as unknown as HTMLButtonElement).focus()
}
</script>

<style scoped>
select {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
select::after {
  content: '';
  color: red;
  height: 10px;
  height: 10px;
}
</style>

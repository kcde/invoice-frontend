<template>
  <BaseInput label="label">
    <div class="relative">
      <div class="relative">
        <div class="absolute top-2/4 -translate-y-2/4 right-5 rotate-180">
          <CaretIcon />
        </div>
        <button
          @click="toggleListOptionVisibility"
          @keyup.up="toggleListOptionVisibility"
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

const listOptionsVisibility = ref(true)

// POINTS TO THE CONTAINER THAT HOLDS THE OPTIONS
const optionsContainer = ref(null)

function openOptionsBox() {
  //check for currently selected item and add aria selected
  //else use default
}

function toggleListOptionVisibility() {
  console.log(78)

  listOptionsVisibility.value = !listOptionsVisibility.value
}

const emit = defineEmits(['item-selected'])

function handleItemSelect(item: string) {
  emit('item-selected', item)
}

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

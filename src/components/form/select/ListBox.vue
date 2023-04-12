<template>
  <!-- OPTIONS -->

  <ul
    ref="options"
    role="listbox"
    @click.prevent
    class="bg-white dark:bg-blue-200 absolute left-0 top-[calc(100%+8px)] w-full rounded-lg text-sm font-bold divide-y divide-gray-200 dark:divide-blue-300 shadow-lg shadow-purple-100/40 dark:shadow-blue-500/40 z-10 max-h-96 overflow-y-scroll"
  >
    <li
      v-for="option in props.listOptions"
      :key="option"
      class="leading-sm pl-6 py-4 hover:text-purple-300 cursor-pointer focus:outline-none aria-selected:text-purple-300 capitalize focus:bg-purple-100/10"
      role="option"
      :aria-selected="option == selectedOption"
      @click="handleOptionSelect(option)"
      @keyup.enter.space="handleOptionSelect(option)"
      @keydown.down="handleNextItemSelect"
      @keydown.up="handlePreviousItemSelect"
      @keydown.tab.prevent
      tabindex="0"
    >
      {{ option }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  listOptions: {
    type: Array as PropType<string[]>,
    required: true
  },
  selectedOption: {
    type: String,
    required: true
  }
})

const options = ref(null)

const emit = defineEmits(['item-selected'])

function handleNextItemSelect(e: Event) {
  const item = e.target as HTMLLIElement
  const nextItem = item.nextElementSibling as HTMLLIElement

  // check if there is a next item
  if (nextItem) {
    nextItem.focus()
  }
}
function handlePreviousItemSelect(e: Event) {
  const item = e.target as HTMLLIElement
  const previousItem = item.previousElementSibling as HTMLLIElement

  // check if there is a previous item
  if (previousItem) {
    previousItem.focus()
  }
}

function handleOptionSelect(item: string) {
  emit('item-selected', item)
}

onMounted(() => {
  //When mounted focus on the currently selected item using the aria-selected attribute
  const optionsItems = (options.value as unknown as HTMLUListElement).querySelectorAll('li')
  for (let i = 0; i < optionsItems.length; i++) {
    if (optionsItems[i].ariaSelected == 'true') {
      optionsItems[i].focus()
    }
  }
})
</script>

<style scoped></style>

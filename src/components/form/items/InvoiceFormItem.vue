<template>
  <div class="grid grid-cols-10 gap-4 md:grid-cols-12" ref="qty">
    <div class="mb-6 col-span-full md:col-span-4 md:mb-0">
      <InputText label="item name" :name="`items[${id}].name`" :showLabel="showLabel" />
    </div>

    <div class="col-span-2 md:col-span-2">
      <InputNumber label="qty." :name="`items[${id}].quantity`" :showLabel="showLabel" />
    </div>
    <div class="col-span-3">
      <InputNumber label="price" type="price" :name="`items[${id}].price`" :showLabel="showLabel" />
    </div>

    <div class="col-span-5 md:col-span-3">
      <div>
        <p
          class="text-sm text-purple-100 capitalize dark:text-gray-200 mb-[10px]"
          :class="{ 'sr-only': !showLabel }"
        >
          total
        </p>

        <div class="flex items-center justify-between">
          <p class="py-4 font-bold">{{ total }}</p>
          <div @click.stop="remove(id)">
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from '../InputText.vue'
import InputNumber from '../InputNumber.vue'
import DeleteIcon from '../../icons/DeleteIcon.vue'
import { ref, type PropType, computed } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const smallerThanMd = breakpoints.smaller('md') // only smaller than md

const qty = ref(null)

const props = defineProps({
  id: {
    type: Number,
    required: true
  },

  value: {
    type: Object as PropType<{
      price: number
      name: string
      quantity: number
    }>,
    required: true
  },
  remove: {
    type: Function,
    required: true
  }
})

const total = computed(() => {
  return props.value.price * props.value.quantity
})
const showLabel = computed(() => {
  return props.id == 0 || smallerThanMd.value == true ? true : false
})
</script>

<style scoped></style>

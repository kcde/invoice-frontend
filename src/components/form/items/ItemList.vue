<template>
  <div>
    <!-- key prop needs extra element not just the keys to avaoid vue reusing ids for v-for -->

    <InvoiceFormItem
      v-for="(field, idx) in fields"
      :key="`${field.key}${idx}`"
      :id="idx"
      :value="values.items[idx]"
      :remove="remove"
    />

    <!-- <button type="button" @click="push({ name: '', quantity: '', price: '' })">Add</button> -->
    <SecondaryButton text="add new item" @click="push({ name: '', quantity: '', price: '' })" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import InvoiceFormItem from './InvoiceFormItem.vue'
import { useFieldArray, type FieldEntry } from 'vee-validate'
import SecondaryButton from '@/components/UI/buttons/SecondaryButton.vue'

const props = defineProps({
  //   fields: {
  //     type: Array as PropType<FieldEntry[]>,
  //     required: true
  //   },
  //   values: {
  //     type: Object,
  //     required: true
  //   },
  //   remove: {
  //     type: Function,
  //     required: true
  //   }
  values: {
    type: Object,
    required: true
  }
})

const { remove, push, fields } = useFieldArray('items')
</script>

<style lang="scss" scoped></style>

<template>
  <div class="grid gap-[18px]">
    <InvoiceFormItem
      v-for="(field, idx) in fields"
      :key="`${field.key}${idx}`"
      :id="idx"
      :value="values.items[idx]"
      :remove="remove"
    />
    <SecondaryButton text="add new item" @click="push({ name: '', quantity: '', price: '' })" />
  </div>
</template>

<script setup lang="ts">
import InvoiceFormItem from './InvoiceFormItem.vue'
import { useFieldArray } from 'vee-validate'
import SecondaryButton from '@/components/UI/buttons/SecondaryButton.vue'

const props = defineProps({
  values: {
    type: Object,
    required: true
  }
})

const { remove, push, fields } = useFieldArray('items')
</script>

<style lang="scss" scoped></style>

<template>
  <div class="grid grid-cols-10 gap-4 md:grid-cols-12" ref="qty">
    <div class="col-span-full md:col-span-4">
      <InputText label="item name" :name="`items[${id}].name`" />
    </div>

    <div class="col-span-2 md:col-span-2">
      <InputNumber label="qty." :name="`items[${id}].quantity`" />
    </div>
    <div class="col-span-3">
      <InputNumber label="price" type="price" :name="`items[${id}].price`" ref="prc" />
    </div>

    <div class="col-span-5 md:col-span-3">
      <div>
        <p class="text-sm text-purple-100 capitalize dark:text-gray-200 mb-[10px]">total</p>

        <div class="flex items-center justify-between">
          <p class="py-4 font-bold">0.00</p>

          <DeleteIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from '../InputText.vue'
import InputNumber from '../InputNumber.vue'
import DeleteIcon from '../../icons/DeleteIcon.vue'
import { ref } from 'vue'
import { formSchema } from '@/utilities/form'
import { useForm } from 'vee-validate'

const qty = ref(null)
const prc = ref(null)

const { errors, values } = useForm({
  validationSchema: formSchema
})

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  field: {
    type: Object
  }
})
</script>

<style scoped></style>

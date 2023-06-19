<template>
  <form
    class="absolute top-0 left-0 z-10 w-full bg-white dark:bg-blue-400 md:w-4/5 max-w-[719px] h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] lg:h-screen grid lg:pl-[103px] transition-colors duration-300 overflow-hidden sm:rounded-br-[20px] sm:rounded-tr-[20px]"
    @submit.prevent
  >
    <!-- FORM HEAD -->
    <div class="px-6 pt-8 pb-6 md:pb-12 bg-inherit md:px-14">
      <div class="">
        <button class="flex items-center gap-6 mb-6 text-sm font-bold tracking-tighter md:hidden">
          <div class="-rotate-90">
            <CaretIcon />
          </div>

          Go back
        </button>

        <div>
          <p class="text-2xl font-bold tracking-tight">New Invoice</p>
          <p class="hidden text-2xl font-bold tracking-tight">
            Edit <span class="text-gray-300">#</span>XM9141
          </p>
        </div>
      </div>
    </div>

    <!-- FORM BODY -->

    <div class="pl-6 pr-4 mr-2 overflow-y-scroll md:pl-14 md:pr-6 md:mr-8">
      <div class="grid gap-10 mb-16 md:gap-12 md:mb-6">
        <fieldset>
          <legend class="mb-6 text-sm font-bold text-purple-300 capitalize">bill from</legend>

          <div class="grid grid-cols-6 gap-6">
            <InputText name="sender.streetAddress" label="street address" class="col-span-full" />

            <InputText name="sender.city" label="city" class="col-span-3 md:col-span-2" />
            <InputText name="sender.postCode" label="post code" class="col-span-3 md:col-span-2" />
            <InputText name="sender.country" label="country" class="col-span-full md:col-span-2" />
          </div>
        </fieldset>
        <fieldset>
          <legend class="mb-6 text-sm font-bold text-purple-300 capitalize">bill to</legend>

          <div class="grid grid-cols-6 gap-6">
            <InputText
              name="client.name"
              label=" client's name"
              class="col-span-full"
              placeholder="Adekunle Ikechukwu"
            />
            <InputText
              name="client.email"
              type="email"
              label=" client's email"
              class="col-span-full"
              placeholder="shevchenko@acmilan.com"
            />

            <InputText name="client.streetAddress" label="street address" class="col-span-full" />

            <InputText name="client.city" label="city" class="col-span-3 md:col-span-2" />
            <InputText name="client.postCode" label="post code" class="col-span-3 md:col-span-2" />
            <InputText name="client.country" label="country" class="col-span-full md:col-span-2" />
          </div>
        </fieldset>

        <div class="grid gap-6 md:grid-cols-4">
          <div class="md:col-span-2"><InputDate @date-update="handleDateSelect" /></div>
          <div class="md:col-span-2">
            <InputSelect
              :options="paymentTermDays"
              :selected-option="selectedPaymentTerm"
              @item-selected="handlePaymentTermSelect"
              label="payment terms"
            />
          </div>
          <div class="md:col-span-full">
            <InputText label="project description" name="description" />
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-[#777F98] capitalize text-[18px] mb-6">item list</h3>
        <ItemList :values="values" />

        <!-- ERROR LIST -->

        <div class="mt-8 space-y-2" v-if="uniqueFormErrorText.length" ref="errorListRef">
          <p
            v-for="text in uniqueFormErrorText"
            :key="text"
            class="text-[10px] font-semibold text-red-200"
          >
            - {{ text }}
          </p>
        </div>
      </div>
    </div>

    <!-- FORM FOOTER -->
    <div class="p-6 mt-4 md:py-8 md:px-14 dark:bg-blue-400">
      <div class="flex justify-between gap-[7px]">
        <MainButton type="light" text="discard" />

        <div class="space-x-[7px] whitespace-nowrap">
          <MainButton type="dark" text="save as draft" />
          <MainButton text="save & send " @click="handleSubmit" />
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import InputText from '../form/InputText.vue'
import CaretIcon from '../icons/CaretIcon.vue'
import MainButton from '../UI/buttons/MainButton.vue'
import InputSelect from '../form/select/InputSelect.vue'
import { ref, watchEffect, type Ref } from 'vue'
import InputDate from '../form/date/InputDate.vue'
import ItemList from '../form/items/ItemList.vue'
import { useForm } from 'vee-validate'
import { formSchema } from '../../utilities/form'
import { createInvoice } from '@/services/invoice.service'
import { useInvoiceStore } from '@/stores/invoice'
import { InvoiceStatus, type IInvoiceResponse } from '@/types'

const invoiceStore = useInvoiceStore()

const { errors, values, validate, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    sender: {
      streetAddress: '',
      city: '',
      postCode: '',
      country: ''
    },
    client: {
      name: '',
      email: '',
      streetAddress: '',
      city: '',
      postCode: '',
      country: ''
    },
    description: '',
    items: []
  }
})

const errorListRef = ref(null)

const uniqueFormErrorText: Ref<string[]> = ref([])

const paymentTermDays = ref(['1', '7', '14', '30'])
const selectedPaymentTerm = ref(paymentTermDays.value[1])
const selectedDate = ref(new Date())

const emit = defineEmits(['close-form'])

function handlePaymentTermSelect(term: string) {
  selectedPaymentTerm.value = term
}

function handleDateSelect(date: Date) {
  selectedDate.value = date
}

function handleSubmit() {
  uniqueFormErrorText.value = []

  validate().then(async (result) => {
    if (result.valid) {
      const payload: IInvoiceResponse = {
        issueDate: selectedDate.value,
        paymentTerm: selectedPaymentTerm.value,
        id: String(Math.floor(Math.random() * 10000)),
        user: String(Math.random() * 100000),
        status: InvoiceStatus.Pending,
        ...values
      }
      // const invoiceData = await createInvoice(payload)\
      invoiceStore.addInvoice(JSON.parse(JSON.stringify(payload)))
      resetForm()

      emit('close-form')
    }

    for (let key in errors.value) {
      //@ts-ignore

      let errorText: string = errors.value[key]
      //@ts-ignore

      if (errors.value[key].startsWith('items[')) {
        errorText = 'All fields must be added'
      }
      //@ts-ignore
      if (!uniqueFormErrorText.value.includes(errorText)) {
        //@ts-ignore
        uniqueFormErrorText.value.push(errorText)
      }
    }
  })
}

watchEffect(() => {
  if (errorListRef.value) {
    ;(errorListRef.value as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest'
    })
  }
})
</script>

<style scoped>
form {
  grid-template-rows: min-content 1fr min-content;
}
</style>

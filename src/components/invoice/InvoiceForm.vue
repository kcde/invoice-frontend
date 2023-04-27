<template>
  <form
    @submit.prevent="handleSubmit"
    class="absolute top-0 left-0 z-10 w-full bg-white dark:bg-blue-400 md:w-4/5 max-w-[719px] h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] lg:h-screen grid lg:pl-[103px] transition-colors duration-300"
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

    <div class="pl-6 pr-4 mr-2 overflow-scroll md:pl-14 md:pr-6 md:mr-8">
      <div class="grid gap-10 md:gap-12">
        <fieldset>
          <legend class="mb-6 text-sm font-bold text-purple-300 capitalize">bill from</legend>

          <div class="grid grid-cols-6 gap-6">
            <InputText name="sender.streetAddress" label="street address" class="col-span-full" />

            <InputText name="sender.city" label="city" class="col-span-3 md:col-span-2" />
            <InputText name="sender.postCode" label="post codel" class="col-span-3 md:col-span-2" />
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
            <InputText name="client.postCode" label="post codel" class="col-span-3 md:col-span-2" />
            <InputText name="client.country" label="country" class="col-span-full md:col-span-2" />
          </div>
        </fieldset>

        <div class="grid gap-6 md:grid-cols-4">
          <div class="md:col-span-2"><InputDate /></div>
          <div class="md:col-span-2">
            <InputSelect
              :options="paymentTermDays"
              :selected-option="selectedPaymentTerm"
              @item-selected="handlePaymentTermSelect"
            />
          </div>
          <div class="md:col-span-full">
            <InputText label="project description" name="description" />
          </div>
        </div>
      </div>

      <!-- TODO!! REMEBER TO REMOVE -->
      <div class="hidden">
        <pre>{{ errors }}</pre>
        <pre>{{ values }}</pre>
      </div>

      <!-- 
      <InputText label="input label" :show-label="false" />
      <InputDate />

      <InputText label="input label" :show-label="false" />
      <InputText label="input label" :show-label="false" />
      <InputText label="input label" :show-label="false" />
      <InputNumber label="quantity" :modelValue="number4" @update:model-value="handleNumber" />
      <InputSelect
        :options="PaymentTerms"
        :selectedOption="selectedPaymentTerm"
        @item-selected="(e:string) => handleInputSelect(e)"
      />

      <InputText label="input label" :show-label="false" /> -->
    </div>

    <!-- FORM FOOTER -->
    <div class="p-6 md:py-8 md:px-14">
      <div class="flex justify-between gap-[7px]">
        <MainButton type="light" text="discard" />

        <div class="space-x-[7px] whitespace-nowrap">
          <MainButton type="dark" text="save as draft" />
          <MainButton text="save & send " />
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
import { ref } from 'vue'
import InputDate from '../form/date/InputDate.vue'
import InputNumber from '../form/InputNumber.vue'

import { useForm } from 'vee-validate'
import { formSchema } from '../../utilities/form'

const { errors, values, validate } = useForm({
  validationSchema: formSchema
})

const paymentTermDays = ref(['1', '7', '14', '30'])
const selectedPaymentTerm = ref(paymentTermDays.value[1])

function handlePaymentTermSelect(term: string) {
  selectedPaymentTerm.value = term
}

function handleSubmit() {
  // validate()
}
</script>

<style scoped>
form {
  grid-template-rows: min-content 1fr min-content;
}
</style>

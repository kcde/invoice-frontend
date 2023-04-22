<template>
  <form
    @submit.prevent
    class="absolute top-0 left-0 z-10 w-full bg-white dark:bg-blue-400 md:w-4/5 max-w-[719px] h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] lg:h-screen grid lg:pl-[103px]"
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
      <InputText label="input label" :show-label="false" />
      <InputDate />

      <InputText label="input label" :show-label="false" />
      <InputText label="input label" :show-label="false" />
      <InputText label="input label" :show-label="false" />

      <InputSelect
        :options="PaymentTerms"
        :selectedOption="selectedPaymentTerm"
        @item-selected="(e:string) => handleInputSelect(e)"
      />

      <InputText label="input label" :show-label="false" />
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

// const props = defineProps({
//   formDetails: {
//     type: Object
//   }
// })

const PaymentTerms = ref(['net 1 day', 'net 7 days', 'net 14 days', 'net 30 days'])
const selectedPaymentTerm = ref(PaymentTerms.value[0])
function handleInputSelect(selectedItem: string) {
  selectedPaymentTerm.value = selectedItem
}
</script>

<style scoped>
form {
  grid-template-rows: min-content 1fr min-content;
}
</style>

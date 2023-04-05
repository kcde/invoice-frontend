<template>
  <!-- p-6 md:p-14 -->

  <form
    @submit.prevent
    class="absolute top-0 left-0 z-10 w-full bg-white md:w-4/5 max-w-[719px] h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] lg:h-screen grid grid-cols-[min-content 1fr min-content] lg:pl-[103px]"
  >
    <!-- FORM HEAD -->
    <div class="px-6 pt-8 pb-6 bg-white md:pb-12 bg-inherit md:px-14 bg-red-100/20">
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
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
    </div>

    <!-- FORM FOOTER -->
    <div class="p-6 md:py-8 md:px-14 bg-red-100/20">
      <MainButton text="save & send 0" />
      <MainButton type="colored" text="save & send 1" />
      <MainButton type="dark" text="save & send 2" />
      <MainButton type="light" text="save & send 3" />
    </div>
  </form>
</template>

<script lang="ts" setup>
import InputText from '../form/InputText.vue'
import CaretIcon from '../icons/CaretIcon.vue'
import MainButton from '../UI/buttons/MainButton.vue'
</script>

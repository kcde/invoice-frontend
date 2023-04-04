<template>
  <!-- p-6 md:p-14 -->

  <form
    @submit.prevent
    class="absolute top-0 left-0 z-10 w-full bg-white md:w-4/5 max-w-[719px] h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] lg:h-screen grid lg:pl-[103px]"
  >
    <!-- FORM HEAD -->
    <div class="pb-6 bg-white bg-inherit md:pb-12 bg-red-100/20">
      <p class="">
        <slot name="form-head"></slot>
      </p>
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
    </div>

    <div class="py-10 bg-red-100/20">gvhygvbfgc</div>
  </form>
</template>

<script lang="ts" setup>
import InputText from '../form/InputText.vue'
</script>

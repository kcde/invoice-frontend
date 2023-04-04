<template>
  <!-- p-6 md:p-14 -->
  <form
    @submit.prevent
    class="absolute top-0 left-0 z-10 w-full bg-white max-w-[719px] h-screen grid"
  >
    <!-- FORM HEAD -->
    <div class="pb-6 bg-white bg-inherit md:pb-12 bg-red-100/20">
      <p class="">
        <slot name="form-head"></slot>
      </p>
    </div>

    <!-- FORM BODY -->

    <div class="p-6 overflow-scroll md:p-14">
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

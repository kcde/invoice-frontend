<template>
  <!-- p-6 md:p-14 -->
  <form @submit.prevent class="grid h-full bg-red-100">
    <!-- FORM HEAD -->
    <div class="top-0 pb-6 bg-white bg-inherit md:pb-12">
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
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
      <InputText label="input label" :show-label="true" />
    </div>

    <div class="py-10 bg-white">gvhygvbfgc</div>
  </form>
</template>

<script lang="ts" setup>
import InputText from '../form/InputText.vue'
</script>

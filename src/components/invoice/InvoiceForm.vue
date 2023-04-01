<template>
  <form @submit.prevent class="h-full overflow-scroll">
    <!-- FORM HEAD -->
    <div class="sticky top-0 pb-6 bg-white bg-inherit md:pb-12">
      <p class="">
        <slot name="form-head"></slot>
      </p>
    </div>

    <!-- FORM BODY -->

    <div class="">
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
  </form>
</template>

<script lang="ts" setup>
import InputText from '../form/InputText.vue'
</script>

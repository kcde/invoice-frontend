<template>
  <label class="flex items-center gap-3 cursor-pointer">
    <input
      type="checkbox"
      name=""
      class="relative grid w-4 h-4 transition-all bg-gray-200 border border-[transparent] rounded-sm appearance-none cursor-pointer dark:bg-blue-300 hover:border-purple-300 hover:border-opacity-100 dark:checked:bg-purple-300 checked:bg-purple-300 checked:border-purple-300 place-items-center"
    />
    checkbox
  </label>
</template>

<style>
input[type='checkbox']:checked {
  background-image: url('../../assets/images/check.svg');
  background-repeat: no-repeat;
  background-position: center;
}
</style>

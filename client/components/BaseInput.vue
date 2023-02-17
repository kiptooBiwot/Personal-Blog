<script setup>

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
</script>

<template>
  <div class="space-y-1">
    <p class="text-xs font-semibold">{{ title }}</p>
    <input
      class="rounded-md border w-full border-gray-400 px-4 py-2 text-gray-500 placeholder:text-gray-400 placeholder:text-sm"
      :type="type" :placeholder="title" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>


<style scoped>

</style>
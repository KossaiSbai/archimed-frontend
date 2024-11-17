<script setup lang="ts">
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('http://127.0.0.1:8000/sample/', {
  query: { }
})
console.log(data.value)
</script>
<template>
  <div>
    <h1>Sample</h1>
  </div>
</template>
<template>
    <div>
      <div v-if="loading">Loading...</div>
    
      <div v-else-if="error" class="error">
        <p>Error: {{ error }}</p>
      </div>
    
      <CapitalCall v-else :capital-call="capital_call" />
    </div>
  </template>
    
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Bill from '@/components/Bill.vue';
  
  const route = useRoute();
  const id = route.params.id;
  
  const capital_call = ref(null);
  const error = ref(null);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
    console.log("ID", id)
      const response = await $fetch(`/api/capital_calls/${id}`);
      console.log(response)
      capital_call.value = response.data
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  });
  </script>
    
  <style scoped>
  .error {
    color: red;
    font-weight: bold;
  }
  </style>
  
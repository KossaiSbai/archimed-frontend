<template>
    <div>
      <div v-if="loading">Loading...</div>
    
      <div v-else-if="error" class="error">
        <p>Error: {{ error }}</p>
      </div>

      <div v-if="!loading && !bill">
          <p>Bill not found</p>
      </div>

      <Bill v-if="bill" :bill="bill" />
    </div>
  </template>
    
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Bill from '@/components/Bill.vue';
  
  const route = useRoute();
  const id = route.params.id;
  
  const bill = ref(null);
  const error = ref(null);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
    console.log("ID", id)
      const response = await $fetch(`/api/bills/${id}`);
      console.log(response)
      bill.value = response.data
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
  
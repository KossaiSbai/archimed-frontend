<template>
    <div class="p-4">
        <div v-if="loading" class="text-center text-gray-500">Loading...</div>
        
        <div v-else-if="error" class="text-center text-red-500 font-bold">
            <p>Error: {{ error }}</p>
        </div>

        <div v-if="!loading && !entity" class="text-center text-gray-500">
            <p>Investment not found</p>
        </div>
        
        <Entity v-if="entity" :entity="entity" />
    </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Entity from '@/components/Entity.vue';

const route = useRoute();
const id = route.params.id;

const entity = ref(null);
const error = ref(null);
const loading = ref(true);

onMounted(async () => {
    try {
        console.log("ID", id)
        const response = await $fetch(`/api/entities/${id}`);
        console.log(response)
        entity.value = response.data
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});
</script>
    
<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>

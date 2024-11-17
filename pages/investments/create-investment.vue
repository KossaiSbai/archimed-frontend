<template>
    <div class="create-investment max-w-lg mx-auto mt-4 p-6 border border-gray-300 rounded-lg">
        <h1 class="text-center text-2xl font-bold mb-6">Create Investment</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-4">
                <label for="amount" class="block text-gray-700 mb-2">Amount:</label>
                <input type="number" v-model="investment.amount" required class="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
                <label for="investor_id" class="block text-gray-700 mb-2">Investor:</label>
                <select v-model="investment.investor_id" required class="w-full p-2 border border-gray-300 rounded">
                    <option v-for="investor in investors" :key="investor._id.$oid" :value="investor._id.$oid">
                        {{ investor.contact_person }}
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label for="duration" class="block text-gray-700 mb-2">Duration (years):</label>
                <input type="number" v-model="investment.duration" required class="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
                <label for="date" class="block text-gray-700 mb-2">Date:</label>
                <input type="date" v-model="investment.date" required class="w-full p-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Create Investment</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const investment = ref({
    id: '',
    amount: 0,
    investor_id: '',
    duration: 0,
    date: ''
});

const router = useRouter();

import { onMounted } from 'vue';

const investors = ref([]);

const fetchInvestors = async () => {
    try {
        const response = await $fetch('/api/entities');
        investors.value = response.data.filter(entity => entity.type === 'investor');
        console.log('Investors:', investors.value);
    } catch (error) {
        console.error('Error fetching investors:', error);
    }
};

onMounted(() => {
    fetchInvestors();
});

const submitForm = async () => {
    try {
        const response = await $fetch('/api/investments', {
            method: 'POST',
            body: investment.value
        });
        console.log('Investment created:', response);

    } catch (error) {
        console.error('Error creating investment:', error);
    }
};
</script>

<style scoped>
.create-investment {
    max-width: 600px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.create-investment h1 {
    text-align: center;
}

.create-investment form div {
    margin-bottom: 15px;
}

.create-investment form label {
    display: block;
    margin-bottom: 5px;
}

.create-investment form input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.create-investment form button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.create-investment form button:hover {
    background-color: #0056b3;
}
</style>
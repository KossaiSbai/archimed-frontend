<script setup lang="ts">
import { defineProps } from 'vue';

interface Investment {
    id: string;
    amount: number;
    investor_id: string;
    duration: number;
    date: string;
}

const props = defineProps<{
    investment: Investment;
}>();
</script>

<template>
    <div class="investment p-4 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 class="text-2xl font-bold text-gray-900">Investment Details</h2>
        <ul class="space-y-2">
            <li class="flex justify-between">
                <span class="font-semibold text-gray-700">ID:</span>
                <span class="text-gray-900">{{ investment.id }}</span>
            </li>
            <li class="flex justify-between">
                <span class="font-semibold text-gray-700">Amount:</span>
                <span class="text-gray-900">${{ investment.amount }}</span>
            </li>
            <li class="flex justify-between">
                <span class="font-semibold text-gray-700">Investor ID:</span>
                <span class="text-gray-900">{{ investment.investor_id }}</span>
            </li>
            <li class="flex justify-between">
                <span class="font-semibold text-gray-700">Duration:</span>
                <span class="text-gray-900">{{ investment.duration }} years</span>
            </li>
            <li class="flex justify-between">
                <span class="font-semibold text-gray-700">Date:</span>
                <span class="text-gray-900">{{ investment.date }}</span>
            </li>
        </ul>
    </div>
</template>

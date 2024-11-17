<template>
    <div class="entity border border-gray-300 p-6 rounded-lg my-4 shadow-lg transition-transform transform hover:scale-105">
        <h2 class="text-2xl font-bold text-indigo-600 mb-2">{{ entity.name }}</h2>
        <p class="text-gray-700"><strong>Type:</strong> {{ entity.type }}</p>
        <p class="text-gray-700"><strong>Address:</strong> {{ entity.address }}</p>
        <p class="text-gray-700"><strong>Bank Account Currency:</strong> {{ entity.bank_account_currency }}</p>
        <p class="text-gray-700"><strong>Bank Account Number:</strong> {{ entity.bank_account_number }}</p>
        <p class="text-gray-700"><strong>Bank Account Type:</strong> {{ entity.bank_account_type }}</p>
        <p class="text-gray-700"><strong>Contact Person:</strong> {{ entity.contact_person }}</p>
        <p class="text-gray-700"><strong>Contact Person Email:</strong> {{ entity.contact_person_email }}</p>
        <p class="text-gray-700"><strong>Contact Person Phone:</strong> {{ entity.contact_person_phone }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

type BankAccountType = 'iban' | 'swift';

type EntityType = 'company' | 'fund' | 'investor';

interface Entity {
    name: string;
    type: EntityType;
    address: string;
    bank_account_currency: string;
    bank_account_number: string;
    bank_account_type: BankAccountType;
    contact_person: string;
    contact_person_email: string;
    contact_person_phone: string;
}

const props = defineProps<{
    entity: Entity;
}>();
</script>

<style scoped>
.entity {
    background-color: #f9fafb;
    transition: transform 0.3s ease-in-out;
}

.entity h2 {
    margin-top: 0;
}

.entity p {
    margin: 0.5rem 0;
}
</style>

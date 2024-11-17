<script lang="ts" setup>
enum CapitalCallStatus {
  VALIDATED = 'validated',
  SENT = 'sent',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

interface CapitalCall {
  fund_entity_id: string;
  investor_entities: string[];
  status: CapitalCallStatus;
  date: string;
  purpose: string;
  currency: string;
  payment_method: string;
  bills: string[];
}

const props = defineProps<{
  capitalCall: CapitalCall;
}>();

const statusColors = {
  [CapitalCallStatus.VALIDATED]: 'bg-blue-100 text-blue-700',
  [CapitalCallStatus.SENT]: 'bg-yellow-100 text-yellow-700',
  [CapitalCallStatus.PAID]: 'bg-green-100 text-green-700',
  [CapitalCallStatus.OVERDUE]: 'bg-red-100 text-red-700',
};
</script>

<template>
  <div class="p-4 m-5 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg border border-gray-200">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <span class="material-icons text-blue-500">info</span> Capital Call Information
      </h2>
      <p class="text-gray-600">Detailed overview of the capital call.</p>
    </div>

    <!-- Fund Entity Section -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">General Information</h3>
      <div class="bg-white p-4 rounded-md shadow-sm">
        <div class="mb-4">
          <label class="block text-gray-600 font-medium">Fund Entity ID:</label>
          <p class="text-gray-900">{{ capitalCall.fund_entity_id }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-600 font-medium">Date:</label>
          <p class="text-gray-900">{{ capitalCall.date }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-600 font-medium">Purpose:</label>
          <p class="text-gray-900">{{ capitalCall.purpose }}</p>
        </div>
      </div>
    </div>

    <!-- Investor Entities -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Investor Entities</h3>
      <ul class="bg-white p-4 rounded-md shadow-sm list-disc list-inside">
        <li
          v-for="(entity, index) in capitalCall.investor_entities"
          :key="index"
          class="text-gray-900"
        >
          {{ entity }}
        </li>
      </ul>
    </div>

    <!-- Status Section -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Capital Call Status</h3>
      <div
        class="inline-block px-4 py-2 rounded-full text-sm font-medium"
        :class="statusColors[capitalCall.status]"
      >
        {{ capitalCall.status.toUpperCase() }}
      </div>
    </div>

    <!-- Financial Information -->
    <div class="grid grid-cols-2 gap-6 mb-6">
      <div class="bg-white p-4 rounded-md shadow-sm">
        <label class="block text-gray-600 font-medium">Currency:</label>
        <p class="text-gray-900">{{ capitalCall.currency }}</p>
      </div>
      <div class="bg-white p-4 rounded-md shadow-sm">
        <label class="block text-gray-600 font-medium">Payment Method:</label>
        <p class="text-gray-900">{{ capitalCall.payment_method }}</p>
      </div>
    </div>

    <!-- Bills Section -->
    <div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Bills</h3>
      <ul class="bg-white p-4 rounded-md shadow-sm list-disc list-inside">
        <li v-for="(bill, index) in capitalCall.bills" :key="index" class="text-gray-900">
          {{ bill }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>

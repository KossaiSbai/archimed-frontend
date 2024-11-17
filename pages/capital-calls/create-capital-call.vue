<template>
    <div class="max-w-4xl mx-auto p-10 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Create Capital Call</h1>
  
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label
            for="fundEntityId"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Fund Entity
          </label>
          <select
            v-model="form.fund_entity_id"
            id="fundEntityId"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          >
            <option
              v-for="fund in fundEntities"
              :key="fund._id.$oid"
              :value="fund._id.$oid"
            >
              {{ fund.contact_person }}
            </option>
          </select>
        </div>
  
        <div>
          <label
            for="investorEntities"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Investor Entities
          </label>
          <select
            v-model="form.investor_entities"
            id="investorEntities"
            multiple
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          >
            <option
              v-for="investor in investorEntities"
              :key="investor._id.$oid"
              :value="investor._id.$oid"
            >
              {{ investor.contact_person }}
            </option>
          </select>
          <p class="text-xs text-gray-500 mt-1">Hold Ctrl or Command to select multiple</p>
        </div>
  
        <div>
          <label
            for="purpose"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Purpose
          </label>
          <input
            type="text"
            v-model="form.purpose"
            id="purpose"
            required
            class="block w-full px-4 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <div>
          <label
            for="currency"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Currency
          </label>
          <input
            type="text"
            v-model="form.currency"
            id="currency"
            required
            class="block w-full px-4 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        <div class="text-right">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Capital Call
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  
  export default {
    setup() {
      const form = ref({
        fund_entity_id: '',
        investor_entities: [],
        purpose: '',
        currency: '',
      });
  
      const fundEntities = ref([]);
      const investorEntities = ref([]);
  
      const fetchEntities = async () => {
        try {
          const entities = await $fetch('/api/entities');
          console.log('Entities:', entities.data);   
          const groupedEntities = groupByType(entities.data);
  
          fundEntities.value = groupedEntities.funds;
          investorEntities.value = groupedEntities.investors;
        } catch (error) {
          console.error('Error fetching entities:', error);
        }
      };
  
      const groupByType = (entities) => {
        const funds = [];
        const investors = [];
  
        entities.forEach((entity) => {
          if (entity.type === 'fund') {
            funds.push(entity);
          } else if (entity.type === 'investor') {
            investors.push(entity);
          }
        });
  
        return { funds, investors };
      };
  
      const submitForm = async () => {
        try {
          const data = {
            ...form.value,
            status: 'validated',
            date: new Date().toISOString(),
            payment_method: '',
            bills: [],
          };

          console.log('Data:', data);
  
          const response = await $fetch('/api/capital_calls', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
  
          console.log('Capital call created:', response);
        } catch (err) {
          console.error('Error submitting form:', err);
        }
      };
  
      onMounted(() => {
        fetchEntities();
      });

      console.log(fundEntities)
      console.log(investorEntities)
  
      return {
        form,
        fundEntities,
        investorEntities,
        submitForm,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  
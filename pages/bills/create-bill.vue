<template>
  <div class="max-w-4xl mx-auto p-10 bg-white rounded-lg shadow-md">
    
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Create Bill</h1>

    
    <form @submit.prevent="submitForm" class="space-y-6">
      
      <div>
        <label
          for="capitalCallId"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Capital Call ID
        </label>
        <select
          v-model="form.capital_call_id"
          id="capitalCallId"
          required
          @change="onCapitalCallChange"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option
            v-for="call in capitalCalls"
            :key="call._id.$oid"
            :value="call._id.$oid"
          >
            {{ call._id.$oid }}
          </option>
        </select>
      </div>

      
      <div>
        <label
          for="investorEntityId"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Investor Entity
        </label>
        <select
          v-model="form.to_investor_id"
          id="investorEntityId"
          required
          @change="filterInvestments"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option
            v-for="investor in investorEntities"
            :key="investor._id.$oid"
            :value="investor._id.$oid"
          >
            {{ investor.contact_person }}
          </option>
        </select>
      </div>

      <div>
        <label
          for="investmentId"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Investment ID
        </label>
        <select
          v-model="form.investment_id"
          id="investmentId"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option
            v-for="investment in filteredInvestments"
            :key="investment._id.$oid"
            :value="investment._id.$oid"
          >
            {{ investment._id.$oid }}
          </option>
        </select>
      </div>

            <div>
        <label
          for="billType"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Bill Type
        </label>
        <select
          v-model="form.bill_type"
          id="billType"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="yearly fees">Yearly Fees</option>
          <option value="upfront fees">Upfront Fees</option>
          <option value="membership">Membership</option>
        </select>
      </div>

      <div>
        <label
          for="feesYear"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Fees Year
        </label>
        <input
          type="number"
          v-model="form.fees_year"
          id="feesYear"
          :disabled="form.bill_type === 'upfront fees' || form.bill_type === 'membership'"
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
        <select
          v-model="form.currency"
          id="currency"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div class="text-right">
        <button
          type="submit"
          class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Bill
        </button>
      </div>
    </form>

    <div v-if="message" :class="messageClass" class="mt-4 p-4 rounded-md">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const form = ref({
      capital_call_id: '',
      to_investor_id: '',
      investment_id: '',
      fees_year: 0,
      bill_type: 'membership',
    });

    const capitalCalls = ref([]);
    const investorEntities = ref([]);
    const investments = ref([]);
    const filteredInvestments = ref([]);
    const message = ref('');
    const messageClass = ref('');

    const fetchCapitalCalls = async () => {
      try {
        const response = await $fetch('/api/capital_calls');
        capitalCalls.value = response.data;
      } catch (error) {
        console.error('Error fetching capital calls:', error);
      }
    };

    const fetchAllInvestments = async () => {
      try {
        const response = await $fetch('/api/investments');
        console.log('Investments:', response.data);
        investments.value = response.data;
      } catch (error) {
        console.error('Error fetching investments:', error);
      }
    };

    const fetchInvestorEntities = async () => {
      const selectedCall = capitalCalls.value.find(
        (call) => call._id.$oid === form.value.capital_call_id
      );

      if (!selectedCall || !selectedCall.investor_entities) {
        investorEntities.value = [];
        return;
      }

      try {
        const promises = selectedCall.investor_entities.map((id) =>
          $fetch(`/api/entities/${id}`)
        );
        const result = await Promise.all(promises);
        investorEntities.value = result.map((response) => response.data);
      } catch (error) {
        console.error('Error fetching investor entities:', error);
      }
    };

    const filterInvestments = () => {
      console.log('Filtering investments...');
      console.log('Investments:', investments.value);
      filteredInvestments.value = investments.value.filter(
        (investment) => investment.investor_id === form.value.to_investor_id
      )
      console.log('Filtered investments:', filteredInvestments.value);
    };

    const onCapitalCallChange = async () => {
      await fetchInvestorEntities();
      filterInvestments();
    };

    const submitForm = async () => {
      try {
        const data = {
            type: form.value.bill_type,
            ...form.value,
        };

        const response = await $fetch('/api/bills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.statusCode === 201) {
          message.value = 'Bill created successfully!';
          messageClass.value = 'bg-green-100 text-green-800';
        } else {
          message.value = 'Failed to create bill.';
          messageClass.value = 'bg-red-100 text-red-800';
        }

        console.log('Bill created:', response);
      } catch (err) {
        message.value = 'Error submitting form.';
        messageClass.value = 'bg-red-100 text-red-800';
        console.error('Error submitting form:', err);
      }
    };

    onMounted(async () => {
      await fetchCapitalCalls();
      await fetchAllInvestments();
    });

    return {
      form,
      capitalCalls,
      investorEntities,
      investments,
      filteredInvestments,
      submitForm,
      onCapitalCallChange,
      filterInvestments,
      message,
      messageClass,
    };
  },
};
</script>

<style scoped>
/* Additional styling if needed */
</style>

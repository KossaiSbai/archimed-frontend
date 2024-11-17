<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">Bills Dashboard</h1>

        <div class="mb-4">
            <label for="groupBy" class="block text-sm font-medium text-gray-700">Group By:</label>
            <select
                v-model="groupBy"
                @change="groupBills"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                <option value="none">None</option>
                <option value="amount">Amount</option>
                <option value="date">Date</option>
                <option value="due_date">Due Date</option>
                <option value="capitalCall">Capital Call</option>
                <option value="investor">Investor</option>
                <option value="type">Type</option>
                <option value="status">Status</option>
            </select>
        </div>

        <div class="mb-4">
            <label for="sortBy" class="block text-sm font-medium text-gray-700">Sort By:</label>
            <select
                v-model="sortBy"
                @change="sortBills"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                <option value="amount">Amount</option>
                <option value="date">Date</option>
                <option value="capitalCall">Capital Call</option>
                <option value="investor">Investor</option>
                <option value="type">Type</option>
                <option value="status">Status</option>
            </select>
        </div>

        <div v-for="group in displayedBills" :key="group.group" class="mb-6">
            <h2 v-if="group.group" class="text-xl font-bold mb-4">Group: {{ group.group }}</h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="bill in group.bills"
                    :key="bill.id"
                    class="bill bg-white shadow overflow-hidden sm:rounded-lg p-4"
                >
                    <a class="text-lg text-blue-500 hover:underline" :href="`/bills/${bill._id.$oid}`">ID: {{ bill._id.$oid }}</a>
                    <p class="text-sm text-gray-500">Amount: {{ bill.amount.toFixed(2) }}</p>
                    <p class="text-sm text-gray-500">Date: {{ bill.date }}</p>
                    <p class="text-sm text-gray-500">Due Date: {{ bill.due_date }}</p>
                    <p class="text-sm text-gray-500">Capital Call: {{ bill.capitalCall?.purpose }}</p>
                    <p class="text-sm text-gray-500">Investor: {{ bill.investor?.contact_person }}</p>
                    <p class="text-sm text-gray-500">Type: {{ bill.type }}</p>
                    <p class="text-sm text-gray-500">Status: {{ bill.status }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const bills = ref([])
const groupBy = ref('none')
const sortBy = ref('amount')

async function retrieveBills() {
    const response = await $fetch('/api/bills')
    if (response.data) {
        const billsData = response.data

        const entitiesResponse = await $fetch('/api/entities')
        const capitalCallsResponse = await $fetch('/api/capital_calls')

        const entities = entitiesResponse.data
        const capitalCalls = capitalCallsResponse.data

        bills.value = billsData.map(bill => {
            return {
                ...bill,
                investor: entities.find(inv => inv._id.$oid === bill.to_investor_id),
                capitalCall: capitalCalls.find(cc => cc._id.$oid === bill.capital_call_id),
            }
        })
    }
}

onMounted(async () => {
    retrieveBills()
})

// Sorting logic
const sortBills = (billsToSort) => {
    return billsToSort.sort((a, b) => {
        if (sortBy.value === 'amount') {
            return a.amount - b.amount
        } else if (sortBy.value === 'date') {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        }
        else if (sortBy.value === 'due_date') {
            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
        } else if (sortBy.value === 'capitalCall') {
            return a.capitalCall?.purpose.localeCompare(b.capitalCall?.purpose || '')
        } else if (sortBy.value === 'investor') {
            return a.investor?.contact_person.localeCompare(b.investor?.contact_person || '')
        } else if (sortBy.value === 'type') {
            return a.type.localeCompare(b.type)
        } else if (sortBy.value === 'status') {
            return a.status.localeCompare(b.status)
        }
        return 0
    })
}

// Grouping logic
const groupBills = (billsToGroup) => {
    if (groupBy.value === 'none') {
        return [{ group: null, bills: billsToGroup }]
    }
    const grouped = billsToGroup.reduce((acc, bill) => {
        const key =
            groupBy.value === 'capitalCall'
                ? bill.capitalCall?.purpose
                : groupBy.value === 'investor'
                ? bill.investor?.contact_person
                : groupBy.value === 'amount'
                ? Math.floor(bill.amount / 100) * 100 // Group amounts into ranges
                : groupBy.value === 'type'
                ? bill.type
                : groupBy.value === 'status'
                ? bill.status
                : groupBy.value === 'due_date'
                ? bill.due_date
                : bill.date
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(bill)
        return acc
    }, {})

    return Object.entries(grouped).map(([group, bills]) => ({
        group,
        bills,
    }))
}

const displayedBills = computed(() => {
    const sortedBills = sortBills([...bills.value])
    return groupBills(sortedBills)
})
</script>

<style scoped>
.bill {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
}
</style>
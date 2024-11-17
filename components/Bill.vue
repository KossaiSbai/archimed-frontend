<script lang="ts" setup>
import { ref } from 'vue';
import getSymbolFromCurrency from 'currency-symbol-map';

interface BillType {
    yearly_fees: 'yearly_fees';
    upfront_fees: 'upfront_fees';
    membership: 'membership';
}

interface Bill {
    capital_call_id: string;
    to_investor_id: string;
    amount: number;
    type: keyof BillType;
    status: BillStatus;
    date: string;
    due_date: string;
    investment_id?: string;
    fees_year?: number;
    currency: string;
}

enum BillStatus {
    CREATED = 'created',
    PAID = 'paid',
    PENDING = 'pending',
    OVERDUE = 'overdue',
    CANCELLED = 'cancelled'
}

const props = defineProps<{
    bill: Bill;
}>();

const selectedStatus = ref<BillStatus>(props.bill.status);

function formatCurrency(amount: number, currency: string): string {
    return `${currency}${amount.toFixed(2)}`;
}

async function updateStatus(newStatus: BillStatus) {
    try {
        const response = await $fetch(`/api/bills/${props.bill._id.$oid}`, {
            method: 'PUT',
            body: JSON.stringify({
                status: newStatus
            }),
        });

        if (response.statusCode === 200) {
            console.log("Status updated successfully");
            props.bill.status = newStatus; // Update the actual bill status
        } else {
            console.error("Failed to update status:", response.message);
        }
    } catch (error) {
        console.error("Error updating status:", error);
    }
}

async function deleteBill() {
    try {
        const response = await $fetch(`/api/bills/${props.bill._id.$oid}`, {
            method: 'DELETE',
        });

        if (response.statusCode === 200) {
            console.log("Bill deleted successfully");
        } else {
            console.error("Failed to delete bill:", response.message);
        }
    } catch (error) {
        console.error("Error deleting bill:", error);
    }
}
</script>

<template>
    <UCard class="bill-container">
        <div>
            <!-- Header Section -->
            <div class="header mb-6">
                <h2 class="text-2xl font-bold">Bill Details</h2>
                <p class="text-lg text-gray-600">Bill for capital call {{ bill.capital_call_id }}</p>
            </div>

            <!-- Status Section -->
            <div class="h-32 flex items-center justify-center">
                <span
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="{
                        'bg-green-100 text-green-700': bill.status === 'PAID',
                        'bg-yellow-100 text-yellow-700': bill.status === 'PENDING',
                        'bg-red-100 text-red-700': bill.status !== 'PAID' && bill.status !== 'PENDING',
                    }"
                >
                    {{ bill.status }}
                </span>
            </div>

            <!-- Payment Information Section -->
            <div class="grid grid-cols-2 gap-4 my-6">
                <div>
                    <h3 class="text-lg font-semibold">Payment Amount</h3>
                    <p class="text-gray-700">{{ formatCurrency(bill.amount, getSymbolFromCurrency(bill.currency)) }}</p>
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Payment Date</h3>
                    <p class="text-gray-700">{{ bill.date }}</p>
                </div>
            </div>

            <!-- Additional Information Section -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <h3 class="text-lg font-semibold">Investor ID</h3>
                    <p class="text-gray-700">{{ bill.to_investor_id }}</p>
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Due Date</h3>
                    <p class="text-gray-700">{{ bill.due_date }}</p>
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Bill Type</h3>
                    <p class="text-gray-700">{{ bill.type }}</p>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-4 mt-6">
                <select v-model="selectedStatus" class="border rounded px-4 py-2">
                    <option v-for="status in Object.values(BillStatus)" :key="status" :value="status">
                        {{ status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() }}
                    </option>
                </select>
                <button
                    @click="updateStatus(selectedStatus)"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update Status
                </button>
                <button
                    @click="deleteBill"
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete Bill
                </button>
            </div>
        </div>
    </UCard>
</template>

<style scoped>
.bill-container {
    max-width: 600px;
    margin: 10px auto;
}
.status {
    margin-bottom: 1rem;
}
</style>

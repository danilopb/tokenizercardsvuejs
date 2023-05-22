<template>
    <div class="bg-blue-300 rounded p-5 text-xl inline-block w-auto px-10">
        <div class="mb-6">
            <div class="flex align-middle">
                <p class="mr-3">{{ formatCard }}</p>
                <button class="bg-transparent text-gray-500 hover:text-gray-800" @click="toggleShowCard">
                    <EyeSlashIcon v-if="showCard" class="h-6 w-6" />
                    <EyeIcon v-else class="h-6 w-6" />
                </button>
            </div>
        </div>
        <div class="mb-6">
            <div class="flex">
                <p class="mr-3">CVV: {{ card?.cvv.getValue() }}</p>
                <p class="mr-3">{{ card?.expirationMonth.getValue() }} / {{ card?.expirationYear.getValue() }}</p>
            </div>
        </div>
        <div class="mb-6">
            <p>{{ card?.email.getValue() }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { EyeIcon } from "@heroicons/vue/24/solid";
import { EyeSlashIcon } from "@heroicons/vue/24/solid";
import { defineProps, ref, computed } from "vue";
import CardContract from "@/Tokenizer/card/domain/Contracts/CardContract";

const props = defineProps({
    card: {
        type: Object as () => CardContract,
        required: true
    }
});
const showCard = ref<boolean>(false);
const toggleShowCard = () => {
    showCard.value = !showCard.value;
};
const formatCard = computed(() => {
    const number = showCard.value ? props.card?.number.getValue() : props.card?.hiddenNumber.getValue();
    const regex = /(.{4})/g;
    return number.toString().replace(regex, "$1 ");
});
</script>

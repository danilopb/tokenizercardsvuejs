<template>
    <div v-if="alertMessage.message" class="text-white rounded p-4" :class="getBackground">
        {{ alertMessage.message }}
    </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from "vue";
import { AlertMessageContract } from "@/Tokenizer/Share/Domain/Contracts/AlertMessageContract";

const props = defineProps({
    alertMessage: {
        type: Object as () => AlertMessageContract,
        required: true
    }
});

const getBackground = computed(() => {
    return props.alertMessage.type === "success" ? "bg-green-500" : "bg-red-500";
});
</script>

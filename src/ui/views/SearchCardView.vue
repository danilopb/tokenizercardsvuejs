<template>
    <div class="container mx-auto py-16">
        <div class="flex flex-col items-center">
            <h1 class="mb-5 text-2xl font-bold">Búsqueda de tarjetas:</h1>
            <FormSearchCard />
        </div>
    </div>
</template>

<script setup lang="ts">
import FormSearchCard from "@/ui/components/form/FormSearchCard.vue";
</script>

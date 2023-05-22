<template>
    <div class="max-w-md w-full p-6 bg-white rounded shadow">
        <form @submit.prevent="searchCard" class="mb-3">
            <div class="mb-6">
                <input
                    v-model="token"
                    type="text"
                    class="mt-1 w-full shadow-md rounded-md p-3"
                    placeholder="Ingresa el token de la tarjeta"
                    required
                />
                <p v-if="errorsMessages?.card_number" class="text-red-600 mt-2 text-xs">
                    {{ errorsMessages.token }}
                </p>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Enviar
            </button>
        </form>
        <AlertMessage class="mb-3" :alert-message="alertMessage" />
    </div>
    <div v-if="cardEntity" class="max-w-md w-full p-6 bg-white rounded shadow mt-4 flex justify-center">
        <CardDetails :card="cardEntity" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { CardRepository } from "@/Tokenizer/card/infrastructure/CardRepository";
import CardFindByTokenUseCase from "@/Tokenizer/card/application/CardFindByTokenUseCase";
import { AlertMessageContract } from "@/Tokenizer/Share/Domain/Contracts/AlertMessageContract";
import AlertMessage from "../alert/AlertMessage.vue";
import CardEntity from "@/Tokenizer/card/domain/CardEntity";
import CardContract from "@/Tokenizer/card/domain/Contracts/CardContract";
import CardDetails from "../card/CardDetails.vue";

const token = ref<string>("");
const errorsMessages = ref<any>(null);
const initialAlertMessageInit = {
    message: "",
    type: ""
};
const cardEntity = ref<CardContract>();
const alertMessage: AlertMessageContract = reactive(initialAlertMessageInit);
const findByToken = new CardFindByTokenUseCase(new CardRepository());
const searchCard = async () => {
    errorsMessages.value = null;
    Object.assign(alertMessage, initialAlertMessageInit);
    cardEntity.value = undefined;
    findByToken
        .execute(token.value)
        .then((card: CardEntity) => {
            cardEntity.value = card;
            alertMessage.message = "Se encontró su tarjeta.";
            alertMessage.type = "success";
        })
        .catch((error) => {
            if (error.response?.status === 416) {
                errorsMessages.value = error.response?.data?.errors;
                return;
            }

            alertMessage.type = "danger";

            if (error.response?.status === 404) {
                alertMessage.message = error.response?.data?.message;
                return;
            }

            alertMessage.message = error.response?.data?.error;
        });
};
</script>

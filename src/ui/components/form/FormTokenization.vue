<template>
    <div class="max-w-md w-full p-6 bg-white rounded shadow">
        <form @submit.prevent="tokenization" class="mb-3">
            <div class="mb-6">
                <input
                    v-model="cardNumber"
                    type="number"
                    class="mt-1 w-full shadow-md rounded-md p-3"
                    placeholder="Número de tarjeta"
                />
                <p v-if="errorsMessages?.card_number" class="text-red-600 mt-2 text-xs">
                    {{ errorsMessages.card_number }}
                </p>
            </div>
            <div class="mb-6">
                <div class="flex -mx-2">
                    <div class="w-1/2 px-2">
                        <input
                            v-model="cvv"
                            type="number"
                            placeholder="CVV"
                            class="mt-1 block w-full shadow-md rounded-md p-3"
                        />
                    </div>
                    <div class="w-1/2 px-2">
                        <div class="flex">
                            <div class="w-1/2 pr-1">
                                <input
                                    v-model="expirationMonth"
                                    type="number"
                                    placeholder="MM"
                                    class="mt-1 w-full shadow-md rounded-md p-3"
                                />
                            </div>
                            <div class="w-1/2 pl-1">
                                <input
                                    v-model="expirationYear"
                                    type="number"
                                    placeholder="AA"
                                    class="mt-1 w-full shadow-md rounded-md p-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <p v-if="errorsMessages?.cvv" class="text-red-600 mt-2 text-xs">{{ errorsMessages.cvv }}</p>
                <p v-if="errorsMessages?.expiration_month" class="text-red-600 mt-2 text-xs">
                    {{ errorsMessages.expiration_month }}
                </p>
                <p v-if="errorsMessages?.expiration_year" class="text-red-600 mt-2 text-xs">
                    {{ errorsMessages.expiration_year }}
                </p>
            </div>
            <div class="mb-6">
                <input
                    v-model="email"
                    type="email"
                    class="mt-1 block w-full shadow-md rounded-md p-3"
                    placeholder="Email"
                />
                <p v-if="errorsMessages?.email" class="text-red-600 mt-2 text-xs">
                    {{ errorsMessages.email }}
                </p>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Enviar
            </button>
        </form>
        <AlertMessage class="mb-3" :alert-message="alertMessage" />
        <div v-if="cardEntity" class="bg-blue-300 rounded p-4">
            <h3 class="text-lg mb-2">Estos son los datos para acceder a su tarjeta:</h3>
            <p><span class="font-bold">Token:</span> {{ cardEntity?.token.getValue() }}</p>
            <p><span class="font-bold">Expiración:</span> {{ cardEntity?.expirationToken.getDisplayValue() }}</p>
            <p>* Luego de que su token expire no podrá tener acceso a la tarjeta.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { TokenizationUseCase } from "@/Tokenizer/card/application/TokenizationUseCase";
import { CardRepository } from "@/Tokenizer/card/infrastructure/CardRepository";
import { AlertMessageContract } from "@/Tokenizer/Share/Domain/Contracts/AlertMessageContract";
import AlertMessage from "../alert/AlertMessage.vue";
import CardContract from "@/Tokenizer/card/domain/Contracts/CardContract";
import CardEntity from "@/Tokenizer/card/domain/CardEntity";
const cardEntity = ref<CardContract>();
const cardNumber = ref<string>("");
const cvv = ref<string>("");
const expirationMonth = ref<string>("");
const expirationYear = ref<string>("");
const email = ref<string>("");
const tokenizationUseCase = new TokenizationUseCase(new CardRepository());
const errorsMessages = ref<any>(null);
const alertMessage: AlertMessageContract = reactive({
    message: "",
    type: ""
});
const tokenization = async () => {
    errorsMessages.value = null;
    tokenizationUseCase
        .execute(cardNumber.value, cvv.value, expirationMonth.value, expirationYear.value, email.value)
        .then((card: CardEntity) => {
            console.log("card:", card);
            cardEntity.value = card;
            alertMessage.message = "Su token fue creado de forma exitosa";
            alertMessage.type = "success";
        })
        .catch((error) => {
            if (error.response?.status === 416) {
                errorsMessages.value = error.response?.data?.errors;
                return;
            }
            alertMessage.message = error.response?.data?.error;
            alertMessage.type = "danger";
        });
};
</script>

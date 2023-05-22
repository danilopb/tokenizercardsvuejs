<template>
    <div>
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" :src="LogoCulqui" alt="Your Company" />
                <h2 class="mt-10 text-center text-2xl font-bold text-gray-900">Sign in</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form @submit.prevent="login" class="space-y-6">
                    <div>
                        <label for="text" class="text-sm font-medium text-gray-900">Usuario:</label>
                        <div class="mt-2">
                            <input
                                v-model="username"
                                name="username"
                                type="text"
                                autocomplete="text"
                                class="w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-gray-300"
                            />
                        </div>
                        <p v-if="errorsMessages?.username" class="text-red-600">{{ errorsMessages.username }}</p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="text-sm font-medium text-gray-900">Contraseña</label>
                        </div>
                        <div class="mt-2">
                            <input
                                v-model="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                class="w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-gray-300"
                            />
                        </div>
                        <p v-if="errorsMessages?.password" class="text-red-600">{{ errorsMessages.password }}</p>
                    </div>
                    <AlertMessage class="mb-3" :alert-message="alertMessage" />
                    <div>
                        <button
                            type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import LogoCulqui from "@/ui/assets/images/LogoCulqui.png";
import AlertMessage from "../alert/AlertMessage.vue";
import { LoginUseCase } from "@/Tokenizer/auth/application/auth/LoginUseCase";
import { AuthRepository } from "@/Tokenizer/auth/infrastructure/api/AuthRepository";
import { AuthApiToken } from "@/Tokenizer/auth/Domain/ValueObjects/AuthApiToken";
import router from "@/router";
import { AlertMessageContract } from "@/Tokenizer/Share/Domain/Contracts/AlertMessageContract";

const username = ref<string>("");
const password = ref<string>("");
const errorsMessages = ref<any>({});
const initialAlertMessageInit = {
    message: "",
    type: ""
};
const alertMessage: AlertMessageContract = reactive(initialAlertMessageInit);
const loginUseCase = new LoginUseCase(new AuthRepository());

const login = async () => {
    errorsMessages.value = null;
    Object.assign(alertMessage, initialAlertMessageInit);
    loginUseCase
        .execute(username.value, password.value)
        .then((authApi: AuthApiToken) => {
            localStorage.setItem("api_token", authApi.value);
            router.push({ name: "tonization_card" });
        })
        .catch((error) => {
            if (error.response?.status === 416) {
                errorsMessages.value = error.response?.data?.errors;
                return;
            }
            alertMessage.type = "danger";
            alertMessage.message = error.response?.data?.error;
        });
};
</script>

<template>
    <main id="login" class="page centered-content">
        <FormPanel @submit.prevent="auth.handleLogin()">
            <template v-slot:logo>Login</template>
            <template v-slot:form>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="loginEmail" />

                <label for="password">Password</label>
                <input type="password" id="password" v-model="loginPassword" />
                <div class="btn-wrap">
                    <button class="btn" type="submit">Login</button>
                </div>
            </template>
        </FormPanel>
    </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth'
import FormPanel from '@/components/FormPanel.vue';

const auth = useAuthStore();
const { loginEmail, loginPassword } = storeToRefs(auth);
</script>


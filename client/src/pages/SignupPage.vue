<template>
    <main id="signup" class="page centered-content">
        <FormPanel @submit.prevent="auth.handleSignup">
            <template v-slot:logo>Register</template>
            <template v-slot:form>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="signupEmail" />

                <label for="password">Password</label>
                <input type="password" id="password" v-model="signupPassword" />

                <label for="password">Confirm Password</label>
                <input type="password" id="confirm-password" v-model="signupConfirmPassword" />

                <div class="btn-wrap">
                    <button class="btn" type="submit">Submit</button>
                </div>
            </template>
        </FormPanel>
    </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import FormPanel from '@/components/FormPanel.vue';

const auth = useAuthStore();
const { signupEmail, signupPassword, signupConfirmPassword, } = storeToRefs(auth);
</script>


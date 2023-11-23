<template>
    <div id="login" class="centered-content">
        <div class="form-panel flex-col-1">
            <h1>Login</h1>
            <form @submit.prevent="login" class="flex-col-1">
                <div class="flex-col-03">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="username" required>
                </div>
                <div class="flex-col-03">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

const username = ref('');
const password = ref('');



// const authStore = useAuthStore();
// const {
//     isGoogleEnabled,
//     isSingedIn,
//     userProfile,
// } = storeToRefs(authStore);
// const loginButton = ref(null);
// onMounted(() => {
// TOdo allow for google or email login
// if (!isGoogleEnabled.value || isSingedIn.value) return
// try {
//     window.google.accounts.id.initialize({
//         ux_mode: "popup",
//         client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
//         callback: async (res) => {
//             if (res.credential) {
//                 authStore.signIn(res);
//             }
//         },
//     });
//     window.google.accounts.id.renderButton(loginButton.value, {
//         theme: "filled_blue",
//         size: "medium",
//         type: "standard",
//     });
// } catch (error) {
//     console.log(error);
// }
// })
</script>

<style scoped>
@import '@/assets/styles/pages/LoginPage.css';
</style>
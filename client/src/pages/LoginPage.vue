<script setup>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore();
const { googleEnabled, isSingedIn } = storeToRefs(authStore);

const loginButton = ref(null);


onMounted(() => {
    if (!googleEnabled.value) return

    // Todo move to auth store
    try {
        window.google.accounts.id.initialize({
            ux_mode: "popup",
            client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
            callback: async (res) => {
                if (res.credential) {
                    authStore.signIn(res);
                }
            },
        });
        window.google.accounts.id.renderButton(loginButton.value, {
            theme: "filled_blue",
            size: "medium",
            type: "standard",
        });
    } catch (error) {
        console.log(error);
    }

    if (!isSingedIn.value) {
        window.google.accounts.id.renderButton(loginButton.value, {
            theme: "filled_blue",
            size: "medium",
            type: "standard",
        });
    }
})
</script>

<template>
    <h1>Budget Tracker</h1>
    <div class="login-panel">
        <h2>Sign In</h2>
        <div v-if="isSingedIn" @click="authStore.signOut" class="logout-button btn">Sign Out</div>
        <div v-else id="login-button" ref="loginButton"></div>
    </div>
</template>
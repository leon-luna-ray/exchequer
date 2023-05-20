<script setup>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore();
const { googleEnabled } = storeToRefs(authStore);

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
                    // Todo move to store?
                    authStore.login(res);
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
})
</script>

<template>
    <h1>Budget Tracker</h1>
    <div class="login-panel">
        <h2>Sign In</h2>
        <div id="login-button" ref="loginButton"></div>
    </div>
</template>
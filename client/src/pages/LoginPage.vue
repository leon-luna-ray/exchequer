<script setup>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore();
const {
    isGoogleEnabled,
    isSingedIn,
    userProfile,
} = storeToRefs(authStore);

const loginButton = ref(null);


onMounted(() => {
    if (!isGoogleEnabled.value || isSingedIn.value) return

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


})
</script>

<template>
    <div class="login-page flex flex-col items-center justify-center">
        <h1>Budget Tracker</h1>
        <div v-if="isSingedIn" class="login-panel">
            <h2>Hello!</h2>
            <div @click="authStore.signOut" class="logout-button btn">Sign Out</div>
        </div>
        <div v-else class="login-panel">
            <h2>Sign In</h2>
            <div id="login-button" ref="loginButton"></div>
        </div>
    </div>
</template>
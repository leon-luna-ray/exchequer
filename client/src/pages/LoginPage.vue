<script setup>
import { onMounted, ref } from 'vue';

const loginButton = ref(null);

onMounted(() => {
    if (
        typeof window === "undefined" ||
        !window.google ||
        !loginButton.value
    ) {
        return;
    }

    try {
        window.google.accounts.id.initialize({
            ux_mode: "popup",
            client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
            callback: async (res) => {
                if (res.credential) {
                    login(res);
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
    <div class="login-panel">
        <h1>Login</h1>
        <div id="login-button" ref="loginButton"></div>
    </div>
</template>
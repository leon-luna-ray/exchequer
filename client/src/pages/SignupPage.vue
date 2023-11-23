<template>
    <main id="signup" class="page centered-content">
        <FormPanel :handle-submit="handleSignup">
            <template v-slot:logo>Sign Up</template>
            <template v-slot:form>
                <label for="username">Email</label>
                <input type="text" id="email" v-model="username" />

                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" />

                <label for="password">Confirm Password</label>
                <input type="password" id="confirm-password" v-model="confirmPassword" />

                <div class="btn-wrap">
                    <button class="btn" type="submit">Submit</button>
                </div>
            </template>
        </FormPanel>
    </main>
</template>

<script setup>
import FormPanel from '@/components/FormPanel.vue';
</script>


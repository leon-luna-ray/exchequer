<template>
    <section class="form-panel">
        <h1 class="logo">Your Logo</h1>
        <h1>
            <slot name="logo"></slot>
        </h1>
        <form @submit.prevent="console.log('SUBMIT!')">
            <slot name="form"></slot>
        </form>
    </section>
</template>

<style scoped>
@import '@/assets/styles/components/FormPanel.css';
</style>
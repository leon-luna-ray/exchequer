<template>
    <section class="form-panel flex-col-1">
        <h1>
            <slot name="logo"></slot>
        </h1>
        <form>
            <slot name="form"></slot>
        </form>
    </section>
</template>

<style scoped>
@import '@/assets/styles/components/FormPanel.css';
</style>

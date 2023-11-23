<template>
  <header>
    <div class="container">

      <router-link to="/">
        <h1>Exchequer</h1>
      </router-link>
      <nav>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Singup</router-link>
      </nav>
    </div>
  </header>
</template>
<style scoped>
@import '@/assets/styles/components/Header.css';
</style>
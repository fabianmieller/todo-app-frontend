<template>
  <header id="header">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/" v-if="!auth">
          <b-img src="/static/logo.png" fluid alt="Logo" />
        </router-link>
        <router-link class="navbar-brand" to="/dashboard" v-if="auth">
          <b-img src="/static/logo.png" fluid alt="Logo" />
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="auth">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item user" v-if="auth">
              <span v-if="user">User: {{user.email}}</span>
            </li>
            <li class="nav-item" v-if="auth">
              <button @click="onLogout" class="btn logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated;
      },
      user() {
        return !this.$store.getters.user ? false : this.$store.getters.user;
      },
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout');
      },
    },
  };
</script>

<style scoped>
  .nav-item.user {
    padding: 8px 10px 0;
    color: white;
  }
</style>
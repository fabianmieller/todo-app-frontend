<template>
  <div id="app">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>

  import Header from './components/header/header';

  export default {
    name: 'app',
    components: {
      'app-header': Header,
    },
    created() {
      this.$store.dispatch('tryAutoLogin');
      // console.log(this.$store.state.apiToken);
    },
  };
</script>

<style lang="scss">
  @import "./assets/main.scss";
  body {
    padding-top: 5rem;
  }
</style>
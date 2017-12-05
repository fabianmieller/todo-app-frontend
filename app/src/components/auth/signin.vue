<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <b-form-group id="email-group">
          <label for="email-input">Email address:</label>
          <b-form-input id="email-input"
                        type="email"
                        v-model="email"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="password-group">
          <label for="password-input">Password:</label>
          <b-form-input id="password-input"
                        type="password"
                        v-model="password"
                        required
                        placeholder="Enter password">
          </b-form-input>
        </b-form-group>
        <div class="submit">
          <b-button type="submit" size="md" variant="primary">Submit</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      onSubmit() {
        const formData = {
          email: this.email,
          password: this.password,
        };
        console.log(formData);
        this.$store.dispatch('login', formData);
      },
    },
  };
</script>

<style scoped>

</style>
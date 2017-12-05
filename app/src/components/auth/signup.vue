<template>
  <div id="signup">
    <div class="signup-form">
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
        <b-form-group id="name-group">
          <label for="name-input">Name:</label>
          <b-form-input id="name-input"
                        type="text"
                        v-model="name"
                        required
                        placeholder="Enter Name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="password-group">
          <label for="password-input">Password:</label>
          <b-form-input id="password-input"
                        type="password"
                        v-model="password"
                        required
                        placeholder="Enter Password">
          </b-form-input>
        </b-form-group>
        <b-form-group id="confirmpassword-group">
          <label for="confirmpassword-input">Confirm Password:</label>
          <b-form-input id="confirmpassword-input"
                        type="password"
                        v-model="confirmpassword"
                        required
                        placeholder="Confirm Password">
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
        name: '',
        password: '',
        confirmpassword: '',
        res: {},
      };
    },
    methods: {
      onSubmit() {
        const formData = {
          email: this.email,
          name: this.name,
          password: this.password,
          password_confirmation: this.confirmpassword,
        };
        console.log(formData);
        this.$store.dispatch('signup', formData);
      },
    },
  };
</script>

<style scoped>

</style>
<template>
  <div class="container" id="welcome">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Sign In" active>
              <sign-in></sign-in>
            </b-tab>
            <b-tab title="Sign Up">
              <sign-up></sign-up>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  import Signin from '../auth/signin';
  import Signup from '../auth/signup';

  export default {
    components: {
      'sign-in': Signin,
      'sign-up': Signup,
    },
  };
</script>

<style scoped>

</style>
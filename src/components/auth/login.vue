<template>
  <div id="login">
    <div class="login-form">
      <div v-if="authFailure" class="dialog alert alert-danger" role="alert">
        Oops! Something went wrong...
      </div>
      <form class="needs-validation" novalidate @submit.prevent="onSubmit">
        <div class="input">
          <label for="username">Username</label>
          <input
            class="form-control"
            required="required"
            type="text"
            id="username"
            v-model="username"
          />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
            class="form-control"
            required="required"
            type="password"
            id="password"
            v-model="password"
          />
        </div>
        <div class="submit">
          <button type="submit" class="btn btn-primary btn-submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    authFailure() {
      return this.$store.getters.authStatus
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        username: this.username,
        password: this.password,
      }
      this.$store.dispatch('login', {username: formData.username, password: formData.password})
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.btn-submit {
  margin: 10px auto;
}

.input {
  margin: 10px auto;
}
</style>

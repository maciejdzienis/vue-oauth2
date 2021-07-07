<template>
  <div id="content">
    <div class="jumbotron">
      <h1 class="display-4">Hello, {{user}}!</h1>
      <p class="lead">I'm glad you are here!</p>
      <hr class="my-4" />
      <p>Want to see more cool stuff? Click the button below.</p>
      <p class="lead">
        <button
          @click.prevent="isClicked = !isClicked"
          class="btn btn-primary btn-lg"
          href="#"
          role="button"
        >
          {{ isClicked ? 'Just Kidding!' : 'See more' }}
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
      data () {
    return {
      isClicked: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo
    }
  }
}
</script>

<style scoped>
#content {
  width: 80%;
  padding-top: 10%;
  margin: auto;
}

h1 {
  text-align: center;
}

p {
  text-align: center;
}
</style>

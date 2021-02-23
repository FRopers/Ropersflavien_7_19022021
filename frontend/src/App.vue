<template>
  <img alt="logo groupomania" class="logo" src="./assets/logo.svg">
  <Comments />
</template>

<script>
import Comments from "./views/Comments"
export default {
  name: 'App',
  components: {
    Comments
  }
}
</script>

<style lang="scss">
#app {
  text-align: center;
}
.logo{
  height: 50px;
}
</style>

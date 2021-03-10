<template>
 <div class="app-body">
   <router-view />
 </div> 
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
@import "./styles/utils/variables";
@import "./styles/utils/mixin";
@import "./styles/base/base";

.app-body {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>

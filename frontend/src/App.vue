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

//class masquant les labels non désiré (accessibilité)
.hidden {
  height: 1px;
  width: 1px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: -10000px;
}

</style>

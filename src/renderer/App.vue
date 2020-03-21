<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'currency-monitor',
    mounted () {
      if (process.env.NODE_ENV === 'development') {
        window.$vue = this
      }
    }
  }
</script>

<style>
  /* CSS */
  #app {
    background-color: #f3f3f3;
  }

  body {
    background-color: #f3f3f3;
  }
</style>

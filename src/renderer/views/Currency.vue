<template>
  <div>
    {{ currency }}
  </div>
</template>

<script>
export default {
  name: 'Currency',
  data () {
    return {}
  },
  asyncComputed: {
    async currency () {
      let result = await this.$store.dispatch('getCurrency', this.$route.params.id)

      return result
    }
  },
  watch: {
    currency (newVal) {
      try {
        this.$route.meta.title = `${newVal.code} | ${newVal.currency}`
        this.$parent.$forceUpdate()
      } catch (err) {
        this.$router.replace('/')
      }
    }
  }
}
</script>
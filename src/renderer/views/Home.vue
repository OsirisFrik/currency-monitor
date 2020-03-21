<template>
  <div>
    <currency-card
      v-for="currency in currencies"
      :key="currency._id"
      :currency="currency" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getLast } from '../../utils/requests'

import CurrencyCard from '../components/Card'

export default {
  name: 'Home',
  components: {
    CurrencyCard
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['currencies'])
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      window.$home = this
    }

    getLast('USD', ['MXN']).then(data => console.log(data))
  },
  methods: {
    onUpdate (event, value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
  .card-content.app-contain {
    padding: 0.5rem !important;
    background-color: #f3f3f3;
    box-shadow: none !important;
  }

  #mainCard {
    box-shadow: none !important;
  }
</style>
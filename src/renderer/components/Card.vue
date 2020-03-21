<template>
  <div class="card currency-card">
    <div class="card-header-title">
      {{ currency.code }}
    </div>
    <div class="card-content">
      <div class="columns">
        <div
          class="column"
          v-for="compare in currency.compare"
          :key="`${currency.code}-${compare.code}`">
          {{ compare.code === 'USD' ? compare.code : null }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLast } from '../../utils/requests'

export default {
  name: 'CurrencyCard',
  props: {
    currency: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      currencies: [],
      flags: {
        loading: true
      }
    }
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      window[`$currency${this.currency.code}`] = this
    }

    this.getCurrencies()
  },
  methods: {
    async getCurrencies () {
      this.flags.loading = true
      let result = await getLast(this.currency.code, this.currency.compare)

      this.currencies = result.rates
      this.flags.loading = false
    }
  }
}
</script>

<style lang="scss">
  .currency-card {
    margin-top: 10px;
  }
</style>
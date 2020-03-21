<template>
  <form @submit.prevent="saveExchange">
    <form-currency
      :currency.sync="currency"
      :compare.sync="compare"
      :request-rate.sync="requestRate"
      :show-in-notification.sync="showInNotification"
      :change-range="changeRange" />
    <br>
    <div class="content">
      <b-button
        native-type="submit"
        expanded >
        Save
      </b-button>
    </div>
  </form>
</template>

<script>
import FormCurrency from '../components/FormCurrency'

export default {
  name: 'AddCurrency',
  components: {
    FormCurrency
  },
  data () {
    return {
      currency: {},
      compare: [],
      requestRate: 30,
      showInNotification: false,
      changeRange: 0.01
    }
  },
  methods: {
    async saveExchange () {
      let data = {
        ...this.currency,
        compare: this.compare,
        requestRate: this.requestRate,
        showInNotification: this.showInNotification,
        changeRange: this.changeRange
      }

      console.log(data)

      let currency = await this.$store.dispatch('addCurrency', data)
      this.$router.replace(`/currency/${currency._id}`)
    }
  }
}
</script>
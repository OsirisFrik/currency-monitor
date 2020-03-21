<template>
  <span>
    <div class="content">
      <section>
        <b-field
          label="Currency"
          label-position="on-border"
          :type="$v._currency.$error ? 'is-danger' : null"
          :message="{ 'This value it\'s required': $v._currency.$error }">
          <b-autocomplete
            v-model="code"
            placeholder="Currency"
            icon="ri-money-dollar-circle-line"
            icon-pack="ri"
            :custom-formatter="formatOption"
            :data="filterData"
            @select="option => $v._currency.$model = option"
            keep-first
            open-on-focus />
        </b-field>
      </section>
    </div>
    <div class="content">
      <section>
        <b-field label="Currencies to comapare">
          <b-taginput
            v-model="_compare"
            placeholder="Currencies compare"
            field="code"
            icon="ri-currency-line"
            icon-pack="ri"
            :custom-formatter="formatOption"
            :data="currencies"
            @typing="filterDataTag"
            autocomplete />
        </b-field>
      </section>
    </div>
    <div class="content">
      <section>
        <i class="mdi mdi-minus"></i>
        <b-field label="Check rate in minutes">
          <b-numberinput
            v-model="_requestRate"
            controls-position="compact"
            min="5" />
        </b-field>
      </section>
    </div>
    <div class="content">
      <section>
        <b-field label="Show in navbar">
          <b-switch v-model="_showInNotification" />
        </b-field>
      </section>
    </div>
    <div class="content">
      <section>
        <b-field label="Send notification when value change">
          <b-input
            v-model="_changeRange"
            type="number"
            step="0.01" />
        </b-field>
      </section>
    </div>
  </span>
</template>

<script>
import currencies from 'currency-codes/data'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'FormCurrency',
  props: {
    currency: {
      type: Object,
      default: () => {}
    },
    compare: {
      type: Array,
      default: () => []
    },
    requestRate: {
      type: Number,
      default: 30
    },
    showInNotification: {
      type: Boolean,
      default: false
    },
    changeRange: {
      type: Number,
      default: 0.01
    }
  },
  data () {
    return {
      currencies,
      code: ''
    }
  },
  computed: {
    filterData () {
      return currencies.filter(option => {
        let val = `${option.code} | ${option.currency}`
        return val.toLowerCase()
          .indexOf(this.code.toLowerCase()) > -1
      })
    },
    _currency: {
      get () {
        return this.currency
      },
      set (value) {
        this.$emit('update:currency', value)
      }
    },
    _compare: {
      get () {
        return this.compare
      },
      set (val) {
        this.$emit('update:compare', val)
      }
    },
    _requestRate: {
      get () {
        return this.requestRate
      },
      set (val) {
        this.$emit('update:requestRate', val)
      }
    },
    _showInNotification: {
      get () {
        return this.showInNotification
      },
      set (val) {
        this.$emit('update:showInNotification', val)
      }
    },
    _changeRange: {
      get () {
        return this.changeRange
      },
      update (val) {
        this.$emit('update:changeRange', val)
      },
      set (val) {
        this.$emit('update:changeRange', val)
      }
    }
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') window.$form = this
  },
  methods: {
    formatOption (opt) {
      return `${opt.code} | ${opt.currency}`
    },
    filterDataTag (text) {
      this.currencies = currencies.filter(option => {
        let val = `${option.code} | ${option.currency}`
        return val.toLowerCase()
          .indexOf(text.toLowerCase()) > -1
      })
    }
  },
  validations: {
    _currency: {
      required,
      code: {
        required
      }
    },
    _compare: {
      required,
      minLength: minLength(1)
    },
    _requestRate: {
      required
    },
    _showInNotification: {
      required
    },
    _changeRange: {
      valid: (value) => value >= 0
    }
  }
}
</script>
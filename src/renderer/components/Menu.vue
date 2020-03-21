<template>
  <b-menu>
    <b-menu-list>
      <template slot="label">
        Currencies
        <i
          v-if="$route.name !== 'add'"
          class="ri-add-circle-line add-icon"
          @click="$router.push('/add')" />
        <i
          v-else
          class="ri-arrow-left-line add-icon"
          @click="$router.back()" />
      </template>
      <b-menu-item
        :active="$route.path === '/'"
        label="Home"
        @click="$route.path !== '/' ? $router.replace('/') : null" />
      <b-menu-item
        v-for="(currency) in currencies"
        :key="currency._id"
        :label="currency.code"
        :active="$route.path === `/currency/${currency._id}`"
        @click="goToCurrency(currency)" />
    </b-menu-list>
  </b-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MenuBar',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['currencies'])
  },
  methods: {
    goToCurrency (currency) {
      console.log(currency)
      let to = `/currency/${currency._id}`

      if (this.$route.fullPath !== to) this.$router.push(to)
    }
  }
}
</script>

<style lang="scss">
  .menu {
    background-color: #4d20ff;
    height: 100vh;
    overflow-y: auto;

    .menu-label {
      padding: 10px 0 0 10px;
      color: #ffffff;
      font-size: 1em;

      .add-icon {
        margin-left: 5%;
        cursor: pointer;
      }
    }

    .menu-list {
      a {
        color: #ffffff;

        &.is-active {
          background-color: #2b20ff;
        }
        &:hover {
          background-color: #2b20ff;
          color: #ffffff;
        }
      }
    }
  }
</style>
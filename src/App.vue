<template>
  <div id="app">
    <Header @currency-changed="handleCurrencyChange" />
    <router-view :key="currentBaseCurrency" :baseCurrency="currentBaseCurrency" />
  </div>
</template>

<script>
import Header from './components/AppHeader.vue'

export default {
  components: {
    Header
  },
  data() {
    return {
      currentBaseCurrency: 'rub'
    };
  },
  methods: {
    handleCurrencyChange(newCurrency) {
      this.currentBaseCurrency = newCurrency;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

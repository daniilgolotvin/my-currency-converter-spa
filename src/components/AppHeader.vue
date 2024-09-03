<template>
  <header class="header">
    <nav>
      <img src="../assets/icon.svg" alt="Site Icon" class="nav-icon">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/convert" class="nav-link">Конвертер валют</router-link>
    </nav>
    <select v-model="selectedCurrency" @change="onCurrencyChange" class="currency-select">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="RUB">RUB</option>
    </select>
  </header>
</template>

<script>
export default {
  data() {
    return {
      selectedCurrency: 'RUB'
    };
  },
  methods: {
    onCurrencyChange() {
      this.$emit('currency-changed', this.selectedCurrency);
    }
  }
}
</script>

<style scoped>
.header {
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(209,169,9);
background: linear-gradient(90deg, rgb(226, 199, 89) 26%, rgba(255,218,88,1) 64%, rgba(255,231,167,1) 100%, rgba(0,212,255,1) 100%);
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, 0.1);
  padding: .625rem 1.25rem;
}

nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-icon {
  width: 9rem;
}

.nav-link {
  font-weight: bold;
  font-size: 20px;
  color: #333;
  text-decoration: none;
  transition: color 0.4s ease;
  text-align: center;
}

.nav-link:hover {
  opacity: 0.8;
}

.currency-select {
  background: linear-gradient(90deg, rgb(226, 199, 89) 26%, rgba(255,218,88,1) 64%, rgba(255,231,167,1) 100%, rgba(0,212,255,1) 100%);
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, 0.1);
  font-size: 16px;
  padding: .3125rem .625rem;
  border-radius: .3125rem;
  appearance: none;
  outline: none;
  cursor: pointer;

}

.currency-select:hover {
  background-color: #ebcc9e;
  border-color: #333;
}

@media (max-width: 35.6rem) {
  .header {
    flex-direction: column;
    font-size: 4rem;
    border-radius: 10%
  }

  nav{
    flex-direction: column;
    gap: .625rem;
  }

  .nav-link{
    font-size: 26px;
  }

  .nav-icon {
    width: 15rem;
  }

  nav {
    justify-content: space-between;
    width: 100%;
  }

  .currency-select {
    margin-top: .625rem;

  font-size: 22px;
  }
}
</style>

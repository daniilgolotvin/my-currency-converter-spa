<template>
  <div class="container">
    <h1>Конвертация валют</h1>
    <div class="converter">
      <div class="input-group">
        <label for="fromCurrency">Из валюты:</label>
        <select id="fromCurrency" v-model="fromCurrency" @change="convert">
          <option value="rub">RUB</option>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </select>
        <input v-model.number="fromAmount" type="number" @input="convert" placeholder="Введите сумму" />
      </div>
      <div class="input-group">
        <label for="toCurrency">В валюту:</label>
        <select id="toCurrency" v-model="toCurrency" @change="convert">
          <option value="rub">RUB</option>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </select>
        <input v-model.number="toAmount" type="number" disabled placeholder="Результат" />
      </div>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { getCurrencyRates } from '../services/CurrencyService'

export default {
  data() {
    return {
      fromCurrency: 'rub',
      toCurrency: 'usd',
      fromAmount: 1,
      toAmount: 0,
      rates: {},
      error: ''
    }
  },
  methods: {
    async fetchRates() {
      try {
        this.rates = await getCurrencyRates()
        if (!this.rates || !this.rates[`${this.fromCurrency}-${this.toCurrency}`]) {
          this.error = 'Курсы валют не загружены или отсутствуют данные для выбранных валют.'
          this.toAmount = 0
        } else {
          this.error = ''
          this.convert()
        }
      } catch (error) {
        this.error = 'Ошибка при получении курсов валют.'
        this.toAmount = 0
      }
    },
    convert() {
      const rateKey = `${this.fromCurrency}-${this.toCurrency}`
      if (this.rates[rateKey]) {
        const rate = this.rates[rateKey]
        this.toAmount = (this.fromAmount * rate).toFixed(2)
      } else {
        this.toAmount = 0
      }
    }
  },
  mounted() {
    this.fetchRates()
  }
}
</script>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
  max-width: 37.5rem;
  margin: 0 auto;
  margin-top: 1.25rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background: rgb(177,176,172);
	background: linear-gradient(90deg, rgba(177,176,172,1) 26%, rgba(255,255,255,1) 100%, rgba(0,212,255,1) 100%);
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 1.25rem;
  text-align: center;
}

.converter {
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
  color: #555;
}

select,
input[type="number"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

select {
  background-color: #fff;
}

input[type="number"] {
  background-color: #fff;
}

.error {
  color: #d9534f;
  font-size: 1rem;
  text-align: center;
  margin-top: 1.25rem;
}

</style>
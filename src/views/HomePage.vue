<template>
  <div>
    <h1>Курсы валют относительно {{ baseCurrency.toUpperCase() }}</h1>
    <ul class="currency-list">
      <li v-for="(rate, currency) in rates" :key="currency">
        <span class="currency">{{ currency.toUpperCase() }}:</span>
        <span class="rate">1 {{ currency.toUpperCase() }} = {{ rate }} {{ baseCurrency.toUpperCase() }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCurrencyRates } from '../services/CurrencyService'

export default {
  props: {
    baseCurrency: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      rates: {}
    };
  },
  watch: {
    baseCurrency: 'fetchRates'
  },
  methods: {
    async fetchRates() {
      try {
        const data = await getCurrencyRates();
        const baseRateKey = `usd-${this.baseCurrency.toLowerCase()}`;


        if (this.baseCurrency.toLowerCase() === 'usd') {
          this.rates = this.convertRates(data, 1);
        } else if (data && data[baseRateKey]) {
          this.rates = this.convertRates(data, data[baseRateKey]);
        } else {
          console.error('Base currency not found in the response data');
        }
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    },
    convertRates(data, baseRate) {
      const rates = {};

      for (const [key, rate] of Object.entries(data)) {
        const [from, to] = key.split('-');
        if (from === 'usd') {
          rates[to] = (baseRate / rate).toFixed(2);
        }
      }
      return rates;
    }
  },
  mounted() {
    this.fetchRates();
  }
};
</script>

<style scoped>

div{
	background: rgb(177,176,172);
	background: linear-gradient(90deg, rgba(177,176,172,1) 26%, rgba(255,255,255,1) 100%, rgba(0,212,255,1) 100%);
	font-family: 'Arial', sans-serif;
  max-width: 37.5rem;
  margin: 0 auto;
  margin-top: 1.25rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
 transition: all 0.3s ease;
}

.currency-list {
  list-style-type: none;
  padding: 0;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
}

.currency-list li {
  margin: 10px 0;
  font-size: 18px;
}

.currency {
  font-weight: bold;
  color: #333;
}

.rate {
  margin-left: 10px;
  color: #007bff;
	font-size: 22px;
}
</style>

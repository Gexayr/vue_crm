<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons" @click="refresh">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill
        :rates="currency.rates"
      />
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeBill,
    HomeCurrency
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      console.log('refresh');
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  computed: {
    bill() {
      return this.$store.getters.info.bill
    },
  },
}
</script>

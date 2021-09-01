<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <Loader v-if="loading" />

    <form class="form" @submit.prevent="submitHandler" v-else>
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"

        >
        <label for="description">{{ 'name' | localize }}</label>
        <small
            class="helper-text invalid $v.email.required"
            v-if="$v.name.$dirty && !$v.name.required">
          {{"val_name_empty" | localize}}</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{"update"|localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<style scoped>
  .switch{
    margin-bottom: 2rem;
  }
</style>

<script>
import localizeFilter from "../filters/localize.filter";
import {mapGetters, mapActions } from "vuex";
import M from "materialize-css";
import { required } from "vuelidate/lib/validators";
export default {
  metaInfo() {
    return {
      title: localizeFilter("ProfileTitle")
    }
  },
  data: () => ({
    name: '',
    loading: true,
    isRuLocale: true
  }),
  validations: {
    name: { required },
  },
  mounted() {
    this.loading = false
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'

    setTimeout(() => {
      M.updateTextFields()
    })

  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.loading = true
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
        this.loading = false

        setTimeout(() => {
          M.updateTextFields()
        })
      } catch (e) {
        console.log(e.messages());
      }
    }
  }
}
</script>
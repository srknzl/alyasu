<template>
  <b-container>
    <b-row>
      <b-col class="d-flex justify-content-center align-items-center">
        <b-card align="center" title="Giriş: " style="width:100%; max-width:30rem;">
          <b-form @submit.prevent="onSubmit">
            <b-form-group
              validated
              id="email-input-group"
              label="Email adresi:"
              label-for="email"
              valid-feedback="Güzel"
              invalid-feedback="Email girin."
            >
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="Emailinizi giriniz: "
              ></b-form-input>
            </b-form-group>

            <b-form-group
              valid-feedback="Güzel"
              invalid-feedback="En az 8 haneli şifre girin."
              id="sifre-input-group"
              label="Şifreniz: "
              label-for="sifre"
            >
              <b-form-input
                type="password"
                id="sifre"
                :state="passwordState"
                v-model="form.password"
                required
                placeholder="Şifrenizi giriniz: "
              ></b-form-input>
            </b-form-group>
            <b-button class="mr-4" type="submit" variant="success">
              <b-spinner v-if="loading" variant="warning"></b-spinner>
              <span v-if="!loading">Giriş</span>
            </b-button>
            <b-button to="/sifirla" variant="warning">Şifremi Unuttum</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import store from "../store/index";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      loading: false,
      redirect: this.$router.currentRoute.query.redirect
    };
  },
  computed: {
    passwordState() {
      return this.form.password.length >= 8;
    }
  },
  methods: {
    onSubmit() {
      this.loading = true;
      store.dispatch("login", this);
    }
  }
};
</script>

<style>
</style>
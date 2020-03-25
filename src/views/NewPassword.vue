<template>
  <b-container>
    <b-row>
      <b-col class="d-flex justify-content-center align-items-center">
        <b-card align="center" title="Şifre Sıfırla: " style="width:100%; max-width:30rem;">
          <b-form @submit.prevent="onSubmit">
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

            <b-form-group
              valid-feedback="Güzel"
              invalid-feedback="Yukardaki şifrenin aynısı olsun."
              id="sifre-again-input-group"
              label="Şifreniz: "
              label-for="sifre-again"
            >
              <b-form-input
                type="password"
                id="sifre-again"
                :state="passwordAgainState"
                v-model="form.passwordAgain"
                required
                placeholder="Şifrenizi tekrar giriniz: "
              ></b-form-input>
            </b-form-group>
            <b-button class="mr-4" type="submit" variant="success">
              <b-spinner v-if="loading" variant="warning"></b-spinner>
              <span v-if="!loading">Gönder</span>
            </b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      token: this.$route.params.token,
      form: {
        password: "",
        passwordAgain: ""
      },
      loading: false
    };
  },
  computed: {
    passwordState() {
      return this.form.password.length >= 8;
    },
    passwordAgainState() {
      return this.form.passwordAgain == this.form.password && this.form.password !== "";
    }
  },

  methods: {
    onSubmit() {
      this.loading = true;
      axios
        .post("/auth/yeniSifre", { ...this.form, token: this.token })
        .then(res => {
          this.$bvToast.toast(res.data.message);
          this.loading = false;
        })
        .catch(err => {
          if (err.response) {
            if (
              err.response.data.error.statusCode == 422 &&
              err.response.data.error.problems.length > 0
            ) {
              let s = "";
              err.response.data.error.problems.forEach(x => {
                s += " * " + x.msg;
              });
              this.$bvToast.toast(err.response.data.message + ":     " + s);
            } else {
              this.$bvToast.toast(err.response.data.message);
            }
          } else {
            this.$bvToast.toast("Hata : " + JSON.stringify(err));
          }
          this.loading = false;
        });
    }
  }
};
</script>

<style>
</style>
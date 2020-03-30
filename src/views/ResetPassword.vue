<template>
  <b-container>
    <b-row>
      <b-col class="d-flex justify-content-center align-items-center">
        <b-card align="center" title="Şifre Sıfırla: " style="width:100%; max-width:30rem;">
          <b-form validated @submit.prevent="onSubmit">
            <b-form-group
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
import url from "../util/url";
export default {
  data() {
    return {
      form: {
        email: ""
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      axios
        .post(url+"/auth/sifirla", this.form)
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
                s +=" * " + x.msg;
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
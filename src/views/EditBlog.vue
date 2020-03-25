<template>
  <div id="editblog">
    <b-container>
      <b-row v-if="hata">
        <b-card-text style="color: white;">Hata oldu tekrar deneyin.</b-card-text>
      </b-row>
      <b-row v-if="!hata">
        <b-col
          class="d-flex flex-column align-items-center justify-content-center"
          v-if="fetchLoading"
        >
          <b-spinner variant="success"></b-spinner>
        </b-col>
        <b-col
          v-if="!fetchLoading"
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <b-card
            img-alt="Resim"
            :img-src="oldImage"
            tag="article"
            class="mb-2"
            style="max-width: 40rem; width:100%;"
          >
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                :state="titleState"
                label="Başlık: "
                label-for="name-input"
                invalid-feedback="Başlık koymanız gerekiyor."
              >
                <b-form-input id="name-input" v-model="title" :state="titleState" required></b-form-input>
              </b-form-group>
              <b-form-group label="İçerik: " label-for="content-input">
                <medium-editor
                  :text="content"
                  :options="options"
                  v-on:edit="processEditOperation"
                  custom-tag="div"
                />
              </b-form-group>
              <b-form-group
                :state="coverImageState"
                label="Kapak Resmi:(Değiştirmemek için bir şey seçmeyin.) "
                label-for="cover-image-input"
              >
                <b-form-file
                  id="cover-image-input"
                  accept="image/*"
                  browse-text="Resim seçiniz."
                  placeholder="Resim seçin veya sürekleyin."
                  drop-placeholder="Bırakın."
                  v-model="coverImageUrl"
                ></b-form-file>
              </b-form-group>
              <b-form-group
                label="Anahtar Kelimeler(5 tane idealdir): "
                label-for="keywords-input"
                invalid-feedback="Anahtar kelimeleri virgülle ayrılmış şekilde giriniz."
              >
                <b-form-tags
                  id="keywords-input"
                  tag-pills
                  tag-variant="primary"
                  remove-on-delete
                  separator=","
                  duplicate-tag-text="Aynı kelime var"
                  placeholder="Enter veya virgülle ekleyin."
                  v-model="keywords"
                ></b-form-tags>
              </b-form-group>
            </form>
            <b-button-group>
              <b-button class="mr-2" @click.prevent="onSubmit" variant="success">
                <b-spinner variant="danger" v-if="editLoading" small></b-spinner>
                <span v-if="!editLoading">Tamam</span>
              </b-button>
              <b-button to="/blog" variant="danger">Geri dön</b-button>
            </b-button-group>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import editor from "vue2-medium-editor";
import store from "../store/index";
export default {
  data: function() {
    return {
      options: {
        buttonLabels: "fontawesome",
        toolbar: {
          buttons: [
            "h1",
            "h2",
            "h3",
            "anchor",
            "bold",
            "italic",
            "unorderedlist",
            "orderedlist",
            "table"
          ]
        },
        extensions: {
          table: new MediumEditorTable()
        },
        placeholder: false
      },
      hata: false,
      content: "",
      keywords: [],
      title: "",
      coverImageUrl: null,
      oldImage: "",
      editLoading: false,
      fetchLoading: false
    };
  },
  components: {
    "medium-editor": editor
  },
  computed: {
    titleState() {
      return this.title.length > 0;
    }
  },
  created() {
    this.fetchLoading = true;
    axios
      .get("/blog/blogEntries/" + this.$route.params.id)
      .then(res => {
        this.title = res.data.blogEntry.title;
        this.content = res.data.blogEntry.content;
        this.oldImage = res.data.blogEntry.coverImageUrl;
        this.keywords = res.data.blogEntry.keywords;
        this.fetchLoading = false;
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
          this.$bvToast.toast("Bir hata oldu: " + JSON.stringify(err));
        }
        this.hata = true;
        this.fetchLoading = false;
      });
  },
  components: {
    "medium-editor": editor
  },
  methods: {
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    processEditOperation(operation) {
      this.content = operation.api.origElements.innerHTML;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    async onSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.editLoading = true;
      if (this.coverImageUrl == null) {
        axios
          .put("/blog/editBlogEntry/" + this.$route.params.id, {
            content: this.content,
            coverImageUrl: this.oldImage,
            title: this.title,
            keywords: this.keywords
          })
          .then(res => {
            store.commit("editBlog", {
              _id: this.$route.params.id,
              content: this.content,
              title: this.title,
              keywords: this.keywords
            });
            this.$bvToast.toast(res.data.message);
            this.editLoading = false;
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
              this.$bvToast.toast("Bir hata oldu: " + JSON.stringify(err));
            }
            this.editLoading = false;
          });
      } else {
        let coverImageBase64;
        try {
          coverImageBase64 = await this.toBase64(this.coverImageUrl);
        } catch (error) {
          this.$bvToast.toast("Bir hata var " + JSON.stringify(error));
          this.editLoading = false;
          return;
        }
        axios
          .put("/blog/editBlogEntry/" + this.$route.params.id, {
            content: this.content,
            coverImageUrl: coverImageBase64,
            title: this.title,
            keywords: this.keywords
          })
          .then(res => {
            store.commit("editBlogChangeCover", {
              _id: this.$route.params.id,
              content: this.content,
              title: this.title,
              coverImageUrl: this.coverImageUrl,
              keywords: this.keywords
            });
            this.$bvToast.toast(res.data.message);
            this.oldImage = coverImageBase64;
            this.editLoading = false;
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
              this.$bvToast.toast("Bir hata oldu: " + JSON.stringify(err));
            }
            this.editLoading = false;
          });
      }
    }
  }
};
</script>

<style>
#editblog {
  padding: 30px;
  width: 90%;
}
img {
  width: 100%;
}
</style>

<template>
  <div id="blog">
    <b-container>
      <b-row>
        <b-col cols="2">
          <b-button-group vertical>
            <b-button
              v-if="loggedIn"
              v-b-modal.blog-modal
              @click="resetData"
              variant="success"
            >Yeni Yazı</b-button>
            <b-spinner class="mt-2" variant="warning" v-if="newBlogLoading"></b-spinner>
            <b-modal
              size="xl"
              id="blog-modal"
              ok-variant="success"
              cancel-variant="danger"
              ok-title="Tamam"
              cancel-title="İptal"
              title="Yeni Blog Ekle!"
              @ok="handleOk"
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
                  label="Kapak Resmi: "
                  label-for="cover-image-input"
                  invalid-feedback="Kapak resmi girmeniz gerekiyor."
                >
                  <b-form-file
                    id="cover-image-input"
                    accept="image/*"
                    browse-text="Resim seçiniz."
                    placeholder="Resim seçin veya sürekleyin."
                    drop-placeholder="Bırakın."
                    v-model="coverImageUrl"
                    :state="coverImageState"
                    required
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
            </b-modal>
          </b-button-group>
        </b-col>
        <b-col
          v-if="blogsLoading"
          class="d-flex flex-column align-items-center justify-content-center"
          cols="10"
        >
          <b-spinner variant="success"></b-spinner>
        </b-col>
        <b-col
          v-if="!blogsLoading"
          class="d-flex flex-column align-items-center justify-content-center"
          cols="10"
        >
          <b-card
            v-for="blog in blogEntries"
            :id="'blog' + blog._id.toString()"
            :key="blog._id"
            :title="blog.title"
            :img-src="blog.coverImageUrl"
            img-top
            tag="article"
            class="mb-2"
            style="max-width: 40rem; width:75%;"
          >
            <span v-html="blog.content"></span>
            <b-button-group>
              <b-button class="mr-2" :to="'/blog/'+blog._id" variant="primary">Dahasını Oku</b-button>
              <b-button
                v-if="loggedIn"
                class="mr-2"
                :to="'/blog-duzenle/'+blog._id"
                variant="success"
              >Düzenle</b-button>
              <b-button v-if="loggedIn" class="mr-2" @click="onDelete(blog._id)" variant="danger">
                <b-spinner variant="warning" v-if="deleteLoading" small></b-spinner>
                <span v-if="!deleteLoading">Sil</span>
              </b-button>
            </b-button-group>
            <template v-slot:footer>
              <b-card-text>Anahtar Kelimeler:</b-card-text>
              <span
                style="font-style: italic;"
                v-for="keyword in blog.keywords"
                :key="keyword"
              >{{keyword}}</span>
            </template>
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
      keywords: [],
      options: {
        placeholder: false,
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
        }
      },
      content: "",
      title: "",
      coverImageUrl: null,
      deleteLoading: false,
      blogsLoading: false,
      newBlogLoading: false,
      coverImageBase64: ""
    };
  },
  components: {
    "medium-editor": editor
  },
  computed: {
    titleState() {
      return this.title.length > 0;
    },
    coverImageState() {
      return this.coverImageUrl != null;
    },
    loggedIn() {
      return store.state.loggedIn;
    },
    blogEntries() {
      return store.state.blogEntries;
    }
  },
  created() {
    this.blogsLoading = true;
    store.dispatch("fetchBlogs", this);
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
    handleOk(e) {
      e.preventDefault();
      this.handleSubmit();
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.newBlogLoading = true;
      try {
        this.coverImageBase64 = await this.toBase64(this.coverImageUrl);
      } catch (error) {
        this.$bvToast.toast("Bir hata var " + JSON.stringify(error));
        this.newBlogLoading = false;
        return;
      }

      store.dispatch("addBlogEntry", this);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("blog-modal");
      });
    },
    processEditOperation(operation) {
      this.content = operation.api.origElements.innerHTML;
    },
    onDelete(_id) {
      this.deleteLoading = true;
      store.dispatch("deleteBlog", { vm: this, _id: _id });
    },
    resetData() {
      this.content = "";
      this.coverImageUrl = null;
      this.keywords = [];
      this.title = "";
      console.log(this.$refs.mediumEditor);
    }
  }
};
</script>

<style>
#blog {
  padding: 30px;
  width: 90%;
}
img {
  width: 100%;
}
</style>

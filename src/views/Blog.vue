<template>
  <div id="blog">
    <b-container>
      <b-row>
        <b-col cols="2">
          <b-button-group vertical>
            <b-button v-b-modal.blog-modal variant="success">Yeni Yazı</b-button>
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
                <b-form-group
                  label="İçerik: "
                  label-for="content-input"
                  invalid-feedback="İçerik girmeniz gerekiyor."
                >
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
                    placeholder="Dosya seçin."
                    v-model="coverImageUrl"
                    :state="coverImageState"
                    required
                  ></b-form-file>
                </b-form-group>
                <b-form-group
                  :state="keywordState"
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
                    :state="keywordState"
                    required
                  ></b-form-tags>
                </b-form-group>
              </form>
            </b-modal>
          </b-button-group>
        </b-col>
        <b-col class="d-flex flex-column align-items-center justify-content-center" cols="10">
          <b-card
            v-for="blog in blogEntries"
            :key="blog._id"
            :title="blog.title"
            :img-src="blog.coverImageUrl"
            img-top
            tag="article"
            class="mb-2"
            style="max-width: 40rem; width:75%;"
          >
            <b-card-text variant="dark">{{ blog.content }}</b-card-text>
            <b-button-group>
              <b-button class="mr-2" :to="'/edit-blog/'+blog._id" variant="primary">Dahasını Oku</b-button>
              <b-button class="mr-2" href="#" variant="primary">Düzenle</b-button>
              <b-button class="mr-2" href="#" variant="danger">Sil</b-button>
            </b-button-group>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      blogEntries: [],
      keywords: [],
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
        }
      },
      content: "",
      title: "",
      coverImageUrl: null
    };
  },
  components: {
    "medium-editor": vueMediumEditor.default
  },
  computed: {
    titleState() {
      return this.title.length > 0;
    },
    coverImageState() {
      return this.coverImageUrl != null;
    },
    keywordState() {
      return this.keywords.length > 0;
    }
  },
  created(){
    axios.get("/blog/blogEntries").then(res => {
      this.blogEntries = res.data.blogEntries;
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    handleOk(e) {
      e.preventDefault();
      this.handleSubmit();
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("blog-modal");
      });
    },
    processEditOperation(operation) {
      this.content = operation.api.origElements.innerHTML;
    }
    //   processEditBlog(operation) {
    //     const foundIndex = this.blogEntries.findIndex(x => {
    //       return x.id == operation.event.target.id;
    //     });
    //     if (foundIndex == -1){
    //       console.log("Not found");
    //     }
    //     else {
    //       this.blogEntries[foundIndex].content = operation.api.origElements.innerHTML;
    //       console.log(this.blogEntries[foundIndex].content);
    //     }
    //   }
    // }
  }
};
</script>

<style>
#blog {
  padding: 30px;
  width: 90%;
}
</style>

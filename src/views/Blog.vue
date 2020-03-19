<template>
  <div id="blog">
    <b-container>
      <b-row>
        <b-col cols="3">
          <b-button-group vertical>
            <b-button v-b-modal.modal-1 variant="success">Yeni Yazı</b-button>
            <b-modal
              ok-variant="success"
              cancel-variant="danger"
              ok-title="Tamam"
              cancel-title="İptal"
              id="modal-1"
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
                  :state="contentState"
                  label="İçerik: "
                  label-for="content-input"
                  invalid-feedback="İçerik girmeniz gerekiyor."
                >
                  <b-form-textarea
                    id="content-input"
                    v-model="content"
                    :state="contentState"
                    rows="15"
                    required
                  ></b-form-textarea>
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
        <b-col cols="8" offset="1">
          <b-card
            v-for="blog in blogEntries"
            :key="blog.id"
            :title="blog.title"
            :img-src="blog.coverImageUrl"
            img-top
            tag="article"
            class="mb-2"
            style="max-width: 30rem;"
          >
            <b-card-text variant="dark">{{ blog.content }}</b-card-text>
            <b-button-group>
              <b-button class="mr-2" href="#" variant="primary">Dahasını Oku</b-button>
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
export default {
  data: function() {
    return {
      blogEntries: [
        {
          title: "Blog 1",
          content: "Content 1",
          id: "1",
          coverImageUrl: "https://vuejs.org/images/logo.png"
        },
        {
          title: "Blog 2",
          content: "Content 2",
          id: "2",
          coverImageUrl: "https://vuejs.org/images/logo.png"
        }
      ],
      keywords: [],
      content: "",
      title: "",
      coverImageUrl: null
    };
  },
  computed: {
    titleState() {
      return this.title.length > 0;
    },
    contentState() {
      return this.content.length > 0;
    },
    coverImageState() {
      return this.coverImageUrl != null;
    },
    keywordState() {
      return this.keywords.length > 0;
    }
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
      console.log(this.title);
      console.log(this.content);
      console.log(this.coverImageUrl);
      console.log(this.keywords);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>

<style>
#blog {
  padding: 30px;
  width: 90%;
}
</style>

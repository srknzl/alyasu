<template>
  <div id="blogDetail">
    <b-container>
      <b-row>
        <b-col class="d-flex flex-column align-items-center justify-content-center">
          <b-card
            :title="title"
            :img-src="coverImageUrl"
            img-top
            tag="article"
            class="mb-2"
            style="max-width: 40rem; width:100%;"
          >
            <span v-html="content"></span>
            <b-button to="/blog" variant="danger">Geri dön</b-button>
            <template v-slot:footer>
              <b-card-text>Anahtar Kelimeler:</b-card-text>
              <span
                style="font-style: italic;"
                v-for="keyword in keywords"
                :key="keyword"
              >{{keyword}}, </span>
            </template>
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
      content: "",
      keywords: [],
      title: "",
      coverImageUrl: ""
    };
  },
  created() {
    axios
      .get("/blog/blogEntries/" + this.$route.params.id)
      .then(res => {
        this.title = res.data.blogEntry.title;
        this.content = res.data.blogEntry.content;
        this.coverImageUrl = res.data.blogEntry.coverImageUrl;
        this.keywords = res.data.blogEntry.keywords;
      })
      .catch(err => {
        if (err.response) {
          this.$bvToast.toast(err.response.data.message);
        } else {
          this.$bvToast.toast("Bir hata oldu: " + JSON.stringify(err));
        }
      });
  }
};
</script>

<style>
#blogDetail {
  width: 90%;
}
img {
  width: 100%;
}
</style>

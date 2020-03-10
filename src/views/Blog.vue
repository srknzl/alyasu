<template>
  <div id="blog">
    <b-container>
      <b-row>
        <b-col cols="3">
          <b-button-group vertical>
            <b-button variant="success">Yeni Yazı</b-button>
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
      ]
    };
  }
};
</script>

<style>
#blog {
  padding: 30px;
  width: 90%;
}
</style>

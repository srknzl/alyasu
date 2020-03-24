<template>
  <div id="editblog">
    <b-container>
      <b-row></b-row>
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
        console.log(err);
      });
  },
  components: {
    "medium-editor": vueMediumEditor.default
  },
  computed: {},
  methods: {
    processEditOperation(operation) {
      this.content = operation.api.origElements.innerHTML;
    }
  }
};
</script>

<style>
#editblog {
  padding: 30px;
  width: 90%;
}
</style>

<template>
  <div id="editblog">
    <b-container>
      <b-row></b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
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

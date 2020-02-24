<template>
  <div class="home">
    <b-card
      img-src="./assets/kapak.jpeg"
      img-alt="Kapak resmi"
      overlay
      border-variant="primary"
      text-variant="white"
      tag="article"
      style="max-width: 40rem;"
      class="kapak"
      align="center"
    >
      <b-row id="row">
        <b-card-text>Hastaliklarin zihinsel nedenleri</b-card-text>
        <b-button to="/hastalikzihinsel" variant="dark">Detaylar</b-button>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
}
#row {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
</style>

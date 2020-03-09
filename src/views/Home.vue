<template>
  <div class="home">
    <b-container class="homeContainer">
      <b-row align-h="center">
        <b-col>
          <b-card
            img-src="./assets/tree.jpg"
            img-alt="Yaz Kış Ağaç Kapak resmi"
            overlay
            border-variant="light"
            text-variant="white"
            tag="article"
            class="kapak"
            align="center"
          >
            <b-card-text>Hastaliklarin zihinsel nedenleri</b-card-text>
            <b-button to="/hastalikzihinsel" variant="dark">Detaylar</b-button>
          </b-card>
        </b-col>
      </b-row>
      <!--
        <b-row class="topMargin" align-h="center">
        <b-col class="carCol">
          <b-carousel
            id="carousel-1"
            fade
            :interval="4000"
            controls
            indicators
            img-width="480"
            img-height="480"
            background="#ababab"
            style="text-shadow: 1px 1px 2px #333;"
          >
            
            <b-carousel-slide
              caption="Bişeyler"
              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
              img-src="./assets/1.gif"
            ></b-carousel-slide>
            <b-carousel-slide
              caption="Ağaç"
              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
              img-src="./assets/2.gif"
            ></b-carousel-slide>
            
            <b-carousel-slide img-src="./assets/3.gif">
              <h1>Hello world!</h1>
            </b-carousel-slide>

            
            <b-carousel-slide img-src="./assets/4.gif"></b-carousel-slide>

            
            <b-carousel-slide img-src="./assets/5.gif"></b-carousel-slide>
          </b-carousel>
        </b-col>
      </b-row>
      -->
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: function() {
    return {};
  },
  methods: {}
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
.card-img-overlay {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.topMargin {
  margin-top: 1rem;
}
</style>

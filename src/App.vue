<template>
  <div id="app">
    <b-img center id="logo" alt="Vue logo" src="./assets/logo.jpeg"></b-img>
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">AlyaSu Gelişim Akademisi</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav fill align="center" style="display: contents;">
            <b-nav-item v-if="this.$router.currentRoute.name !== 'Home'" to="/"
              >Ana sayfa</b-nav-item
            >
            <b-nav-item to="/blog">Blog</b-nav-item>
            <b-nav-item to="/ailedanismani">Aile Danışmanı</b-nav-item>
            <b-nav-item to="/hipnoterapi">Hipnoterapi</b-nav-item>
            <b-nav-item to="/alfabioenerji">Alfabioenerji</b-nav-item>
            <b-nav-item to="/accessbars">Access Bars</b-nav-item>
            <b-nav-item to="/doula">Doula</b-nav-item>
            <b-nav-item to="/bilincaltidili">Bilinçaltı dili</b-nav-item>
            <b-nav-item to="/hakkinda">Hakkında</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view />
  </div>
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#nav {
  padding: 30px;
  width: 90%;

  a {
    &.router-link-exact-active {
      color: aquamarine;
    }
  }
}
#logo {
  max-width: 10rem;
  padding-top: 2rem;
}
p {
  text-indent: 2rem;
}
</style>
<script>
export default {
  data: function() {
    return {};
  },
  methods: {}
};
</script>

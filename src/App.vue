<script lang="ts">
// Import components
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  components: {
    Header,
    Footer,
  },
  watch:{
    $route() {
      let lang = typeof(this.$route.params.lang) === 'string' ? this.$route.params.lang : 'en';
      this.$store.commit('changeLang', lang);

      this.$i18n.locale = this.$store.state.lang;
    }
  },
  computed: {
  }
}
</script>

<template>
  <Header />
  <main>
    <router-view></router-view>
  </main>
  <Footer />
</template>

<style scoped>

</style>

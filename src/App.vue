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
  created() {
    if (window.location.href.indexOf('#') !== -1) {
      this.$router.push(`/en${window.location.href.split('#')[1]}`);
      return;
    }

    if (!this.$route.params.lang) {
      this.$router.replace('/en');
    }
  },
  watch:{
    $route() {
      let lang = typeof(this.$route.params.lang) === 'string' ? this.$route.params.lang : 'en';
      this.$store.commit('changeLang', lang);
      this.$i18n.locale = this.$store.state.lang;
      window.scrollTo(0, 0);
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

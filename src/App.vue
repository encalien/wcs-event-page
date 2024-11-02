<script lang="ts">
// Import components
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ComingSoonComponent from "./components/pages/ComingSoonComponent.vue";

export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
    ComingSoonComponent,
  },
  created() {},
  //     created() {
  //     if (window.location.href.includes('#')) {
  //       this.$router.replace(`/en${window.location.href.split('#')[1]}`);
  //       return;
  //     }

  //     if (window.location.pathname === "/") {
  //       this.$router.replace('/en');
  //     }
  //   },
  //   watch:{
  //     $route() {
  //       let lang = typeof(this.$route.params.lang) === 'string' ? this.$route.params.lang : 'en';
  //       this.$store.commit('changeLang', lang);
  //       this.$i18n.locale = this.$store.state.lang;
  //       window.scrollTo(0, 0);
  //     }
  //   },
  //   computed: {
  //   }
  // },
  computed: {},
};
</script>

<template>
  <Header />
  <main>
    <!-- <router-view></router-view> -->
    <ComingSoonComponent />
  </main>
  <Footer />
</template>

<style scoped></style>

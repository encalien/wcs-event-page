<script lang="ts">
// Import components
import ComingSoonComponent from "./components/pages/ComingSoonComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    HeaderComponent,
    // eslint-disable-next-line vue/no-reserved-component-names
    FooterComponent,
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
  <HeaderComponent />
  <main>
    <!-- <router-view></router-view> -->
    <ComingSoonComponent />
  </main>
  <FooterComponent />
</template>

<style scoped></style>

<script lang="ts">
// Import components
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
  watch: {
    $route() {
      let lang =
        typeof this.$route.params.lang === "string"
          ? this.$route.params.lang
          : "en";
      this.$store.commit("changeLang", lang);

      this.$i18n.locale = this.$store.state.lang;
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<template>
  <HeaderComponent />
  <main>
    <router-view></router-view>
    <!-- <SaveTheDatePage /> -->
  </main>
  <FooterComponent />
</template>

<style scoped></style>

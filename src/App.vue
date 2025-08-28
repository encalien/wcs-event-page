<script lang="ts">
// Import components
import ComingSoonComponent from "./components/pages/ComingSoonComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import AlertComponent from "./components/AlertComponent.vue";

export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  components: {
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    // eslint-disable-next-line vue/no-unused-components
    ComingSoonComponent,
  },
  created() {
    if (window.location.href.includes("#")) {
      this.$router.replace(`/en${window.location.href.split("#")[1]}`);
      return;
    }

    if (window.location.pathname === "/") {
      this.$router.replace("/en");
    }
  },
  watch: {
    $route() {
      let lang =
        typeof this.$route.params.lang === "string"
          ? this.$route.params.lang
          : "en";
      this.$store.commit("changeLang", lang);
      this.$i18n.locale = this.$store.state.lang;
      window.scrollTo(0, 0);
    },
  },
  computed: {},
  metaInfo() {
    let lang =
      typeof this.$route.params.lang === "string"
        ? this.$route.params.lang
        : "en";

    return {
      meta: [
        { property: "og:url", content: `https://slovenianopen.dance/${lang}` },
        { property: "og:locale", content: this.getOgLocale(lang) },
        { property: "og:locale:alternate", content: "en_US" },
        { property: "og:locale:alternate", content: "fr_FR" },
        { property: "og:locale:alternate", content: "sl_SI" },
      ],
    };
  },
  methods: {
    getOgLocale(lang: string) {
      switch (lang) {
        case "fr":
          return "fr_FR";
        case "si":
          return "sl_SI";
        default:
          return "en_US";
      }
    },
  },
};
</script>

<template>
  <HeaderComponent />
  <main>
    <!-- <router-view></router-view> -->
    <ComingSoonComponent />
  </main>
  <FooterComponent />
  <AlertComponent />
</template>

<style scoped></style>

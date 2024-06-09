<script lang="ts">
// Import components
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Home from "./components/pages/Home.vue";

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
    Home,
  },
  created() {},
  computed: {},
};
</script>

<template>
  <Header />
  <main>
    <Home />
  </main>
  <Footer />
</template>

<style scoped></style>

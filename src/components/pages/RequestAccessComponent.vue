<script lang="ts">
import axios from "axios";
import messages from "../../i18n/en";

export default {
  data() {
    return {
      messages: messages,
      email: "",
    };
  },
  methods: {
    async requestLoginLink() {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}events/${
            import.meta.env.VITE_EVENT_ID
          }/request-profile-link`,
          {
            email: this.email,
            lang: this.$store.state.lang,
          }
        );
        (window as any).alertComponent.show("successfulRequest", "success");
      } catch (error) {
        (window as any).alertComponent.show("failedRequest", "error");
      }
    },
  },
};
</script>

<template>
  <h1>{{ $t("userProfile.pageTitle") }}</h1>
  <div class="container flex-container">
    <form @submit.prevent="requestLoginLink">
      <label for="email">{{ $t("userProfile.inputText") }}</label>
      <input type="email" v-model="email" required />
      <button type="submit" class="btn btn-primary">
        {{ $t("userProfile.btnText") }}
      </button>
      <p>{{ $t("userProfile.infoText") }}</p>
    </form>
  </div>
</template>

<style>
form {
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem auto;
}

input {
  height: 2rem;
}

.btn {
  width: 100%;
  padding: 0.3rem 1rem;
  text-transform: uppercase;
  margin: 0 auto 1rem;
}
</style>

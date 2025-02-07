<script lang="ts">
import axios from "axios";
import messages from "../../i18n/en";

export default {
  data() {
    return {
      messages: messages,
      email: "",
      messageKey: "",
    };
  },
  methods: {
    async requestLoginLink() {
      this.messageKey = "";
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}request-login-link`, {
          email: this.email,
          eventName: import.meta.env.VITE_EVENT_NAME,
          lang: this.$store.state.lang,
        });
        this.messageKey = "successfulRequest";
      } catch (error) {
        this.messageKey = "failedRequest";
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
      <p v-if="messageKey">
        {{ $t(`userProfile.messages.${messageKey}`) }}
      </p>
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

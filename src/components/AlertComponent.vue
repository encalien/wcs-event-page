<script lang="ts">
export default {
  data() {
    return {
      messageKey: null as string | null,
      status: null as "error" | "success" | null,
      timeout: null as number | null,
    };
  },
  created() {
    (window as any).alertComponent = this;
  },
  methods: {
    async show(messageKey: string, status: "error" | "success") {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.status = status;
      this.messageKey = messageKey;

      this.timeout = setTimeout(() => {
        this.status = null;
        this.messageKey = null;
      }, 5000);
    },
  },
};
</script>

<template>
  <div
    v-if="messageKey"
    class="alert"
    :class="status"
    v-html="$t(`userProfile.messages.${messageKey}`)"
  ></div>
</template>

<style>
.alert {
  padding: 1rem;
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: small;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 10;
}

.success {
  background-color: var(--confirmed);
  border: 1px solid var(--black);
}

.error {
  background-color: var(--other);
  border: 1px solid var(--black);
}
</style>

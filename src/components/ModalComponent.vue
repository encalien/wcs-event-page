<script lang="ts">
export default {
  methods: {
    closeModal() {
      document.removeEventListener("keydown", this.closeOnEscape);
      this.$emit("close");
    },
    closeOnEscape(event: any) {
      if (event.key === "Escape") this.closeModal();
    },
  },
  emits: ["close"],
  created() {
    document.addEventListener("keydown", this.closeOnEscape);

    const body = document.querySelector("body");
    if (body) {
      body.style.height = "100vh";
      body.style.overflow = "hidden";
    }
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.closeOnEscape);

    const body = document.querySelector("body");
    if (body) {
      body.style.height = "";
      body.style.overflow = "";
    }
  },
};
</script>

<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="closeModal">✕</button>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  .modal-content {
    position: relative;
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    max-width: 90%;
    max-height: 90%;
    overflow: auto;

    .close-btn {
      width: 1.6rem;
      height: 1.6rem;
      position: absolute;
      z-index: 10;
      right: 1rem;
      top: 1rem;
    }
  }
}
</style>

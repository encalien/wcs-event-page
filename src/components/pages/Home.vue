<script lang="ts">
export default {

}
</script>

<template>
  <div class="flex-container">
    <img src="src/assets/images/fb_banner.svg" alt="banner" id="banner" class="flex-item">
    <div class="flex-item flex-base-40">
      <h1>Home</h1>
      <p>Welcome to our event.</p>
    </div>
  </div>
</template>

<style scoped>
  .flex-container {
    display: flex;
    background-color: darkgrey;
  }
  .flex-item {
    flex-grow: 1;
    flex-shrink: 1;
    padding: 1rem;
  }
  .flex-base-40 {
    flex-basis: 40%;
  }
  #banner {
    width: 60%;
  }

</style>

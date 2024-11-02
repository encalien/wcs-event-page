<script lang="ts">
import messages from "../../i18n/en";

export default {
  data() {
    return {
      messages: messages,
    };
  },
};
</script>

<template>
  <section id="landing">
    <div class="landing-content">
      <h2 class="margin-0">Join us at Slovenian Open - WSDC Registry Event!</h2>
      <h2 class="important">{{ $t("event.location") }}, April 10 - 14, 2025</h2>
      <div>
        <a
          href="https://www.facebook.com/events/333172752914194/"
          target="_blank"
          id="register-now-btn"
        >
          Coming Soon
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
#landing {
  background-color: var(--accent-1);
  width: 100vw;
  color: var(--white-soft);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -40px calc(-50vw + 50%) 0;
}

.landing-content {
  flex: 1 0 auto;
  text-align: center;
  padding: 2rem 2rem 0;
}

.important {
  color: var(--accent-2);
  margin: 1rem 0;
}

#register-now-btn {
  display: block;
  width: fit-content;
  margin: 2rem auto;
  padding: 1rem 3rem;
  color: var(--accent-1);
  background-color: var(--accent-2);
  font-family: Cera Pro Bold;
  font-size: 2rem;
  text-transform: uppercase;
}

#register-now-btn:hover {
  background-color: #fbf9c4;
  text-decoration: none;
}

@media screen and (max-width: 1200px) {
  .landing-content {
    padding: 1rem;
    margin-top: 1rem;
  }
}
</style>

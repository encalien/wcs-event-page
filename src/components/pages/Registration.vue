<script lang="ts">
import Participant from "../../dtos/Participant";
import axios from 'axios';
import { store } from '../../store';


export default {
  data() {
    return {
      participant: new Participant(),
      formSubmitted: false,
      store
    }
  },
  methods: {
    submitRegistration: function (event: Event) {
      event.preventDefault();

      const form = { participant: this.participant };
      const url = `${import.meta.env.VITE_APP_API_URL}/participants`;

      axios.post(url, form)
        .then((res) => {
          this.formSubmitted = true;
          window.scrollTo(0,0);
          this.store.addAlert({
            message: "Your registration has been submitted successfully.",
            type: "success"
          })
        })
        .catch((error) => {
          window.scrollTo(0,0);
          this.store.addAlert({
            message: "Oops! Something went wrong! Please try again later.",
            type: "error"
          })
          console.log("Error", error)
        })
    },
    toTitleCase: function (string: string): string {
      return string.replace(/([A-Z])/g, (match) => ` ${match}`)
                   .replace(/^./, (match) => match.toUpperCase())
                   .trim();
    }
  }
}
</script>

<template>
  <section>
    <h1>{{ $t('registration.pageTitle') }}</h1>
    <!-- <p>{{ $t('event.tba') }}</p> -->

    <!-- <div id="alert" v-if="alert.message" :class="alert.type">{{ alert.message }}</div> -->

    <form v-if="!formSubmitted" @submit="submitRegistration" method="post">
      <label for="firstName">firstName</label>
      <input type="text" v-model="participant.firstName" name="participant[firstName]" id="firstName" placeholder="first name">
      <label for="lastName">lastName</label>
      <input type="text" v-model="participant.lastName" name="participant[lastName]" id="lastName" placeholder="last name">
      <label for="email">email</label>
      <input type="email" v-model="participant.email" name="participant[email]" id="email" placeholder="email">
      <label for="country">country</label>
      <input type="text" v-model="participant.country" name="participant[country]" id="country" placeholder="country">
      <label for="partnerEmail">partnerEmail</label>
      <input type="email" v-model="participant.partnerEmail" name="participant[partnerEmail]" id="partnerEmail" placeholder="partner's email">
      <label>pass type</label>
      <label for="full">full</label>
      <input type="radio" v-model="participant.passType" name="participant[passType]" id="full" value="full">
      <label for="saturday">saturday</label>
      <input type="radio" v-model="participant.passType" name="participant[passType]" id="saturday" value="saturday">
      <label for="party">party</label>
      <input type="radio" v-model="participant.passType" name="participant[passType]" id="party" value="party">
      <label>role</label>
      <label for="leader">leader</label>
      <input type="radio" v-model="participant.role" name="participant[role]" id="leader" value="leader">
      <label for="follower">follower</label>
      <input type="radio" v-model="participant.role" name="participant[role]" id="follower" value="follower">
      <label for="subscribed">subscribed</label>
      <input type="checkbox" v-model="participant.subscribed" name="participant[subscribed]" id="subscribed" value="subscribed">
      <label for="termsAccepted">termsAccepted</label>
      <input type="checkbox" v-model="participant.termsAccepted" name="participant[termsAccepted]" id="termsAccepted" value="termsAccepted">
      <button type="submit">Send</button>
    </form>

    <div v-if="formSubmitted">
      <p>
        Thank you for your registration! All registrations are immediately placed on the waiting list.
        You can expet to receive an acceptance email with payment info once your registration has been processed and approved.
        If you signed up with a partner, make sure that your partner submits their registration too so that we can match you in the system.
      </p>
      <p>Here are the details of the form you submitted:</p>
      <ul>
        <li v-for="(value, attribute) in participant">
          <span>{{ toTitleCase(attribute) }}:</span> <span>{{ value }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
  input {
    display: block;
  }

  #alert {
    padding: 1rem;
    margin: 1rem auto;
  }
  .error {
    color: rgb(125, 0, 0);
    background-color: rgb(255, 173, 173);
  }
  .success {
    color: rgb(0, 78, 0);
    background-color: rgb(195, 249, 195)
  }
</style>

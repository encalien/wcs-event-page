<script lang="ts">
import Participant from "../../dtos/Participant";
import axios from 'axios';
import { store } from '../../store';
import { fields } from '../../services/Fields';


export default {
  data() {
    return {
      fields,
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

    <form v-if="!formSubmitted" @submit="submitRegistration" method="post">
      <div v-for="field in fields" class="grid-container grid-1-2">
        <label :for="field.id" class="field-label">{{ $t(`registration.fields.${field.id}`) }}</label>
        <div v-if="!field.options">
          <input :type="field.type" 
                :name="field.id"
                :id="field.id"
                v-model="participant[field.id]"
                :required="field.validations.required">
        </div>
        <div v-if="field.options">
          <div v-for="opt in field.options" class="flex-container flex-column">
            <input :type="field.type" 
                  :name="field.id"
                  :id="opt"
                  v-model="participant[field.id]"
                  :required="field.validations.required"
                  class="field-option-item">
            <label :for="opt" class="field-label field-option">{{ $t(`registration.fields.${opt}`) }}</label>
          </div>
        </div>
      </div>
      <button type="submit">{{ $t('registration.fields.submit') }}</button>
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

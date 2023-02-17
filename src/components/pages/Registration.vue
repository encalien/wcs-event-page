<script lang="ts">
import Participant from "../../dtos/Participant";
import type Field from "../../dtos/Field";
import axios from 'axios';
import { store } from '../../store';
import { fields } from '../../services/Fields';


export default {
  data() {
    return {
      fields: fields as Field[],
      participant: new Participant(),
      formSubmitted: false,
      invalidFields: [] as string[],
      store
    }
  },
  methods: {
    submitRegistration: function (event: Event) {
      event.preventDefault();

      const form = { participant: this.participant };
      const url = `${import.meta.env.VITE_APP_API_URL}/participants`;

      console.log(form)
      axios.post(url, form)
        .then((res) => {
          this.formSubmitted = true;
          window.scrollTo(0,0);
          this.store.addAlert({
            messageKey: "registrationSuccess",
            type: "success"
          })
        })
        .catch((error) => {
          window.scrollTo(0,0);
          this.store.addAlert({
            messageKey: "registrationError",
            type: "error"
          })
          console.log("Error", error)
        })
    },
    toTitleCase: function (string: string): string {
      return string.replace(/([A-Z])/g, (match) => ` ${match}`)
                   .replace(/^./, (match) => match.toUpperCase())
                   .trim();
    },
    setRadioFieldValue: function (event: Event, fieldId: string): void {
      const target = event.target as HTMLInputElement;
      this.participant[fieldId] = target.value;
    }
  }
}
</script>

<template>
  <section>
    <h1>{{ $t('registration.pageTitle') }}</h1>
    <!-- <p>{{ $t('event.tba') }}</p> -->
    
    <form v-if="!formSubmitted" @submit="submitRegistration" method="post" id="registration-form">
      <p>{{ $t('registration.requiredFieldsText') }}</p>
      <div v-for="field in fields" class="field">
        <!-- Text input -->
        <div v-if="['text', 'email'].includes(field.type)"
             class="grid-container grid-2-3 grid-gap">
          <label :for="field.id" class="field-label">
            {{ $t(`registration.fields.${field.id}`) }}
            <span v-if="field.validations.required" class="red">*</span>
          </label>
          <div class="input-field-text">
            <input :type="field.type" 
                   :name="field.id"
                   :id="field.id"
                   v-model="participant[field.id]"
                   :required="field.validations.required"
                   class="input-field"
                   :class="{ 'input-field-invalid': invalidFields.includes(field.id) }">
          </div>
        </div>
        <!-- Radio input -->
        <div v-if="field.type === 'radio'"
             class="grid-container grid-2-3 grid-gap">
          <label class="field-label">
            {{ $t(`registration.fields.${field.id}`) }}
            <span v-if="field.validations.required" class="red">*</span>
          </label>
          <div class="flex-container flex-container-column">
            <div v-for="opt in field.options" class="input-field-selectable">
              <input :type="field.type" 
                     :name="field.id"
                     :id="opt"
                     :value="opt"
                     :checked="participant[field.id] == opt"
                     @input="setRadioFieldValue($event, field.id)"
                     :required="field.validations.required"
                     class="input-field-option-item">
              <label :for="opt" class="field-label field-option">{{ $t(`registration.fields.${opt}`) }}</label>
            </div>
          </div>
        </div>
        <!-- Checkbox input -->
        <div v-if="field.type === 'checkbox'"
             class="">
             <div class="input-field-selectable">
               <input :type="field.type" 
                      :name="field.id"
                      :id="field.id"
                      v-model="participant[field.id]"
                      :required="field.validations.required"
                      class="input-field-option-item">
               <label :for="field.id" class="field-label">
                 <span v-html="$t(`registration.fields.${field.id}`)"></span>
                 <span v-if="field.validations.required" class="red">*</span>
               </label>
             </div>
        </div>
        <div v-if="field.showInfoText" class="info-text">
          {{ $t(`registration.fields.${field.id}InfoText`) }}
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-small">{{ $t('registration.fields.submit') }}</button>
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
          <span>{{ toTitleCase(attribute as string) }}:</span> <span>{{ value }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
  #registration-form {
    width: 60%;
    margin: 0 auto;
  }

  .field {
    margin: 1.5rem 0;
  }

  .input-field {
    width: 100%;
    padding: 0.5rem;
  }

  .input-field-text {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .input-field-selectable {
    display: flex;
    gap: 0.5rem;
  }

  .red {
    color: red;
  }

  .grid-gap {
    gap: 2rem;
  }

  .info-text {
    font-size: smaller;
    margin-top: 0.5rem;
  }

  @media screen and (max-width: 1200px) {
    #registration-form {
      width: 70%;
    }
  }

  @media screen and (max-width: 1000px) {
    #registration-form {
      width: 80%;
    }
  }

  @media screen and (max-width: 850px) {
    #registration-form {
      width: 90%;
    }
  }

  @media screen and (max-width: 650px) {
    #registration-form {
      width: 100%;
    }

    .flex-container-column {
      align-items: flex-start;
    }
  }
</style>

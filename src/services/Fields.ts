import type Field from '../dtos/Field';

export const fields: Field[] = [
  {
    id: "firstName",
    type: "text",
    validations: {
      required: true
    }
  },
  {
    id: "lastName",
    type: "text",
    validations: {
      required: true
    }
  },
  {
    id: "email",
    type: "email",
    validations: {
      required: true
    }
  },
  {
    id: "country",
    type: "text",
    validations: {
      required: false
    }
  },
  {
    id: "partnerEmail",
    type: "email",
    validations: {
      required: false
    },
    showInfoText: true
  },
  {
    id: "role",
    type: "radio",
    options: ["leader", "follower"],
    validations: {
      required: true
    }
  },
  {
    id: "passType",
    type: "radio",
    options: ["full", "saturday", "party"],
    validations: {
      required: true
    }
  },
  {
    id: "subscribed",
    type: "checkbox",
    validations: {
      required: false
    }
  },
  {
    id: "termsAccepted",
    type: "checkbox",
    validations: {
      required: true
    }
  }
]
interface validations {
  required?: boolean;
}

export default interface Field {
  id: string;
  type: string;
  options?: string[];
  validations: validations;
  showInfoText?: boolean;
}
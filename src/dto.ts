export type RegistrationDTO = {
  id: number;
  country: string;
  first_name: string;
  last_name: string;
  level: string | null;
  paid_amount: number | null;
  paid_at: string | null;
  pass_type: string;
  price: number | null;
  received_at: string;
  role: string;
  status: string;
  submitted_email: string;
  wsdc_number: string | null;
};

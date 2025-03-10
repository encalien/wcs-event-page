export type AddOnOptionDTO = {
  key: string;
  type: string;
  choices?: string[];
  min?: number;
  max?: number;
};

export type AddOnDTO = {
  id: number;
  event: number;
  name: string;
  options: AddOnOptionDTO[];
  price: number;
  translate_key: string;
};

export type MerchItemDTO = {
  id: number;
  event: number;
  available_sizes: ("XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL")[];
  model: string;
  price: number;
  translate_key: string;
};

export type PassTypeDTO = {
  id: number;
  name: string;
  total_available_count: number;
  event: number;
};

export type RegistrationDTO = {
  id: number;
  add_ons: {
    add_on: AddOnDTO;
    status: number;
    total_price: number | null;
    options: Record<string, string>;
  }[];
  country: string;
  email: string;
  first_name: string;
  last_name: string;
  level: string | null;
  merch_items: MerchItemDTO[];
  paid_amount: number | null;
  paid_at: string | null;
  pass_type: PassTypeDTO;
  price: number | null;
  received_at: string;
  role: string;
  status: string;
  submitted_email: string;
  wsdc_number: string | null;
};

export type AddonSelectionDTO = {
  [key: number]: {
    added: boolean | null;
    options: Record<string, string>;
  };
};

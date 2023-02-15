export default class Participant {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  role: string;
  passType: string;
  partnerEmail: string;
  subscribed: boolean;
  termsAccepted: boolean;

  constructor(
    firstName?: string,
    lastName?: string,
    email?: string,
    country?: string,
    role?: string,
    passType?: string,
    partnerEmail?: string,
    subscribed?: boolean,
    termsAccepted?: boolean
  ) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.email = email || "";
    this.country = country || "";
    this.role = role || "";
    this.passType = passType || "";
    this.partnerEmail = partnerEmail || "";
    this.subscribed = !!subscribed;
    this.termsAccepted = !!termsAccepted;
  }
}

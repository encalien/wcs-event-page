export default class Alert {
  messageKey: string;
  type: string;

  constructor(
    messageKey?: string,
    type?: string,
  ) {
    this.messageKey = messageKey || "";
    this.type = type || "";
  }
}

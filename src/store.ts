import { reactive } from 'vue';
import Alert from './dtos/Alert';


export const store = reactive({
  alert: new Alert(),
  addAlert(alert: Alert): void {
    this.alert = alert;
  },
  clearAlert(): void {
    this.alert = new Alert();
  }
})

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import "primevue/resources/primevue.min.css";
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'
import router from "@/router";
import App from './App.vue'
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import SplitButton from "primevue/splitbutton";
import Card from "primevue/card";
import ScrollPanel from "primevue/scrollpanel";
import Password from "primevue/password";
import Message from "primevue/message";

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.component("Toolbar",Toolbar)
app.component("InputText", InputText)
app.component("Button",Button)
app.component("SplitButton",SplitButton)
app.component("Card",Card)
app.component("ScrollPanel", ScrollPanel)
app.component('Password', Password)
app.component('Message', Message)

app.mount('#app');

<script lang="ts">
import {defineComponent} from 'vue'
import UserService from "@/services/UserService";
import router from "@/router";
import { isLoggedInComputed  } from '@/router';
import { idComputed } from '@/router';

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      userService: new UserService(),
      wrongAccount: false,
      wrongPassword: null
    }
  },
  methods: {
    logIn(){
      this.userService.getByEmail(this.email).then((response:any) => {
        let pass = response.data;
        if (pass === null) {
          this.wrongAccount = true;
          this.wrongPassword = false;
          console.log(this.wrongAccount)
          return;
        }
        this.wrongAccount = false;
        if(this.password === pass.password){
          isLoggedInComputed.value = true;
          idComputed.value = pass._id
          console.log(idComputed.value)
          this.wrongPassword = false
          router.push('/top')
        }
        else this.wrongPassword = true;
      })
    }
  }
})
</script>

<template>
  <div class="header"></div>
  <div class="form">
    <h1>YOUR CLOTHES</h1>
    <div><InputText type="text" v-model="email" class="form-item" placeholder="Email"/></div>
    <div><InputText type="password" v-model="password" class="form-item" placeholder="Password"/></div>
    <Message v-if="wrongPassword"
        :pt="{
          wrapper: {
            style: {
              'padding': '5px'
            }
          }
        }"
        :closable="false" severity="error" class="errorMessage">Incorrect password</Message>
    <Message v-if="wrongAccount"
             :pt="{
          wrapper: {
            style: {
              'padding': '5px'
            }
          }
        }"
             :closable="false" severity="warn" class="errorMessage">This email is not registered</Message>
    <div><Button type="submit" label="Submit" class="form-item" @click="logIn()"/></div>
    <p>Don't you have an account? </p>
    <router-link to="/signup">
      <p>Sign up</p>
    </router-link>
  </div>

</template>

<style scoped>
.form {
  padding: 1% 40%;
  text-align:center;
  align-items: center;
  justify-content: center;
}
.form-item{
  margin: 10px 0;
  width:100%;
}

.header{
  width:100%;
  height: 100px;
}

@media screen and (max-width: 768px) {
  .form {
    padding: 1% 20%
  }
}
</style>
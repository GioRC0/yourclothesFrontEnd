<script lang="ts">
import {defineComponent} from 'vue'
import UserService from "@/services/User.service";
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
    }
  },
  methods: {
    logIn(){
      this.userService.getByEmail(this.email).then((response:any) => {
        console.log(response.data)
        let pass = response.data;
        console.log(pass)
        if(this.password === pass.password){
          isLoggedInComputed.value = true;
          idComputed.value = pass._id
          console.log(idComputed.value)
          router.push('/top')
        }
        else console.log('contrasela falsa')
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
</style>
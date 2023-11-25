<script lang="ts">
import {defineComponent} from 'vue'
import router from "@/router";
import UserService from "@/services/UserService";

export default defineComponent({
  name: "SignUpView",
  data(){
    return{
      email:"",
      password:"",
      firstName: "",
      lastName: "",
      imagenSeleccionada: null,
      formData: new FormData(),
      userService: new UserService()
    }
  },
  methods: {
    mostrarImagen(event) {
      const input = event.target;
      const file = input.files[0];
      this.photo = file;
      this.formData.append('photo', file);
      this.contentType = file.type;
      const reader = new FileReader();

      reader.onload = () => {
        this.imagenSeleccionada = reader.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },

    createUser(){
      this.formData.append('name', this.firstName + this.lastName);
      this.formData.append('email', this.email)
      this.formData.append('password', this.password);
      this.userService.create(this.formData).then((response) => {
        console.log(response.data);
      });
      router.push('/login')
    }
  }
})
</script>

<template>
  <div class="header"></div>
  <div class="form">
    <h1>YOUR CLOTHES</h1>
    <div><InputText type="text" v-model="email" class="form-item" placeholder="Email"/></div>
    <div><InputText type="text" v-model="firstName" class="form-item " placeholder="First Name"/></div>
    <div><InputText type="text" v-model="lastName" class="form-item" placeholder="Last Name"/></div>
    <div><InputText type="password" v-model="password" class="form-item" placeholder="Password"/></div>
    <InputText type="file" accept="image/*" @change="mostrarImagen" class="form-item"/>
    <br>
    <img v-if="imagenSeleccionada" :src="imagenSeleccionada" alt="Vista previa de la imagen" class="form-item">
    <p>Registering you accept our conditions, our Politics of privacy and our Politics of cookies</p>
    <div><Button type="submit" label="Register" class="form-item" @click="createUser()"/></div>
    <p>Already have an account? </p>
    <router-link to="/login">
      <p>Log in</p>
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
<script lang="ts">
import {defineComponent} from 'vue'
import ToolbarYC from "@/components/ToolbarYC.vue";
import PostsService from "@/services/PostsService";
import PostEntity from "@/entities/PostEntity"
import mongoose from 'mongoose';
export default defineComponent({
  name: "CreatePostView",
  components: {ToolbarYC},
  data(){
    return {
      photo: null,
      imagenSeleccionada:null,
      description: "",
      postService: new PostsService(),
      imageData: null,
      contentType: "",
      formData: new FormData()
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

    createPost(){
      let post = new PostEntity();
      post.author = 1;
      let authorCode = "6547cfad076725aa25dfd69b";
      post.description = this.description;
      this.formData.append('author', authorCode);
      this.formData.append('description', post.description);
      this.formData.append('comments', post.comments);
      this.postService.createPost(this.formData).then((response) => {
        console.log(response.data);
      });
    }
  }
})
</script>

<template>
  <ToolbarYC></ToolbarYC>
  <div class="header"></div>
  <div class="form">
    <h1>YOUR CLOTHES</h1>
    <InputText type="file" accept="image/*" @change="mostrarImagen" class="form-item"/>
    <br>
    <img v-if="imagenSeleccionada" :src="imagenSeleccionada" alt="Vista previa de la imagen" class="form-item"/>
    <InputText type="text" placeholder="Description" v-model="description" class="form-item"></InputText>
    <div><Button type="submit" label="Submit" class="form-item" @click="createPost()"/></div>


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
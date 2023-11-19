<script lang="ts">
import ToolbarYC from '@/components/ToolbarYC.vue';
import router from "@/router";
import PostsService from "@/services/Posts.service";
import UserService from "@/services/User.service";
import PostEntity from "@/entities/PostEntity"
import CommentEntity from "@/entities/CommentEntity"
import CommentService from "@/services/Comment.Service"
import { idComputed } from '@/router';
import {defineComponent} from 'vue'


export default defineComponent({
  name: "PostView",
  components: {ToolbarYC},
  data(){
    return{
      id: null,
      postService: new PostsService(),
      userService: new UserService(),
      commentService: new CommentService(),
      post: new PostEntity(),
      img: null,
      comments: [],
      allPosts:[],
      newMessage: "",
      author : null,
      formData: new FormData()
    }
  },
  mounted() {
    let authorId = idComputed.value.substring(1, idComputed.value.length - 1);
    this.userService.getById(authorId).then((response)=>{this.author = response.data});
    this.id = this.$route.params.id;
    this.postService.getById(this.id).then((response) => {
      let getPost = response.data;
      this.post._id = getPost._id;
      this.post.author = getPost.author;
      this.post.description = getPost.description;
      this.post.photo = getPost.photo;

      this.commentService.getById(this.post._id).then((response) => {
        let comments = response.data;
        for (let i in comments ) {
          let comment = new CommentEntity();
          comment.author = comments[i].author;
          comment.name = comments[i].name;
          comment.photo = comments[i].photo;
          comment.comment = comments[i].comment;
          comment.date = comments[i].date;
          this.post.comments.unshift(comment);
        }
      })
      //console.log(this.post);
    });
    this.postService.getAll().then((response)=>{
      this.allPosts = response.data;
    })
  },
  methods: {
    postComment() {
      if (this.newMessage == "") return;
      let authorId = idComputed.value.substring(1, idComputed.value.length - 1);
      this.userService.getById(authorId).then((response) => {

        console.log(this.author)

        let comment = new CommentEntity();
        comment.author = authorId;
        comment.name = this.author.name;
        comment.photo = this.author.photo;
        comment.comment = this.newMessage;
        comment.date = this.getTodayDate();
        comment.postId = this.post._id;
        this.post.comments.unshift(comment);



        let postId = this.post._id;

        //this.postService.PostAComment(postId,this.post ).then((response) => {console.log(response)});
        this.formData.append('author', comment.author);
        this.formData.append('name', comment.name);
        this.formData.append('photo', comment.photo);
        this.formData.append('comment', comment.comment);
        this.formData.append('date', comment.date);
        this.formData.append('postId', postId);

        this.commentService.create(this.formData).then((response) => {console.log(response.data)});
        this.newMessage = "";
      })
    },

    getTodayDate(): string {
      const fechaActual = new Date();
      const dia = fechaActual.getDate();
      const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que se suma 1
      const año = fechaActual.getFullYear();

      const fechaFormateada = `${dia}/${mes}/${año}`;
      return fechaFormateada;
    }
  }
})
</script>

<template>
  <ToolbarYC></ToolbarYC>
  <div class="header"></div>
  <div class="post">
    <div>
      <img alt="post image" :src=" 'http://localhost:5000/' + post.photo" class="post-img"/>
    </div>
    <div class="post-info-section">
      <ScrollPanel
          style="width: 500px; height: 500px; overflow-y: scroll"
                   :pt="{
                        wrapper: {
                            style: { 'border-right': '10px solid var(--surface-ground)' }
                        },
                        bary: 'hover:bg-primary-400 bg-primary-300 opacity-100'
                    }"
      >
        <h1 class="description-item">{{post.description}}</h1>
        <Card v-for="comment in post.comments" >
          <template #content>
            <p class="m-0">
              <div class="comment-container">
                <div>
                  <img :src="'http://localhost:5000/' + comment.photo" alt="photo user" class="user-photo"/>
                </div>
                <div class="comment-info">
                  <p><b>{{comment.name}}</b>&nbsp&nbsp{{comment.comment}}</p>
                  <p class="date">{{comment.date}}</p>
                </div>
              </div>
            </p>
          </template>
        </Card>
      </ScrollPanel>
      <div style="width: 500px; height: 100px;" class="comment-section">
        <InputText type="text" v-model="newMessage" class="form-item" placeholder="Add a commentary"/>
        <Button icon="pi pi-send" @click="postComment()"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post{
  display:flex;
  justify-content: center;
  align-items:center
}
.comment-container{
  display:flex;
}
.user-photo{
  width:40px;
  border-radius: 50px;
}
.post-img{
  height: 600px;
}
.p-card{
  border: none;
  box-shadow: none;

}

.p-card.p-component{
  height:100px;
}

.p-inputtext {
  border-radius : 20px;
}

.p-button {
  border-radius : 100px;
}

.form-item{
  width:400px;
  margin-right:20px;
}

.comment-section{
  border-top :1px solid #e0e0e0;
  padding-top:30px;
  padding-left:20px;
}

.description-item {
  padding-left: 30px;
}

.date{
  font-size: 12px;
}

.header {
  width:100%;
  height:60px;
}

.post-info-section{
  border :1px solid #e0e0e0;
}
</style>
<script>
import ToolbarYC from "@/components/ToolbarYC.vue";
import PostsService from "@/services/PostsService";
import router from "@/router";

export default {
  name: "TopView",
  components: {ToolbarYC},
  data(){
    return{
      postService: null,
      posts: []
    }
  },
  mounted(){
    this.postService = new PostsService();
    this.postService.getAll().then((response) => {
      this.posts = response.data;
      console.log(this.posts)
    })
  },
  methods: {
    goPostView(id){
      router.push({name: 'PostView', params: {id}});
    }
  }
}
</script>

<template>
<ToolbarYC>
</ToolbarYC>

  <div class="posts-container">
    <div v-for="post in posts" class="post">
      <img alt="user header" :src=" 'http://localhost:5000/' + post.photo" class="post-image"
      @click="goPostView(post._id)"
      />
    </div>
  </div>
</template>

<style scoped>
.posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  grid-auto-rows: minmax(100px, auto);
  padding: 1% 5%;
}

.post {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.post-image{
  width:100%;
  height: auto;
  border-radius: 15px;
}

.post-image:hover {
  filter: brightness(70%);
  cursor: pointer;
}
</style>
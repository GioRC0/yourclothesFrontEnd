import axios from "axios"

const http = axios.create({
    baseURL: "http://localhost:5000/api/",
})

class PostsService {
    getAll(){
        return http.get("posts");
    }

    getById(id){
        return http.get("posts/" + id);
    }

    PostAComment(id, data){
        return http.put(`posts/${id}`, data);
    }

    createPost(data){
        return http.post("posts", data);
    }
}

export default PostsService
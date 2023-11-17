import axios from "axios"

const http = axios.create({
    baseURL: "http://localhost:3000/",
})

class PostsService {
    getAll(){
        return http.get("posts");
    }

    getById(id){
        return http.get("posts/" + id);
    }
}

export default PostsService
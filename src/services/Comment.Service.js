import axios from "axios"

const http = axios.create({
    baseURL: "http://localhost:5000/api/",
})

class CommentService {
    getAll(){
        return http.get("posts");
    }

    getById(id){
        return http.get("commentsByPostId/" + id);
    }

    create(data){
        return http.post("comments", data);
    }
}

export default CommentService
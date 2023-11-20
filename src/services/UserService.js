import axios from "axios"

const http = axios.create({
    baseURL: "http://localhost:5000/api/",
})

class UserService {
    getAll(){
        return http.get("users");
    }

    getById(id){
        return http.get("users/" + id);
    }

    getByEmail(email){
        return http.get("usersByEmail/"+email);
    }

    create(data){
        return http.post("users", data);
    }
}

export default UserService
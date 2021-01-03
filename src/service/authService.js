// import axios dan buat variabel untuk url server
import axios from "axios";

const API_SERVER = "https://server-siakad.herokuapp.com/api/log/";

// const API_SERVER = "http://localhost:5000/api/"; 

// kita buat class AuthService

class AuthService {
    register(username, email, password) {
        return axios
            .post(API_SERVER + "register", { username, email, password })
    }
    login(username, password) {
        return axios
            .post(API_SERVER + "login", { username, password })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService();
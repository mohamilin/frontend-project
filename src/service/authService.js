// import axios dan buat variabel untuk url server
import axios from "axios";

const API_SERVER = "https://server-projects.herokuapp.com/api/";

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
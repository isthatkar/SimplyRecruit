import axios from "axios";

axios.defaults.baseURL = "https://localhost:7108/api/";

let refresh = false;

const cleanLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("roles");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
};

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      const body = JSON.stringify({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      try {
        const response = await axios.post("refresh-token", body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        if (response.status === 200) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;

          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          return axios(error.config);
        } else {
          cleanLocalStorage();
        }
      } catch {
        cleanLocalStorage();
        return error;
      } finally {
        refresh = false;
      }
      return error;
    }
  }
);

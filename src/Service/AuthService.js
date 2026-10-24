import axios from "axios";

export const login = async (data) => {
    return  await axios.post("https://billing-backend-9whb.onrender.com/api/v1.0/login", data, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}});
}
import axios from "axios";

const api= axios.create({
    baseURL:'https://api.skfurniture.store/',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const AxiosInst = axios.create({
    baseURL: BACKEND_URL,
});

export default AxiosInst;

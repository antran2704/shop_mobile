import axios from "axios";
import { IP_ENDPOINT } from "../../env";

const httpInstance = axios.create({baseURL: `${IP_ENDPOINT}/api/v1`});

export default httpInstance;
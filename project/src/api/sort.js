import axios from "axios";
import {
    urlAPI
} from "@/urlAPI.js";

export const sortCategoryArr = () => {
    return axios({
        method: "GET",
        url: urlAPI + "productCategories",
    })
}

export const sortMaterialsArr = () => {
    return axios({
        method: "GET",
        url: urlAPI + "materials",
    })
}

export const sortSeasonsArr = () => {
    return axios({
        method: "GET",
        url: urlAPI + "seasons",
    })
}
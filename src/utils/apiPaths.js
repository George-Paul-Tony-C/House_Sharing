export const BASE_URL = 'http://localhost:8080';

export const API_PATHS = {
    AUTH : {
        LOGIN : "api/auth/login",
        SIGNUP : "api/auth/signup",

        REGISTER : "/api/auth/register",
        GET_USER_INFO : "/api/auth/getUser",
    },

    USER : {
        LOGIN : "api/user/login",
        SIGNUP : "api/user/signup",
        GET_ALL_USER : "api/user/allUser",
        DELETE : (id) => `api/user/delete/${id}`
    },

    DASHBOARD : {
        GET_DATA : "/api/dashboard",
        HOUSE_DATA : "/api/houses",
        HOUSE_FILTER: "/api/houses/filter"
    },

    ROOM : {
        GET_ALL_DETAILS : "/api/rooms",
        GET_ROOM : (roomId) => `/api/rooms/${roomId}`,
    },

    INCOME : {
        ADD_INCOME : "/api/income/add",
        GET_ALL_INCOME : "/api/income/get",
        DELETE_INCOME : (incomeId) => `/api/income/${incomeId}`,
        DOWNLOAD_INCOME : "/api/income/downloadexcel",
    },
    
    EXPENSE : {
        ADD_EXPENSE : "/api/expense/add",
        GET_ALL_EXPENSE : "/api/expense/get",
        DELETE_EXPENSE : (expenseId) => `/api/expense/${expenseId}`,
        DOWNLOAD_EXPENSE : "/api/expense/downloadexcel",
    },
    IMAGE : {
        UPLOAD_IMAGE : "/api/auth/upload-image",
    },
}
export const BASE_URL = 'http://localhost:8080';

export const API_PATHS = {
    USER : {
        LOGIN : "api/user/login",
        SIGNUP : "api/user/signup",
        GET_ALL_USER : "api/user/allUser",
        DELETE : (id) => `api/user/delete/${id}`,
        GET_USER_HOUSES: 'api/user/:userId/houses',
        GET_USER : (id) => `api/user/${id}`
    },

    HOUSE : {
        ADD_HOUSE : "api/house/add",
        DELETE_HOUSE: (houseId) => `api/house/delete/${houseId}`,
        GET_ALL_HOUSES : "api/house/allhouses",
        GET_HOUSE_DETAILS : (houseId) => `api/house/${houseId}`,
        GET_ROOMS_FOR_HOUSE : (houseId) => `api/house/rooms/${houseId}`
    },

    IMAGE : {
        UPLOAD_IMAGE : "/api/auth/upload-image",
    },
}
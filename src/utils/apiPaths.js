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

    ROOM : {
        ADD_ROOM : "/api/room/add",
        GET_ROOM : (roomId) => `/api/room/${roomId}`
    },

    REVIEWS : {
        ADD_REVIEW : `/api/review/add`,
        ROOM_REVIEWS : (roomId) => `api/room/reviews/${roomId}`,
        HOUSE_REVIEWS : (houseId) => `/api/house/reviews/${houseId}`
    },

    BOOKING : {
        ADD_BOOKING : `/api/booking/add`,
        USER_BOOKINGS : (userId) => `/api/user/bookings/${userId}`,
        CANCEL_BOOKING : (bookingId) => `/api/booking/cancel/${bookingId}`,
        GET_ROOM_BOOKINGS : (roomId) => `/api/room/bookings/${roomId}`,
    },

    IMAGE : {
        UPLOAD_IMAGE : "/api/auth/upload-image",
    },
}
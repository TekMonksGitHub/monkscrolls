/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
const FRONTEND = "http://localhost:8080";
const BACKEND = "http://localhost:9090";
const APP_PATH = `${FRONTEND}/apps/monkscrolls`;

export const APP_CONSTANTS = {
    FRONTEND, BACKEND, APP_PATH,
    INDEX_THTML: APP_PATH+"/login.html",
    MAIN_THTML: APP_PATH+"/main.html",
    ADDNOTE_THTML: APP_PATH+"/addnote.html",
    VIEWNOTES_THTML: APP_PATH+"/viewnotes.html",
    LOGIN_THTML: APP_PATH+"/login.html",

    API_SAVE_NOTE: BACKEND+"/savenote",
    API_VIEW_NOTES: BACKEND+"/viewnotes",
    API_GET_NOTE: BACKEND+"/getnote",
    API_DELETE_NOTE: BACKEND+"/deletenote",

    SESSION_NOTE_ID: "com_monkshu_ts",

    LANG_ID: "com_monkshu_dairy_lang",

    // Login constants
    N_MIN_PASS_LENGTH: 8,
    NEEDS_LOGIN: true,
    SUPPORTS_REGISTRATION: true,
    API_LOGIN: BACKEND+"/login",
    API_REGISTER: BACKEND+"/register",
    BCRYPT_SALT: "$2a$10$VFyiln/PpFyZc.ABoi4ppf",
    USERID: "id"
}
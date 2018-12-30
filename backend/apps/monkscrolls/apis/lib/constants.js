/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: GPL2 - see enclosed LICENSE file.
 */

const path = require("path");

exports.NOTE_EXT = ".note.json";

/* Constants for the FS Login subsystem */
exports.SALT_PW = "$2a$10$VFyiln/PpFyZc.ABoi4ppf";
exports.USERS_DB_PATH = path.resolve(`${__dirname}/../../db/users`);
exports.USERS_FILE = path.resolve(`${__dirname}/../../db/users/users.json`);
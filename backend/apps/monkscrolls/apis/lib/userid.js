/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */
const bcrypt = require("bcryptjs");
const SALT_PW = require(`${__dirname}/constants.js`).SALT_PW;
const DB_ROOT = require(`${__dirname}/constants.js`).USERS_DB_PATH;

exports.getUserPath = async id => create_valid_hash_path(id);

async function create_valid_hash_path(data) {
	return new Promise((resolve, reject) => {
		bcrypt.hash(data, SALT_PW, (err, path_hash) => {
			
			if (err) {reject("BCRYPT internal error."); return;}
			
			// URL encoding removes characters which are illegal for paths, like "\" or "/" etc.
			let encoded_hash = encodeURIComponent(path_hash);

			// On Windows directory names can't end with the . character. So replace it with %2E
			// which is its URL encoded notation, if that's the case.
			if (encoded_hash.substr(-1) == '.')
				encoded_hash = encoded_hash.substring(0, encoded_hash.length - 1) + '%2E';
			
			resolve(`${DB_ROOT}/${encoded_hash}`);		
		});
	});
}
/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: GPL2 - see enclosed LICENSE file.
 */

const APP_CONSTANTS = require(`${__dirname}/lib/constants.js`);
const {promisify} = require("util");
const readdirAsync = promisify(require("fs").readdir);
const readFileAsync = promisify(require("fs").readFile);

exports.doService = doService;

async function doService(jsonReq) {
	if (!validateRequest(jsonReq)) return CONSTANTS.FALSE_RESULT;

	try {
		let resp = {"result":true};
		let dirToRead = await require(`${__dirname}/lib/userid.js`).getUserPath(jsonReq.id);
		let files = await readdirAsync(dirToRead);
		let notes = []; 
		for (const file of files) {
			if (file.endsWith(APP_CONSTANTS.NOTE_EXT)) {
				let data = await readFileAsync(`${dirToRead}/${file}`);
				notes.push(JSON.parse(data));
			}
		}
		resp["notes"] = notes;
		return resp;
	} catch (err) {
		LOG.error(`Can't read the notes directory or file: ${err}`);
		return CONSTANTS.FALSE_RESULT;
	}
}

let validateRequest = jsonReq => (jsonReq && jsonReq.id);


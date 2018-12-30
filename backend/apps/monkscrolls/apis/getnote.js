/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: GPL2 - see enclosed LICENSE file.
 */

const APP_CONSTANTS = require(__dirname + "/lib/constants.js");
const {promisify} = require("util");
const readfileAsync = promisify(require("fs").readFile);

exports.doService = doService;

async function doService(jsonReq) {
	let userdbPath = await require(`${__dirname}/lib/userid.js`).getUserPath(jsonReq.id);
	let filePath = userdbPath + "/" + jsonReq.ts + APP_CONSTANTS.NOTE_EXT;
	try {
		let data = await readfileAsync(filePath);
		return {"result":true, "data":JSON.parse(data)};
	} catch (err) { LOG.error(err); return CONSTANTS.FALSE_RESULT; }
}
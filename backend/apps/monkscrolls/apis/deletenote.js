/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: GPL2 - see enclosed LICENSE file.
 */

const APP_CONSTANTS = require(__dirname + "/lib/constants.js");
const {promisify} = require("util");
const unlinkAsync = promisify(require("fs").unlink);

exports.doService = doService;

async function doService(jsonReq) {
	let userdbPath = await require(`${__dirname}/lib/userid.js`).getUserPath(jsonReq.id);
	let filePath = userdbPath + "/" + jsonReq.ts + APP_CONSTANTS.NOTE_EXT;
	try {await unlinkAsync(filePath); return CONSTANTS.TRUE_RESULT;}
	catch (err) {return {"result":false, "reason":err}}
}

/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: GPL2 - see enclosed LICENSE file.
 */

const APP_CONSTANTS = require(__dirname + "/lib/constants.js");
const {promisify} = require("util");
const writefileAsync = promisify(require("fs").writeFile);

exports.doService = doService;

async function doService(jsonReq) {
	let noteJSON = JSON.stringify({"title":jsonReq.title, "note": jsonReq.note, "ts":jsonReq.ts});
	let userdbPath = await require(`${__dirname}/lib/userid.js`).getUserPath(jsonReq.id);
	let filePath = userdbPath + "/" + jsonReq.ts + APP_CONSTANTS.NOTE_EXT;

	try {
		await writefileAsync(filePath, noteJSON);
		return CONSTANTS.TRUE_RESULT;
	} catch (err) { LOG.error(err); return {"result":false, "reason":err}; }
}

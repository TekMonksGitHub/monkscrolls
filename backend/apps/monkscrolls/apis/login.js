/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */
const {promisify} = require("util");
const existsAsync = promisify(require("fs").exists);

exports.doService = async jsonReq => {
	if (!validateRequest(jsonReq)) return CONSTANTS.FALSE_RESULT;
	
	LOG.info("Got login request for ID: " + jsonReq.id);

	try{
		let dirToCheck = await require(`${__dirname}/lib/userid.js`).getUserPath(jsonReq.id);
		LOG.info(`Backend path: ${dirToCheck}`);

		let exists = await existsAsync(dirToCheck);

		LOG.info(`Login result: ${exists}`);
		return {result: exists};
	} catch (err) {
		LOG.error(`Login error: ${err}`); 
		return CONSTANTS.FALSE_RESULT
	}
}

let validateRequest = jsonReq => (jsonReq && jsonReq.id);

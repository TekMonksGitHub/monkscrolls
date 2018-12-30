/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */

const {promisify} = require("util");
const readFileAsync = promisify(require("fs").readFile);
const existsAsync = promisify(require("fs").exists);
const mkdirAsync = promisify(require("fs").mkdir);
const writeFileAsync = promisify(require("fs").writeFile);
const SERVICE_CONSTANTS = require(`${__dirname}/lib/constants.js`);

exports.doService = doService;

async function doService(jsonReq) {
	
	if (!validateRequest(jsonReq)) return CONSTANTS.FALSE_RESULT;
	
	LOG.info("Got register request for new ID: " + jsonReq.user);

	try {
		let data = await readFileAsync(SERVICE_CONSTANTS.USERS_FILE);
		if (!JSON.parse(data).map(s => s.toLowerCase()).includes(jsonReq.user.toLowerCase()))
			return await registerUser(jsonReq.id, jsonReq.user, JSON.parse(data));
		else {
			LOG.info("Registration result: ID already exists.");
			return(CONSTANTS.FALSE_RESULT);
		}
	} catch (err) {
		LOG.error("Couldn't read users file. Possible corruption or doesn't exist.");
		LOG.error("Error is: " + err);
		LOG.info("Registering anyway");
		return await registerUser(jsonReq.id, jsonReq.user, []);
	}
}

async function registerUser(id, user, users) {
	try {
		let dirToCheck = await require(`${__dirname}/lib/userid.js`).getUserPath(id);
		let exists = await existsAsync(dirToCheck);
		if (exists) {
			LOG.info("Registration result: ID already exists.");
			return CONSTANTS.FALSE_RESULT;
		} else {
			await mkdirAsync(dirToCheck);
			return await addUserToUsersDBAndRegister(user, users);
		}
	} catch (err) {
		LOG.error(`Registration result: Failed to create database, ${err}`);
		return CONSTANTS.FALSE_RESULT;
	}
}

async function addUserToUsersDBAndRegister(user, users) {
	users.push(user);

	try {
		await writeFileAsync(SERVICE_CONSTANTS.USERS_FILE, JSON.stringify(users));
		LOG.info("Registration result: Success.");
		return CONSTANTS.TRUE_RESULT;
	} catch (err) {
		LOG.error(`Registration result: Failed to create database, ${err}`);
		return CONSTANTS.FALSE_RESULT;
	}
}

function validateRequest(jsonReq) {
	if ((jsonReq == null) || (jsonReq.id == null) || (jsonReq.user == null)) {
		LOG.info("Invalid ID or hash.");
		return false;
	}
	return true;
}
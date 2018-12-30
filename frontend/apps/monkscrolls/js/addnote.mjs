/* 
 * Handler for addnode.thtml file. 
 *
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */

import {session} from "/framework/js/session.mjs";
import {router} from "/framework/js/router.mjs";
import {xhr} from "/framework/js/xhr.mjs";
import {i18n} from "/framework/js/i18n.mjs";
import {loginmanager} from "./loginmanager.mjs";

async function init() {
	if (session.get(APP_CONSTANTS.SESSION_NOTE_ID) == undefined) return;
	
	let req = {"ts":session.get(APP_CONSTANTS.SESSION_NOTE_ID)}; req[APP_CONSTANTS.USERID] = session.get(APP_CONSTANTS.USERID); 
	let resp = await xhr.rest(APP_CONSTANTS.API_GET_NOTE, "GET", req);
	if (resp.result) {
		await $$.importPlugin(`${APP_CONSTANTS.APP_PATH}/js/util.js`);
		$$.util.elID("title").value = resp.data.title;
		$$.util.elID("note").value = resp.data.note;
	}
}

function doNavAddMain() {
	session.remove(APP_CONSTANTS.SESSION_NOTE_ID);
	router.loadPage(APP_CONSTANTS.MAIN_THTML, session.get(APP_CONSTANTS.LANG_ID));
}

async function doSaveNote() {
	await $$.importPlugin(`${APP_CONSTANTS.APP_PATH}/js/util.js`);

	let req = {
		"title":$$.util.elID("title").value,
		"note":$$.util.elID("note").value,
		"ts":session.get(APP_CONSTANTS.SESSION_NOTE_ID) || new Date().getTime()
	};
	req[APP_CONSTANTS.USERID] = session.get(APP_CONSTANTS.USERID);
	session.set(APP_CONSTANTS.SESSION_NOTE_ID,req.ts);

	let resp = await xhr.rest(APP_CONSTANTS.API_SAVE_NOTE, "POST", req);

	if (resp.result) {$$.util.toast(await i18n.get("Saved", session.get(APP_CONSTANTS.LANG_ID)), "opensans", 2000)} 
	else { $$.util.toast(await i18n.get("NotSaved", session.get(APP_CONSTANTS.LANG_ID)), "opensans", 2000);}
}

function logout() {loginmanager.logout()}

export const addnote = {init, doNavAddMain, doSaveNote, logout}

//# sourceURL=addnote.js
/* 
 * Handler for viewnotes.thtml file. 
 *
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */

import {session} from "/framework/js/session.mjs";
import {router} from "/framework/js/router.mjs";
import {xhr} from "/framework/js/xhr.mjs";
import {loginmanager} from "./loginmanager.mjs";
import {i18n} from "/framework/js/i18n.mjs";

function viewNote(ts) {
	session.set(APP_CONSTANTS.SESSION_NOTE_ID,ts);
	router.loadPage(APP_CONSTANTS.ADDNOTE_THTML);
}

async function deleteNote(ts) {
	let req = {}; req[APP_CONSTANTS.USERID] = session.get(APP_CONSTANTS.USERID); req["ts"] = ts;
	let resp = await xhr.rest(APP_CONSTANTS.API_DELETE_NOTE, "POST", req);
	await $$.importPlugin(`${APP_CONSTANTS.APP_PATH}/js/util.js`);
	if (resp.result) {
		let parent = document.getElementById("listcontainer");
		let divToDel1 = document.getElementById(ts);
		let divToDel2 = document.getElementById(ts+"_padding");
		$$.util.fade(divToDel1, async _ => {
			parent.removeChild(divToDel1);
			divToDel2.style.display = "none";
			parent.removeChild(divToDel2);
			$$.util.toast(await i18n.get("Deleted", session.get(APP_CONSTANTS.LANG_ID)), "opensans", 2000);
		});
	} else $$.util.toast(await i18n.get("ErrorDeleting", session.get(APP_CONSTANTS.LANG_ID)), "opensans", 2000);
}

function doNavViewMain() {
	session.remove(APP_CONSTANTS.SESSION_NOTE_ID);
	router.loadPage(APP_CONSTANTS.MAIN_THTML);
}

function logout() {loginmanager.logout()}

export const viewnotes = {doNavViewMain, deleteNote, viewNote, logout}
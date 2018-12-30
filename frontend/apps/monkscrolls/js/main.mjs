/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */

import {session} from "/framework/js/session.mjs";
import {router} from "/framework/js/router.mjs";
import {xhr} from "/framework/js/xhr.mjs";
import {loginmanager} from "./loginmanager.mjs";

function doAddNote() {
	session.remove(APP_CONSTANTS.SESSION_NOTE_ID);	// we are starting a new note
	router.loadPage(APP_CONSTANTS.ADDNOTE_THTML);
}

async function doViewNotes() {
	let req = {}; req[APP_CONSTANTS.USERID] = session.get(APP_CONSTANTS.USERID);
	let resp = await xhr.rest(APP_CONSTANTS.API_VIEW_NOTES, "GET", req);
	if (!resp.result) resp.notes = [];
	resp = addHumanDates(resp);
	router.loadPage(APP_CONSTANTS.VIEWNOTES_THTML, resp);
}

function addHumanDates(resp) {
	resp.notes.forEach(note => {
		let date = new Date(note.ts);
		note[date] = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
	});
	
	return resp;
}

function logout() {
	loginmanager.logout();
}

export const main = {doAddNote, doViewNotes, logout}
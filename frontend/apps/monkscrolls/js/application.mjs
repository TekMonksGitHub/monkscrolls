/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
 
import {router} from "/framework/js/router.mjs";
import {i18n} from "/framework/js/i18n.mjs";
import {session} from "/framework/js/session.mjs";

const init = async _ => {
	window.APP_CONSTANTS = (await import ("./constants.mjs")).APP_CONSTANTS;
	window.LOG = (await import ("/framework/js/log.mjs")).LOG;
}

const main = async _ => {
	// set language, default to English
	if (!session.get(APP_CONSTANTS.LANG_ID)) session.set(APP_CONSTANTS.LANG_ID, "en");

	// set Title
	i18n.get("Title", session.get(APP_CONSTANTS.LANG_ID)).then(title => document.title = title).catch(err => document.title = err);
	
	// add in 3rd party CSS and JS
	let ThirdPartyLibs = await $$.requireJSON(`${APP_CONSTANTS.APP_PATH}/conf/3rdPartyLibs.json`);
	let ThirdPartyCSSJSPromises = []; 
	ThirdPartyLibs.css.forEach(css => ThirdPartyCSSJSPromises.push($$.requireCSS(`${APP_CONSTANTS.APP_PATH}/${css}`))); 
	ThirdPartyLibs.js.forEach(js => ThirdPartyCSSJSPromises.push($$.require(`${APP_CONSTANTS.APP_PATH}/${js}`)));
	await Promise.all(ThirdPartyCSSJSPromises);
	
	if (session.get(APP_CONSTANTS.USERID))
		router.reload();	// session exists - just reload
	else
		router.loadPage(APP_CONSTANTS.INDEX_THTML, session.get(APP_CONSTANTS.LANG_ID));
}

export const application = {init, main};
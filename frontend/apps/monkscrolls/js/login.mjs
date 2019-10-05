/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import {loginmanager} from "./loginmanager.mjs";
import {session} from "/framework/js/session.mjs";
import {router} from "/framework/js/router.mjs";

function signinIfEnterPressed(e) {if (e.keyCode == 13) signin()}
function registerIfEnterPressed(e) {if (e.keyCode == 13) register()}

async function signin() {
	registerClickHandlers();
	session.set("org_monkshu_login_signInOrRegisterClicked", true);
	
	await $$.importPlugin(`${APP_CONSTANTS.APP_PATH}/js/util.js`);
	let id = $$.util.elID("userid").value;
	let pass = $$.util.elID("pass").value;
		
	handleLoginResult(await loginmanager.signin(id, pass));
}

async function register() {
	registerClickHandlers();
	session.set("org_monkshu_login_signInOrRegisterClicked", true);
	
	await $$.importPlugin(`${APP_CONSTANTS.APP_PATH}/js/util.js`);
	let regpass = $$.util.elID("regpass").value;
	if (regpass.length < APP_CONSTANTS.MIN_PASS_LENGTH) handleRegistrationResult(false,true);
	else handleRegistrationResult(await loginmanager.register($$.util.elID("regid").value, regpass));
}

function changeLanguage(lang) {
	session.set($$.MONKSHU_CONSTANTS.LANG_ID, lang);
	router.reload(); 
}

function handleLoginResult(result) {
	if (result) {
		deregisterClickHandlers();
		router.loadPage(APP_CONSTANTS.MAIN_THTML);
	} else {
		$$.util.elID("divsigninerror").style.visibility = "visible";

		$$.util.elID("userid").className = "errorbox";
		$$.util.elID("pass").className = "errorbox";
	}
}

function handleRegistrationResult(result, passtooshort) {
	if (result) {
		deregisterClickHandlers();
		router.loadPage(APP_CONSTANTS.MAIN_THTML);
	} else {
		if (passtooshort) {
			$$.util.elID("registererror_pass").style.visibility = "visible";
			$$.util.elID("regpass").className = "errorbox";
		} else {
			$$.util.elID("registererror_id").style.visibility = "visible";
			$$.util.elID("regid").className = "errorbox";
		}		
	}
}

function hide_error() {
	let elem = document.querySelectorAll('.errorbox');
	if (elem !== undefined) for (var i = 0; i < elem.length; i++) elem[i].className = "inputbox";

	elem = document.querySelectorAll("[style*='visibility: visible;']");
	if (elem !== undefined) for (let i = 0; i < elem.length; i++) elem[i].style.visibility = 'hidden';
}

function clickHandler() {
	if (!session.get("org_monkshu_login_signInOrRegisterClicked")) hide_error();
	else session.set("org_monkshu_login_signInOrRegisterClicked", false);
}

function registerClickHandlers() {
	document.addEventListener("click", clickHandler);
	document.addEventListener("keydown", clickHandler);
}

function deregisterClickHandlers() {
	document.removeEventListener("click", clickHandler);
	document.removeEventListener("keydown", clickHandler);
}

export const login = {signin, register, signinIfEnterPressed, registerIfEnterPressed, changeLanguage}
/*
    liblock: libre site blocker to block distracting websites
    Copyright (C) 2021-present bkf2020

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, ONLY version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
function blockEverything() {
    chrome.declarativeNetRequest.updateDynamicRules({"removeRuleIds": [10000]});
    chrome.declarativeNetRequest.updateDynamicRules({"addRules":
        [{
            "id": 10000,
            "priority": 1,
            "action": { "type": "block" },
            "condition": {
                "urlFilter": '*',
                "resourceTypes": [
                    "main_frame",
                    "sub_frame"
                ]
            }
        }]
    });
    var acceptedTabIds = [];
    chrome.tabs.query({"url" : "*://*/*"}).then(function(result) {
		for(var i = 0; i < result.length; i++) {
			var tabId = result[i].id;
			console.log(acceptedTabIds.includes(tabId));
			if(!acceptedTabIds.includes(tabId)) {
				chrome.tabs.remove(tabId);
			}
		}
	});
}
chrome.runtime.onInstalled.addListener(function(details){
    blockEverything();
});
chrome.alarms.onAlarm.addListener(function() {
	chrome.storage.sync.set({blocking: false});
	chrome.tabs.query({"url" : ["chrome-extension://*/setrules.html"]}).then(function(result) {
		for(var i = 0; i < result.length; i++) {
			var tab = result[i];
			chrome.tabs.reload(tab.id);
		}
	});
	// delete all dynamic rules in browser
	chrome.storage.sync.get(['userRules'], function(result) {
		if(result.userRules === undefined) return false;
		var rules_id = [];
		for(var i = 1; i <= result.userRules.length; i++) {
			rules_id.push(i);
		}
		chrome.declarativeNetRequest.updateDynamicRules({"removeRuleIds": rules_id});
		return true;
	});
	// notification that the block session is over
	chrome.notifications.create({
		"iconUrl": "/icon.jpg",
		"message": "browerfocus has finished whitelisting websites! If you want, start a new whitelisting session.",
		"title": "browerfocus",
		"type": "basic"
	});
    blockEverything();
});

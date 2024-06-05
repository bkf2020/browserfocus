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

function openOptions() {
	chrome.runtime.openOptionsPage();
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('optionsButton')
		.addEventListener('click', openOptions);
});

chrome.storage.sync.get(['blocking'], function(result) {
	if(result.blocking) {
		document.getElementById("optionsButton").innerText = "view websites you are blocking and time left";
	} else {
		document.getElementById("optionsButton").innerText = "change blocked websites and start blocking";
	}
});
chrome.storage.sync.get(['taskName'], function(result) {
	if (result.taskName !== undefined) {
		document.getElementById("task-name").innerText = "Your task: " + result.taskName;
	}
});
chrome.storage.sync.get(['time'], function(result) {
    if (result.time !== undefined) {
        document.getElementById("blockTime").innerText = "You are blocking until " + result.time + " (24 hour time)";
        var today = new Date();
        var timeInfo = result.time.split(":"); 
        var hours =	timeInfo[0];
        var minutes = timeInfo[1];
        var end = today.setHours(hours, minutes, 0, 0);
        document.getElementsByClassName("timer")[0].setAttribute("time-end", end);
    }
});

function updateTimers() {
    var timers = document.getElementsByClassName("timer");
    for (var i = 0; i < timers.length; i++) {
        var endTime = timers[i].getAttribute('time-end');
        var millisecondsLeft = endTime - Date.now();
        if(millisecondsLeft >= 1000) {
            var totSeconds = Math.floor(millisecondsLeft / 1000);
            var seconds = totSeconds % 60;
            totSeconds -= totSeconds % 60;
            totSeconds /= 60;
            
            var minutes = totSeconds % 60;
            totSeconds -= totSeconds % 60;
            totSeconds /= 60;

            var hours = totSeconds;

            timers[i].querySelector('.hour').innerText = hours + "h";
            timers[i].querySelector('.min').innerText = minutes + "m";
            timers[i].querySelector('.sec').innerText = seconds + "s";
        } else {
            timers[i].querySelector('.hour').innerText = "0h";
            timers[i].querySelector('.min').innerText = "0m";
            timers[i].querySelector('.sec').innerText = "0s";
        }
    }
    setTimeout(updateTimers, 100);
}
updateTimers();
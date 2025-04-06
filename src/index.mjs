(function () {
  let hour = document.querySelector(".Hour");
  let min = document.querySelector(".Minute");
  let sec = document.querySelector(".Second");

  let startBtn = document.querySelector(".start");
  let stopBtn = document.querySelector(".stop");
  let resetBtn = document.querySelector(".reset");

  let timerId = null;
  function stopInterval() {
    startBtn.style.display = "initial";
    stopBtn.style.display = "none";
    clearInterval(timerId);
  }
  startBtn.addEventListener("click", () => {
    if (hour.value == 0 && min.value == 0 && sec.value == 0) return;
    function startInerval() {
      startBtn.style.display = "none";
      stopBtn.style.display = "initial";
      timerId = setInterval(() => {
        timer();
      }, 1000);
    }
    startInerval();

    function timer() {
      if (sec.value > 60) {
        min.value += 1;
        sec.value = parseInt(sec.value) - 59;
      }
      if (min.value > 60) {
        hour.value += 1;
        min.value = parseInt(min.value) - 59;
      }

      if (hour.value == 0 && min.value == 0 && sec.value == 0) {
        hour.value == "";
        min.value == "";
        sec.value == "";
        stopInterval();
      } else if (sec.value != 0) {
        sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value - 1}`;
      } else if (min.value != 0 && sec.value == 0) {
        sec.value = 59;
        min.value = `${min.value <= 10 ? "0" : ""}${min.value - 1}`;
      } else if (hour.value != 0 && min.value == 0) {
        min.value = 59;
        hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
      }
    }
  });
  stopBtn.addEventListener("click", () => {
    stopInterval();
  });
  resetBtn.addEventListener("click", () => {
    stopInterval();
    sec.value = "";
    min.value = "";
    hour.value = "";
  });
})();

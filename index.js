const currCounter = document.querySelector("#number");
const incrementBtn = document.querySelector(".increment-btn");
const textToListen = document.querySelector("#text-to-listen");
const listenBtn = document.querySelector("#listen-btn");
const stopListeningBtn = document.querySelector("#stop-listening-btn");

currCounter.value = 1;

const handleIncrementClick = () => {
  currCounter.innerHTML = currCounter.value++;
  currCounter.classList.add("animate");
  setTimeout(() => {
    currCounter.classList.remove("animate");
  }, 1000);
}

incrementBtn.addEventListener("click", handleIncrementClick);

const handleListenClick = (e) => {
  e.preventDefault();
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "pt-PT";

  const handleRecognition = (e) => {
    const transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join("");
    if (e.results[0].isFinal) {
      console.log(transcript);
      if (transcript.toLowerCase().includes(textToListen.value.toLowerCase().trim())) {
        let pos = transcript.indexOf(textToListen.value.toLowerCase().trim());

        while (pos !== -1) {
          pos = transcript.indexOf(textToListen.value.toLowerCase().trim(), (pos + 1));
          handleIncrementClick();
        }
      }
    }
  };

  recognition.addEventListener("result", handleRecognition);
  recognition.start();

  stopListeningBtn.addEventListener("click", () => {
    recognition.stop();
  });
}

listenBtn.addEventListener("click", handleListenClick);

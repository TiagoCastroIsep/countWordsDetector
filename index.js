const currCounter = document.querySelector("#number");
const incrementBtn = document.querySelector(".increment-btn");
const textToListen = document.querySelector('#text-to-listen');
const listenBtn = document.querySelector('#listen-btn');

currCounter.value = 1;

const handleIncrementClick = () => {
  currCounter.innerHTML = currCounter.value++;
  currCounter.classList.add('animate');
  setTimeout(() => {
    currCounter.classList.remove('animate');
  }, 1000);
}

incrementBtn.addEventListener("click", handleIncrementClick);

const handleListenClick = (e) => {
  e.preventDefault();
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = false;
  recognition.lang = "pt-PT";

  const handleRecognition = (e) => {
    const transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join("");
    if (e.results[0].isFinal) {
      console.log(transcript);
      if (transcript.includes(textToListen.value.trim())) currCounter.innerHTML = currCounter.value++;
    }
  };

  recognition.addEventListener("result", handleRecognition);
  recognition.start();
}

listenBtn.addEventListener("click", handleListenClick);

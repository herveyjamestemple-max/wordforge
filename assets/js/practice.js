(function () {
  "use strict";

  var words = [
    { word: "curious", part: "adjective", meaning: "Eager to learn or know about something.", example: "Mara was curious about the new word in her book." },
    { word: "notice", part: "verb", meaning: "To see or become aware of something.", example: "Did you notice how the meaning changed in that sentence?" },
    { word: "steady", part: "adjective", meaning: "Regular and even, without sudden changes.", example: "A steady pace gave him time to understand each line." },
    { word: "gather", part: "verb", meaning: "To bring things together or collect them.", example: "She likes to gather new words in her notebook." },
    { word: "bright", part: "adjective", meaning: "Full of light, or quick to learn and understand.", example: "His bright idea helped the group solve the puzzle." },
    { word: "journey", part: "noun", meaning: "The act of travelling from one place to another; also, a process of change or learning.", example: "Learning a language is a journey made one step at a time." },
    { word: "describe", part: "verb", meaning: "To say or write what someone or something is like.", example: "Can you describe the scene using three new words?" },
    { word: "discover", part: "verb", meaning: "To find something or learn something for the first time.", example: "We discover useful words when we read carefully." }
  ];

  var currentIndex = 0;
  var knownWords = new Set();
  var wordNumber = document.querySelector("[data-word-number]");
  var partOfSpeech = document.querySelector("[data-part-of-speech]");
  var wordHeading = document.querySelector("[data-word]");
  var prompt = document.querySelector("[data-prompt]");
  var answer = document.querySelector("[data-answer]");
  var definition = document.querySelector("[data-definition]");
  var example = document.querySelector("[data-example]");
  var revealButton = document.querySelector("[data-reveal]");
  var knowButton = document.querySelector("[data-know]");
  var nextButton = document.querySelector("[data-next]");
  var restartButton = document.querySelector("[data-restart]");
  var knownCount = document.querySelector("[data-known-count]");
  var totalCount = document.querySelector("[data-total-count]");
  var progress = document.querySelector("[data-progress]");
  var progressBar = document.querySelector('[role="progressbar"]');

  function updateProgress() {
    knownCount.textContent = String(knownWords.size);
    progress.style.width = (knownWords.size / words.length * 100) + "%";
    progressBar.setAttribute("aria-valuemax", String(words.length));
    progressBar.setAttribute("aria-valuenow", String(knownWords.size));
  }

  function render() {
    var entry = words[currentIndex];
    var isKnown = knownWords.has(entry.word);
    wordNumber.textContent = "WORD " + String(currentIndex + 1).padStart(2, "0");
    partOfSpeech.textContent = entry.part;
    wordHeading.textContent = entry.word;
    definition.textContent = entry.meaning;
    example.textContent = entry.example;
    answer.hidden = true;
    prompt.hidden = false;
    revealButton.textContent = "Show meaning";
    revealButton.classList.remove("is-known");
    revealButton.setAttribute("aria-pressed", "false");
    knowButton.disabled = isKnown;
    knowButton.textContent = isKnown ? "Marked known" : "I know this word";
    totalCount.textContent = String(words.length);
    updateProgress();
  }

  revealButton.addEventListener("click", function () {
    var isVisible = !answer.hidden;
    answer.hidden = isVisible;
    prompt.hidden = !isVisible;
    revealButton.textContent = isVisible ? "Show meaning" : "Hide meaning";
    revealButton.setAttribute("aria-pressed", String(!isVisible));
  });

  knowButton.addEventListener("click", function () {
    knownWords.add(words[currentIndex].word);
    knowButton.disabled = true;
    knowButton.textContent = "Marked known";
    updateProgress();
  });

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % words.length;
    render();
  });

  restartButton.addEventListener("click", function () {
    currentIndex = 0;
    knownWords.clear();
    render();
    revealButton.focus();
  });

  render();
})();

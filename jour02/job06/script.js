let konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let userInput = [];
document.addEventListener("keydown", function (event) {
  if (
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key.toLowerCase() === "b" ||
    event.key.toLowerCase() === "a"
  ) {
    userInput.push(event.key);
    if (userInput.length > konamiCode.length) {
      userInput.shift();
    } 
    if (userInput.toString() === konamiCode.toString()) {
      alert("Konami Code Activated!");
      document.body.style.backgroundColor = "blue";
    }
  }
});
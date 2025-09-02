const button = document.getElementById("greetBtn");
const message = document.getElementById("message");

button.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/greet");
    const data = await response.json();
    message.textContent = data.message;
  } catch (error) {
    message.textContent = "Error fetching message!";
  }
});

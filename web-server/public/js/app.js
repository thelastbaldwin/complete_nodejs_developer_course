console.log("client side js loaded!");

const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

formEl.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = inputEl.value;

    if (inputVal){
        messageOne.textContent = "Fetching weather data...";
        messageTwo.textContent = "";

        fetch(`/weather?address=${inputVal}`).then(response => {
            response.json().then(data => {
                const {
                    error,
                    location,
                    forecast
                } = data;

                if (error){
                   messageOne.textContent = error;
                } else {
                    messageOne.textContent = location;
                    messageTwo.textContent = forecast;
                }
            });
        });
    }
});



let form = document.querySelector("form");
let inputField;
let guess;
let numBtns = document.querySelectorAll(".num-btn");
let randNum;


async function getRandNum() {
    const response = await axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=4&base=10&format=plain&rnd=new")
    randNum = response.data;
}




form.addEventListener("submit", (event) => {
    event.preventDefault();
    inputField = document.getElementById("user-guess");

    inputField.addEvent

    guess = inputField.value;
    console.log(guess);
    inputField = "";

})
let count=0;
const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

btns.forEach(function(btn){
     btn.addEventListener("click", function(e){
        const sytles = e.currentTarget.classList;
        if(sytles.contains("decrease"))  value.textContent--;
        else if(sytles.contains("increase")) value.textContent++;
        else if(sytles.contains("reset")) value.textContent = 0;
        else;
     });
})
const div = document.querySelector("#Click")



div.addEventListener("mouseup", e => {
    div.style.width="300px"
    div.style.height= "35px";
    div.style.fontSize="25px"
})


div.addEventListener("mouseover", e => {
    div.style.backgroundColor = "white";
})

div.addEventListener("mouseleave", e => {
    div.style.backgroundColor = "rgb(79, 209, 79)";
})
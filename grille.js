export function grilleContainer(rows,cols,container){
    //Clean the workshop first
    while (container.firstChild) { container.removeChild(container.firstChild); }

    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (let c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div")
      container.appendChild(cell).id = "grid-item"+c;
      cell.textContent=c
    };
   
}
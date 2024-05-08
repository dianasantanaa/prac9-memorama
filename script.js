let iconos; //colocamos las variables correspondientes 
let selectors = [];
//ayuda a generar el tablero
generarTablero();
//creamos un arreglo de las imagenes que colocaremos
function cargarIconos() {
  iconos = [
    `<img src="imgs/1.avif">`,
    `<img src="imgs/2.webp">`,
    `<img src="imgs/8.avif">`,
    `<img src="imgs/7.jpg">`,
    `<img src="imgs/6.jpg">`,
    `<img src="imgs/3.webp">`,
  ];
}
//genera el tablero con los iconos es decir con las imagenes asignadas
function generarTablero() {
  cargarIconos();
//declaramos una variable para hacer el tablero
  let tablero = document.getElementById("tablero");
//declaramos otra variable para las tarjetas
  let tarjetas = [];
  let len = iconos.length * 2;
  for (let i = 0; i < len; i++) {
    tarjetas.push(`
        <div class="card-area" onclick="cardSelector(${i})">
            <div class="card" id="card${i}">
                <div class="face front" id="back${i}">
                ${iconos[0]}
                </div>
                <div class="face back"><img src="imgs/signo1.jpg"></div>
            </div>
        </div>
      `);
    if (i % 2 == 1) {
      iconos.splice(0, 1);
    }//indica que se tiene que voltear 2 cartas  para verificar 
  }
  tarjetas.sort(() => Math.random() - 0.5);//se acomodan de forma desordenada para encontrar los pares
  tablero.innerHTML = tarjetas.join("");
}
//comenzamos a darle la funcion de rotar a las cartas
function cardSelector(i) {
  let card = document.getElementById("card" + i);
  if (card.style.transform != "rotateY(180deg)") {
    card.style.transform = "rotateY(180deg)";
    selectors.push(i);
  }//tienen que ser solo 2 cartas las que puedes voltear
  if (selectors.length == 2) {
    desSelectors(selectors);
    selectors = [];
  }
}
//comenzamos a decir si son pares se quedan iguales
function desSelectors(selectors) {
  setTimeout(() => {
    let back1 = document.getElementById("back" + selectors[0]);
    let back2 = document.getElementById("back" + selectors[1]);
//si son impares se vuelven a voltera
    if (back1.innerHTML != back2.innerHTML) {
      let c1 = document.getElementById("card" + selectors[0]);
      let c2 = document.getElementById("card" + selectors[1]);
      c1.style.transform = "rotateY(0deg)";
      c2.style.transform = "rotateY(0deg)";
    } else {//si son pares se ponen transparentes
      back1.style.opacity = 0.1;
      back2.style.opacity = 0.1;
    }
  }, 1000);
}
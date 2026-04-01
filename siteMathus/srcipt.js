const cria = document.getElementById("pet");

const estados = {
    normal: "b_vivo.png",
    puto: "b_raiva.png",
    morto: "b_morto.png",
    comendo: "b_comendo.png",
    alimentado: "b_gordo.png",
    musica: "b_rock.png",
    malhar: "b_malhando.png",
    vestir: "b_over.png",
};

let contador = 0;
let intervalo = null;
let time_click = null;
let intervalo2 = null;

function controlador() {
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        contador++;

        console.log("tempo:", contador);

        if (contador === 10) {
            cria.src = "./imgs/" + estados.puto;
        }

        if (contador === 20) {
            cria.src = "./imgs/" + estados.morto;
        }
    }, 1000);
}

function alimentar() {
    cria.src = "./imgs/" + estados.comendo;
    contador = 0;

    if (time_click) clearTimeout(time_click);

    time_click = setTimeout(() => {
        cria.src = "./imgs/" + estados.alimentado;

        setTimeout(() => {
            cria.src = "./imgs/" + estados.normal;
        }, 2000);

    }, 1000);
}

let fundoAtual = "ceu";

function trocarFundo() {
    document.body.classList.toggle("inferno");
}
function tocarMusica() {
    const musica = document.getElementById("musica");
    musica.play();
    cria.src = "./imgs/" + estados.musica;
}
function malhar() {

   cria.src = "./imgs/" + estados.malhar;
}
function vestir() {

   cria.src = "./imgs/" + estados.vestir;
}

controlador();
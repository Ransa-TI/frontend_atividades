const cpf = document.getElementById("cpf");
const resultado = document.querySelector(".resposta");
const form = document.getElementById("formCPF");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    validar();
});

function validar() {
    const valor = cpf.value.replace(/\D/g, "");
    let soma = 0;

    if (valor.length !== 11 || /^(\d)\1+$/.test(valor)) {
        mostrar(false);
        return;
    }

    for (let i = 0; i < 9; i++) {
        soma += parseInt(valor[i]) * (10 - i);
    }

    let primeiro = (soma * 10) % 11;
    if (primeiro === 10) primeiro = 0;

    if (primeiro !== parseInt(valor[9])) {
        mostrar(false);
        return;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(valor[i]) * (11 - i);
    }

    let segundo = (soma * 10) % 11;
    if (segundo === 10) segundo = 0;

    if (segundo !== parseInt(valor[10])) {
        mostrar(false);
    } else {
        mostrar(true);
    }
}

function mostrar(valido) {
    if (valido) {
        resultado.textContent = "CPF VÁLIDO";
        resultado.style.color = "green";
    } else {
        resultado.textContent = "CPF INVÁLIDO";
        resultado.style.color = "red";
    }
}
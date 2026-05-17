const btnSimular = document.getElementById("btnSimular");
const btnLimpar = document.getElementById("btnLimpar");
const containerResultado = document.getElementById("resultado");

btnSimular.addEventListener("click", () => {
    const valorVendaInput = document.getElementById("valorVenda").value;
    const bandeira = document.getElementById("bandeira").value;
    const parcelasInput = document.getElementById("parcelas").value;

    if (valorVendaInput === "" || bandeira === "" || parcelasInput === "") {
        alert("Por favor, preencha todos os campos do formulário.");
        return;
    }

    const valorVenda = parseFloat(valorVendaInput);
    const qtdParcelas = parseInt(parcelasInput);

    if (valorVenda <= 0 || qtdParcelas <= 0) {
        alert("Insira valores válidos maiores que zero.");
        return;
    }

    let porcentagemTaxaBandeira = 0;

    switch (bandeira) {
        case "visa":
            porcentagemTaxaBandeira = 0.02;
            break;
        case "master":
            porcentagemTaxaBandeira = 0.0185;
            break;
        case "elo":
            porcentagemTaxaBandeira = 0.03;
            break;
        default:
            porcentagemTaxaBandeira = 0;
    }

    const valorTaxaBandeira = valorVenda * porcentagemTaxaBandeira;

    const valorJurosTotais = valorVenda * (0.015 * qtdParcelas);

    const valorTaxaMensalFixaTotal = 12.50 * qtdParcelas;

    const valorTotalGeral = valorVenda + valorTaxaBandeira + valorJurosTotais + valorTaxaMensalFixaTotal;

    const valorCadaParcela = valorTotalGeral / qtdParcelas;

    document.getElementById("resTaxa").textContent = `R$ ${valorTaxaBandeira.toFixed(2)}`;
    document.getElementById("resJuros").textContent = `R$ ${valorJurosTotais.toFixed(2)}`;
    document.getElementById("resTaxaFixa").textContent = `R$ ${valorTaxaMensalFixaTotal.toFixed(2)}`;
    document.getElementById("resParcela").textContent = `R$ ${valorCadaParcela.toFixed(2)}`;
    document.getElementById("resTotal").textContent = `R$ ${valorTotalGeral.toFixed(2)}`;

    containerResultado.classList.remove("id-escondido");
});

btnLimpar.addEventListener("click", () => {
    document.getElementById("formSimulador").reset();
    containerResultado.classList.add("id-escondido");
});
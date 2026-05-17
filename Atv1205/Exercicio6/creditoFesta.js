const btnCalcular = document.getElementById("btnCalcular");
const btnLimpar = document.getElementById("btnLimpar");
const containerResultado = document.getElementById("resultado");

btnCalcular.addEventListener("click", () => {
    const pacoteSelecionado = document.getElementById("pacote").value;
    const qtdPessoasInput = document.getElementById("quantidade").value;

    if (pacoteSelecionado === "" || qtdPessoasInput === "") {
        alert("Por favor, selecione um pacote e informe a quantidade de pessoas.");
        return;
    }

    const qtdPessoas = parseInt(qtdPessoasInput);
    if (qtdPessoas <= 0) {
        alert("A quantidade de pessoas deve ser maior que zero.");
        return;
    }

    let valorPorPessoa = 0;

    switch (pacoteSelecionado) {
        case "standard":
            valorPorPessoa = 50.00;
            break;
        case "premium":
            valorPorPessoa = 80.00;
            break;
        case "deluxe":
            valorPorPessoa = 120.00;
            break;
        default:
            valorPorPessoa = 0;
    }

    const custoBruto = valorPorPessoa * qtdPessoas;
    const taxaServico = custoBruto * 0.10;
    const subtotalComTaxa = custoBruto + taxaServico;
    let valorDesconto = 0;
    if (qtdPessoas > 100) {
        valorDesconto = subtotalComTaxa * 0.05;
    }

    const totalFinal = subtotalComTaxa - valorDesconto;

    document.getElementById("resCustoBruto").textContent = `R$ ${custoBruto.toFixed(2)}`;
    document.getElementById("resTaxaServico").textContent = `R$ ${taxaServico.toFixed(2)}`;
    document.getElementById("resDesconto").textContent = `R$ ${valorDesconto.toFixed(2)}`;
    document.getElementById("resTotalFinal").textContent = `R$ ${totalFinal.toFixed(2)}`;

    containerResultado.classList.remove("id-escondido");
});

btnLimpar.addEventListener("click", () => {
    document.getElementById("formOrcamento").reset();
    containerResultado.classList.add("id-escondido");
});
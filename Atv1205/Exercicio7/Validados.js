const btnAnalisar = document.getElementById("btnAnalisar");
const btnLimpar = document.getElementById("btnLimpar");
const containerResultado = document.getElementById("resultado");
const inputCartao = document.getElementById("numeroCartao");

function validarLuhn(numero) {
    let soma = 0;
    let alternar = false;

    for (let i = numero.length - 1; i >= 0; i--) {
        let digito = parseInt(numero.charAt(i), 10);

        if (alternar) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }

        soma += digito;
        alternar = !alternar;
    }

    return (soma % 10 === 0);
}

function identificarBandeira(numero) {
    if (numero.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(numero) || (/^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(numero))) return "Mastercard";
    if (/^(4011|4312|4389|4514|4576|5041|5067|5090|6277|6363|6362)/.test(numero)) return "Elo";
    if (/^3[47]/.test(numero)) return "American Express";
    if (/^6(?:011|5)/.test(numero)) return "Discover";
    return "Desconhecida";
}

function identificarSetor(primeiroDigito) {
    switch (primeiroDigito) {
        case "1": return "Companhias Aéreas";
        case "2": return "Aviação e Outros Setores";
        case "3": return "Viagens e Entretenimento (Amex/Diners)";
        case "4": return "Instituições Financeiras e Bancárias (Visa)";
        case "5": return "Instituições Financeiras e Bancárias (Mastercard)";
        case "6": return "Merchandising e Setor Bancário (Discover/Elo)";
        case "7": return "Indústria do Petróleo";
        case "8": return "Telecomunicações e Saúde";
        case "9": return "Atribuições Nacionais";
        default: return "Setor Desconhecido";
    }
}

function identificarEmissor(iin) {
    const bin = parseInt(iin.substring(0, 6), 10);
    
    if (bin >= 400000 && bin <= 400100) return "Banco do Brasil";
    if (bin >= 506700 && bin <= 506799) return "Itaú Unibanco";
    if (bin >= 554480 && bin <= 554490) return "Banco Bradesco";
    if (bin >= 104000 && bin <= 104999) return "Caixa Econômica Federal";
    if (bin >= 516292 && bin <= 516295) return "Nubank";
    
    return "Emissor Internacional / Genérico";
}

inputCartao.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    valor = valor.match(/.{1,4}/g)?.join(" ") || valor;
    e.target.value = valor;
});

btnAnalisar.addEventListener("click", () => {
    const numeroLimpo = inputCartao.value.replace(/\s+/g, "").replace(/\./g, "");

    if (numeroLimpo.length < 13 || numeroLimpo.length > 16) {
        alert("O número do cartão deve conter entre 13 e 16 dígitos.");
        return;
    }

    const eValido = validarLuhn(numeroLimpo);
    const campoStatus = document.getElementById("resStatus");

    if (eValido) {
        campoStatus.textContent = "Matematicamente Válido";
        campoStatus.style.color = "#2f855a";
    } else {
        campoStatus.textContent = "Inválido (Falha no algoritmo)";
        campoStatus.style.color = "#c53030";
    }

    const primeiroDigito = numeroLimpo.charAt(0);
    const iinOitoDigitos = numeroLimpo.substring(0, 8).padEnd(8, "0");

    document.getElementById("resBandeira").textContent = identificarBandeira(numeroLimpo);
    document.getElementById("resSetor").textContent = identificarSetor(primeiroDigito);
    document.getElementById("resEmissor").textContent = identificarEmissor(iinOitoDigitos);

    containerResultado.classList.remove("id-escondido");
});

btnLimpar.addEventListener("click", () => {
    document.getElementById("formValidador").reset();
    containerResultado.classList.add("id-escondido");
});
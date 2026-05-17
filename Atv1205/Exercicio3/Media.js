const botao = document.getElementById("calcular");
const botaoLimpar = document.getElementById("limpar");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    const n1 = document.getElementById("n1").value;
    const n2 = document.getElementById("n2").value;
    const n3 = document.getElementById("n3").value;
    
    if (!nome || n1 === "" || n2 === "" || n3 === "") {
        resultado.textContent = "Preencha todos os campos corretamente!";
        resultado.style.color = "black";
        return;
    }
    
    const nota1 = parseFloat(n1);
    const nota2 = parseFloat(n2);
    const nota3 = parseFloat(n3);
    
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10 || nota3 < 0 || nota3 > 10) {
        resultado.textContent = "As notas devem ser entre 0.0 e 10.0!";
        resultado.style.color = "black";
        return;
    }

    const media = (nota1 + nota2 + nota3) / 3;
    const mediaFormatada = media.toFixed(2);


    if (media >= 7) {
        resultado.textContent = `${nome} está APROVADO com média ${mediaFormatada}`;
        resultado.style.color = "blue";
    } 
    else if (media >= 4) {
        const falta = (10 - media).toFixed(2);
        resultado.textContent = `${nome} está em EXAME com média ${mediaFormatada}. Faltam ${falta} pontos para 10.`;
        resultado.style.color = "green";
    } 
    else {
        resultado.textContent = `${nome} está REPROVADO com média ${mediaFormatada}`;
        resultado.style.color = "red";
    }
});


botaoLimpar.addEventListener("click", () => {
    document.getElementById("nome").value = "";
    document.getElementById("n1").value = "";
    document.getElementById("n2").value = ""; 
    document.getElementById("n3").value = ""; 

    resultado.textContent = "";
});
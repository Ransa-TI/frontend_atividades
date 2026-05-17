let convidados = [];
const inputNome = document.getElementById("nomeConvidado");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaVip = document.getElementById("listaVip");

function renderizarLista() {
    listaVip.innerHTML = "";

    convidados.forEach((convidado, index) => {
        const li = document.createElement("li");

        const spanNome = document.createElement("span");
        spanNome.className = "nome-texto";
        spanNome.textContent = convidado.nome;

        if (convidado.concluido) {
            spanNome.classList.add("classe-riscado");
        }

        const divAcoes = document.createElement("div");
        divAcoes.className = "acoes-btn";

        const btnConcluir = document.createElement("button");
        btnConcluir.className = "btn-concluir";
        btnConcluir.textContent = convidado.concluido ? "Desmarcar" : "Concluir";
        btnConcluir.addEventListener("click", () => {
            convidado.concluido = !convidado.concluido;
            renderizarLista();
        });

        const btnEditar = document.createElement("button");
        btnEditar.className = "btn-editar";
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => {me
            const novoNome = prompt("Edite o nome do convidado VIP:", convidado.nome);
            if (novoNome !== null && novoNome.trim() !== "") {
                convidado.nome = novoNome.trim();
                renderizarLista();
            }
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "btn-excluir";
        btnExcluir.textContent = "Excluir";
        btnExcluir.addEventListener("click", () => {
            convidados.splice(index, 1);
            renderizarLista();
        });

        divAcoes.appendChild(btnConcluir);
        divAcoes.appendChild(btnEditar);
        divAcoes.appendChild(btnExcluir);

        li.appendChild(spanNome);
        li.appendChild(divAcoes);

        listaVip.appendChild(li);
    });
}

btnAdicionar.addEventListener("click", () => {
    const nomeCapturado = inputNome.value.trim();

    if (nomeCapturado === "") {
        alert("Por favor, digite um nome válido para o convidado VIP.");
        return;
    }

    convidados.push({
        nome: nomeCapturado,
        concluido: false
    });

    inputNome.value = "";
    inputNome.focus();

    renderizarLista();
});

inputNome.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        btnAdicionar.click();
    }
});
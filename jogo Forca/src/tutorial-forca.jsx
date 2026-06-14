import { useState } from "react";

// ============================================================
// JOGO DA FORCA COMPLETO — resultado final do tutorial
// ============================================================

// Palavras com tema para facilitar as tentativas
const PALAVRAS = [
  { palavra: "REACT",       tema: "Biblioteca JavaScript para interfaces" },
  { palavra: "COMPONENTE",  tema: "Bloco de construção do React" },
  { palavra: "ESTADO",      tema: "Dado que muda ao longo do tempo no React" },
  { palavra: "PROPRIEDADE", tema: "Dado passado do pai para o filho no React" },
  { palavra: "GANCHO",      tema: "Função especial do React (ex: useState)" },
  { palavra: "JAVASCRIPT",  tema: "Linguagem de programação da web" },
  { palavra: "NAVEGADOR",   tema: "Programa usado para acessar a internet" },
  { palavra: "TECLADO",     tema: "Periférico de entrada de dados" },
  { palavra: "ALGORITMO",   tema: "Sequência de passos para resolver um problema" },
  { palavra: "VARIAVEL",    tema: "Espaço na memória para guardar um valor" },
];
const MAX_ERROS = 6;

const FORCA_ETAPAS = [
  `
  +---+
  |   |
      |
      |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`,
];

// ── Componente: desenho da forca ──────────────────────────
function ForcaDesenho({ erros }) {
  return (
    <pre style={{
      fontFamily: "monospace",
      fontSize: "1.1rem",
      lineHeight: 1.4,
      color: erros === MAX_ERROS ? "#e74c3c" : "#2c3e50",
      margin: 0,
    }}>
      {FORCA_ETAPAS[erros]}
    </pre>
  );
}

// ── Componente: palavra com letras reveladas ──────────────
function PalavraDisplay({ palavra, letrasCorretas }) {
  return (
    <div style={{ display: "flex", gap: "8px", margin: "20px 0" }}>
      {palavra.split("").map((letra, i) => (
        <div key={i} style={{
          width: 36,
          borderBottom: "3px solid #2c3e50",
          textAlign: "center",
          fontSize: "1.8rem",
          fontWeight: "bold",
          fontFamily: "monospace",
          color: "#2c3e50",
          paddingBottom: 4,
          minHeight: 40,
        }}>
          {letrasCorretas.includes(letra) ? letra : ""}
        </div>
      ))}
    </div>
  );
}

// ── Componente: teclado de letras ────────────────────────
function Teclado({ letrasUsadas, onLetraClick, desabilitado }) {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      maxWidth: 360,
      margin: "16px 0",
    }}>
      {letras.map((letra) => {
        const usada = letrasUsadas.includes(letra);
        return (
          <button
            key={letra}
            onClick={() => onLetraClick(letra)}
            disabled={usada || desabilitado}
            style={{
              width: 38,
              height: 38,
              border: "2px solid",
              borderColor: usada ? "#ccc" : "#2c3e50",
              borderRadius: 6,
              background: usada ? "#f0f0f0" : "#fff",
              color: usada ? "#aaa" : "#2c3e50",
              fontWeight: "bold",
              fontSize: "0.9rem",
              cursor: usada || desabilitado ? "not-allowed" : "pointer",
              fontFamily: "monospace",
            }}
          >
            {letra}
          </button>
        );
      })}
    </div>
  );
}

// ── Componente principal: o jogo ──────────────────────────
// Recebe `palavra`, `tema` e `onReiniciar` via props
function JogoDaForca({ palavra, tema, onReiniciar }) {
  const [letrasUsadas, setLetrasUsadas] = useState([]);

  const letrasCorretas = letrasUsadas.filter((l) => palavra.includes(l));
  const erros = letrasUsadas.filter((l) => !palavra.includes(l)).length;

  const ganhou = palavra.split("").every((l) => letrasCorretas.includes(l));
  const perdeu = erros >= MAX_ERROS;

  function handleLetraClick(letra) {
    if (ganhou || perdeu) return;
    setLetrasUsadas((prev) => [...prev, letra]);
  }

  return (
    <div>
      <ForcaDesenho erros={erros} />
      <p style={{ color: "#666", fontFamily: "monospace" }}>
        Erros: {erros} / {MAX_ERROS}
      </p>
      {/* Tema exibido como dica */}
      <p style={{
        fontFamily: "Georgia, serif",
        fontSize: "0.95rem",
        color: "#555",
        background: "#fff8e1",
        border: "1px solid #ffe082",
        borderLeft: "4px solid #f9a825",
        borderRadius: 6,
        padding: "8px 12px",
        margin: "8px 0",
        display: "inline-block",
      }}>
        💡 Tema: {tema}
      </p>
      <PalavraDisplay palavra={palavra} letrasCorretas={letrasCorretas} />
      {ganhou && (
        <p style={{ color: "#27ae60", fontWeight: "bold", fontSize: "1.2rem" }}>
          🎉 Você ganhou! A palavra era: {palavra}
        </p>
      )}
      {perdeu && (
        <p style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "1.2rem" }}>
          💀 Você perdeu! A palavra era: {palavra}
        </p>
      )}
      <Teclado
        letrasUsadas={letrasUsadas}
        onLetraClick={handleLetraClick}
        desabilitado={ganhou || perdeu}
      />
      <button
        onClick={onReiniciar}
        style={{
          marginTop: 12,
          padding: "8px 20px",
          background: "#2c3e50",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: "bold",
          fontFamily: "monospace",
        }}
      >
        Nova Palavra
      </button>
    </div>
  );
}

// ── Tutorial: bloco de código estilizado ─────────────────
function BlocoCode({ children }) {
  return (
    <pre style={{
      background: "#1e1e2e",
      color: "#cdd6f4",
      padding: "16px 20px",
      borderRadius: 10,
      overflowX: "auto",
      fontFamily: "monospace",
      fontSize: "0.85rem",
      lineHeight: 1.7,
      margin: "12px 0",
      border: "1px solid #313244",
    }}>
      <code>{children}</code>
    </pre>
  );
}

// ── Tutorial: caixa de nota/dica ─────────────────────────
function Nota({ children }) {
  return (
    <div style={{
      background: "#fff8e1",
      border: "1px solid #ffe082",
      borderLeft: "4px solid #f9a825",
      borderRadius: 8,
      padding: "12px 16px",
      margin: "16px 0",
      fontFamily: "Georgia, serif",
      fontSize: "0.95rem",
      color: "#5d4037",
    }}>
      <strong>📝 Nota: </strong>{children}
    </div>
  );
}

// ── Tutorial: seção com título ────────────────────────────
function Secao({ id, titulo, children }) {
  return (
    <section id={id} style={{ marginBottom: 48 }}>
      <h2 style={{
        fontFamily: "'Georgia', serif",
        fontSize: "1.6rem",
        color: "#1a1a2e",
        borderBottom: "2px solid #e8e8e8",
        paddingBottom: 8,
        marginBottom: 20,
      }}>
        {titulo}
      </h2>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "1rem", lineHeight: 1.8, color: "#333" }}>
        {children}
      </div>
    </section>
  );
}

// ── Tutorial: área interativa ─────────────────────────────
function AreaInterativa({ titulo, children }) {
  return (
    <div style={{
      border: "2px solid #2c3e50",
      borderRadius: 12,
      padding: 24,
      margin: "20px 0",
      background: "#f8f9fa",
    }}>
      {titulo && (
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.8rem",
          color: "#888",
          margin: "0 0 12px 0",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}>
          {titulo}
        </p>
      )}
      {children}
    </div>
  );
}

// ── Navegação lateral ────────────────────────────────────
function NavLateral() {
  const itens = [
    { id: "o-que-voce-vai-construir", label: "O que você vai construir?" },
    { id: "configuracao",             label: "Configuração" },
    { id: "visao-geral",              label: "Visão geral" },
    { id: "componente-forca",         label: "O componente da forca" },
    { id: "componente-palavra",       label: "Exibindo a palavra" },
    { id: "componente-teclado",       label: "O teclado" },
    { id: "estado",                   label: "Gerenciando o estado" },
    { id: "logica-vitoria",           label: "Lógica de vitória" },
    { id: "resultado-final",          label: "Resultado final" },
  ];
  return (
    <nav style={{ position: "sticky", top: 24, width: 220, flexShrink: 0 }}>
      <p style={{
        fontFamily: "monospace",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "#888",
        marginBottom: 10,
      }}>
        Nesta página
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {itens.map((item) => (
          <li key={item.id} style={{ marginBottom: 6 }}>
            <a href={`#${item.id}`} style={{
              color: "#2c3e50",
              textDecoration: "none",
              fontFamily: "Georgia, serif",
              fontSize: "0.88rem",
              lineHeight: 1.4,
              display: "block",
              padding: "2px 0 2px 10px",
              borderLeft: "2px solid #e0e0e0",
            }}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Componente raiz: o tutorial completo ─────────────────
export default function Tutorial() {
  const [indice, setIndice] = useState(
    () => Math.floor(Math.random() * PALAVRAS.length)
  );

  // Ao mudar o índice, o JogoDaForca recebe uma nova `key`
  // e o React desmonta + remonta o componente, zerando o estado
  function novaRodada() {
    setIndice((prev) => {
      let novo;
      do { novo = Math.floor(Math.random() * PALAVRAS.length); }
      while (novo === prev && PALAVRAS.length > 1);
      return novo;
    });
  }

  const { palavra, tema } = PALAVRAS[indice];

  return (
    <div style={{
      maxWidth: 1100,
      margin: "0 auto",
      padding: "32px 24px",
      background: "#fff",
      minHeight: "100vh",
    }}>
      {/* Cabeçalho */}
      <header style={{ marginBottom: 40 }}>
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.8rem",
          color: "#888",
          textTransform: "uppercase",
          letterSpacing: 2,
          margin: "0 0 8px",
        }}>
          Tutorial
        </p>
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "2.6rem",
          color: "#1a1a2e",
          margin: "0 0 16px",
          lineHeight: 1.2,
        }}>
          Jogo da Forca em React
        </h1>
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "1.05rem",
          color: "#555",
          lineHeight: 1.7,
          maxWidth: 680,
          margin: 0,
        }}>
          Você vai construir um jogo da forca interativo com React. Este tutorial não exige
          conhecimento prévio de React. As técnicas que você aprenderá são fundamentais para
          construir qualquer app React.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          {["Componentes", "Props", "Estado (useState)", "Lifting State Up"].map((tag) => (
            <span key={tag} style={{
              background: "#f0f4ff",
              color: "#2c3e50",
              padding: "4px 12px",
              borderRadius: 20,
              fontFamily: "monospace",
              fontSize: "0.8rem",
              border: "1px solid #c5d0e6",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Layout de duas colunas */}
      <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* ── SEÇÃO 1 ── */}
          <Secao id="o-que-voce-vai-construir" titulo="O que você vai construir?">
            <p>
              Neste tutorial, você vai construir um jogo da forca interativo com React. Ao final,
              o jogo estará funcional: o jogador tenta adivinhar uma palavra letra por letra,
              e um boneco vai sendo desenhado a cada erro. Cada palavra tem um <strong>tema</strong> como dica.
            </p>
            <p>Você pode jogar o resultado final aqui antes de começar:</p>
            {/* key={indice} garante que o estado é zerado a cada nova palavra */}
            <AreaInterativa titulo="Resultado final — Jogo da Forca">
              <JogoDaForca key={indice} palavra={palavra} tema={tema} onReiniciar={novaRodada} />
            </AreaInterativa>
            <p>
              O tutorial é dividido em várias seções. Cada seção apresenta um conceito novo
              do React e adiciona uma parte ao jogo.
            </p>
            <Nota>
              Este tutorial é voltado para quem prefere <strong>aprender fazendo</strong>.
              Se você prefere aprender conceito por conceito, comece pela documentação oficial
              em <em>react.dev/learn</em>.
            </Nota>
          </Secao>

          {/* ── SEÇÃO 2 ── */}
          <Secao id="configuracao" titulo="Configuração">
            <p>Para começar, crie um projeto React com Vite:</p>
            <BlocoCode>{`npm create vite@latest jogo-forca -- --template react
cd jogo-forca
npm install
npm run dev`}</BlocoCode>
            <p>
              Abra <code style={{ fontFamily: "monospace", background: "#f0f0f0", padding: "2px 6px", borderRadius: 4 }}>src/App.jsx</code> e
              substitua todo o conteúdo pelo código que vamos construir passo a passo.
            </p>
          </Secao>

          {/* ── SEÇÃO 3 ── */}
          <Secao id="visao-geral" titulo="Visão geral">
            <p>
              O jogo vai ser composto por <strong>três componentes</strong> principais, mais
              um componente raiz que os coordena:
            </p>
            <ul style={{ paddingLeft: 24, lineHeight: 2 }}>
              <li><strong>ForcaDesenho</strong> — exibe o boneco sendo desenhado (ASCII art)</li>
              <li><strong>PalavraDisplay</strong> — exibe as letras da palavra, revelando as acertadas</li>
              <li><strong>Teclado</strong> — 26 botões de letras para o jogador clicar</li>
              <li><strong>JogoDaForca</strong> — componente pai que guarda o estado do jogo</li>
            </ul>
            <p>
              O React organiza interfaces como uma <strong>árvore de componentes</strong>. Cada
              componente recebe dados via <em>props</em> e pode ter seu próprio <em>state</em>.
              Aqui, o estado (quais letras foram usadas) vai viver no componente pai.
            </p>
          </Secao>

          {/* ── SEÇÃO 4 ── */}
          <Secao id="componente-forca" titulo="O componente da forca">
            <p>
              Vamos começar pelo mais visual: o desenho da forca. Ele recebe o número de
              erros como prop e exibe o estágio correspondente.
            </p>
            <BlocoCode>{`const FORCA_ETAPAS = [
  // 0 erros — forca vazia
  \`
  +---+
  |   |
      |
      |
      |
      |
=========\`,
  // 1 erro — cabeça
  \`
  +---+
  |   |
  O   |
      |
      |
      |
=========\`,
  // ... até 6 erros (corpo completo)
];

function ForcaDesenho({ erros }) {
  return (
    <pre>{FORCA_ETAPAS[erros]}</pre>
  );
}`}</BlocoCode>
            <Nota>
              O elemento <code style={{ fontFamily: "monospace" }}>&lt;pre&gt;</code> preserva espaços e quebras de linha,
              essencial para o ASCII art funcionar corretamente.
            </Nota>
            <AreaInterativa titulo="ForcaDesenho com 4 erros">
              <ForcaDesenho erros={4} />
            </AreaInterativa>
          </Secao>

          {/* ── SEÇÃO 5 ── */}
          <Secao id="componente-palavra" titulo="Exibindo a palavra">
            <p>
              O componente <code style={{ fontFamily: "monospace", background: "#f0f0f0", padding: "2px 6px", borderRadius: 4 }}>PalavraDisplay</code> recebe
              a palavra completa e o array de letras já acertadas. Para cada letra mostra o
              caractere se foi acertada, ou um espaço em branco caso contrário.
            </p>
            <BlocoCode>{`function PalavraDisplay({ palavra, letrasCorretas }) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {palavra.split("").map((letra, i) => (
        <div key={i} style={{ borderBottom: "2px solid black", width: 30, textAlign: "center" }}>
          {letrasCorretas.includes(letra) ? letra : ""}
        </div>
      ))}
    </div>
  );
}`}</BlocoCode>
            <AreaInterativa titulo="PalavraDisplay — palavra REACT, letras R e E acertadas">
              <PalavraDisplay palavra="REACT" letrasCorretas={["R", "E"]} />
            </AreaInterativa>
          </Secao>

          {/* ── SEÇÃO 6 ── */}
          <Secao id="componente-teclado" titulo="O teclado">
            <p>
              O teclado exibe 26 botões. Cada botão já clicado é desabilitado e muda de estilo.
              Quando clicado, chama a função <code style={{ fontFamily: "monospace", background: "#f0f0f0", padding: "2px 6px", borderRadius: 4 }}>onLetraClick</code> passada pelo pai.
            </p>
            <BlocoCode>{`function Teclado({ letrasUsadas, onLetraClick, desabilitado }) {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {letras.map((letra) => {
        const usada = letrasUsadas.includes(letra);
        return (
          <button
            key={letra}
            onClick={() => onLetraClick(letra)}
            disabled={usada || desabilitado}
          >
            {letra}
          </button>
        );
      })}
    </div>
  );
}`}</BlocoCode>
            <Nota>
              O componente <strong>não guarda estado</strong>. Ele apenas exibe o que
              recebe via props e avisa o pai quando uma letra é clicada.
            </Nota>
            <AreaInterativa titulo="Teclado — vogais desabilitadas">
              <Teclado letrasUsadas={["A","E","I","O","U"]} onLetraClick={() => {}} desabilitado={false} />
            </AreaInterativa>
          </Secao>

          {/* ── SEÇÃO 7 ── */}
          <Secao id="estado" titulo="Gerenciando o estado">
            <p>
              Agora vem o conceito mais importante: <strong>onde guardar o estado?</strong> Os três
              componentes precisam das letras usadas, então guardamos tudo no pai — técnica
              chamada de <strong>lifting state up</strong>.
            </p>
            <BlocoCode>{`function JogoDaForca({ palavra, tema }) {
  const [letrasUsadas, setLetrasUsadas] = useState([]);

  const letrasCorretas = letrasUsadas.filter(l => palavra.includes(l));
  const erros = letrasUsadas.filter(l => !palavra.includes(l)).length;

  function handleLetraClick(letra) {
    setLetrasUsadas(prev => [...prev, letra]);
  }

  return (
    <div>
      <p>💡 Tema: {tema}</p>
      <ForcaDesenho erros={erros} />
      <PalavraDisplay palavra={palavra} letrasCorretas={letrasCorretas} />
      <Teclado
        letrasUsadas={letrasUsadas}
        onLetraClick={handleLetraClick}
        desabilitado={false}
      />
    </div>
  );
}`}</BlocoCode>
            <Nota>
              O <code style={{ fontFamily: "monospace" }}>useState</code> retorna dois valores: o estado atual e uma função
              para atualizá-lo. Sempre que chamamos <code style={{ fontFamily: "monospace" }}>setLetrasUsadas</code>, o React
              re-renderiza o componente com o novo valor.
            </Nota>
          </Secao>

          {/* ── SEÇÃO 8 ── */}
          <Secao id="logica-vitoria" titulo="Lógica de vitória e derrota">
            <p>
              Com o estado funcionando, adicionamos as condições de fim de jogo e o botão
              de nova palavra. O segredo para <strong>zerar o jogo</strong> ao trocar de palavra
              é a prop <code style={{ fontFamily: "monospace", background: "#f0f0f0", padding: "2px 6px", borderRadius: 4 }}>key</code>:
              quando ela muda, o React desmonta e remonta o componente do zero.
            </p>
            <BlocoCode>{`// No componente pai:
function App() {
  const [indice, setIndice] = useState(0);
  const { palavra, tema } = PALAVRAS[indice];

  function novaRodada() {
    setIndice(i => (i + 1) % PALAVRAS.length);
  }

  return (
    // key={indice} faz o React recriar JogoDaForca a cada troca,
    // zerando automaticamente o useState interno dele
    <JogoDaForca key={indice} palavra={palavra} tema={tema} onReiniciar={novaRodada} />
  );
}

// Dentro do JogoDaForca:
const ganhou = palavra.split("").every(l => letrasCorretas.includes(l));
const perdeu = erros >= MAX_ERROS;

function handleLetraClick(letra) {
  if (ganhou || perdeu) return; // bloqueia cliques após fim
  setLetrasUsadas(prev => [...prev, letra]);
}`}</BlocoCode>
            <Nota>
              Usar <code style={{ fontFamily: "monospace" }}>key</code> para resetar um componente é um padrão oficial
              do React. É mais simples do que chamar manualmente <code style={{ fontFamily: "monospace" }}>setLetrasUsadas([])</code> no
              pai — o React cuida de tudo ao desmontar o componente.
            </Nota>
          </Secao>

          {/* ── SEÇÃO 9 ── */}
          <Secao id="resultado-final" titulo="Resultado final">
            <p>Parabéns! O jogo completo combina todos os conceitos vistos:</p>
            <ul style={{ paddingLeft: 24, lineHeight: 2 }}>
              <li><strong>Componentes</strong> — ForcaDesenho, PalavraDisplay, Teclado, JogoDaForca</li>
              <li><strong>Props</strong> — dados passados do pai para os filhos</li>
              <li><strong>useState</strong> — array de letras usadas como fonte da verdade</li>
              <li><strong>Estado derivado</strong> — erros, ganhou e perdeu sem novo state</li>
              <li><strong>Lifting state up</strong> — estado centralizado no pai</li>
              <li><strong>key para reset</strong> — desmonta e remonta o componente ao trocar palavra</li>
            </ul>
            <AreaInterativa titulo="Jogo da Forca — completo e jogável">
              <JogoDaForca key={indice} palavra={palavra} tema={tema} onReiniciar={novaRodada} />
            </AreaInterativa>
          </Secao>

        </main>

        <aside>
          <NavLateral />
        </aside>
      </div>
    </div>
  );
}

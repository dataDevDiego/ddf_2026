// Objeto literal (JSON) contendo as questões da prova[cite: 2, 39]
const quizData = [
  {
    pergunta: "O que é o DOM?",
    alternativas: [
      "Document Object Model", 
      "Data Object Model", 
      "Design Object Model"
    ],
    correta: 0
  },
  {
    pergunta: "Para criar Web Components customizados, como a tag deve ser nomeada?",
    alternativas: [
      "Apenas com letras minúsculas (ex: meucabecalho)", 
      "Sempre utilizando '-' para evitar conflito com HTML nativo (ex: meu-header)", 
      "Começando com letra maiúscula (ex: MeuHeader)"
    ],
    correta: 1
  },
  {
    pergunta: "Qual recurso isola o CSS de um Web Component do resto do documento?",
    alternativas: [
      "Custom Elements", 
      "Slots", 
      "Shadow DOM"
    ],
    correta: 2
  }
];

// Web Component 1: Prova On-line com Shadow DOM[cite: 2, 8]
class MyTest extends HTMLElement {
  constructor() {
    super();
    // Criação do Shadow DOM para encapsulamento[cite: 8]
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    // Adição de CSS local e HTML das questões iterando sobre o objeto literal[cite: 2]
    let html = `
      <style>
        .quiz { font-family: Arial, sans-serif; }
        .question { margin-bottom: 20px; }
        .question p { font-weight: bold; margin-bottom: 5px; }
        label { display: block; margin-bottom: 5px; cursor: pointer; }
        .btn { background: #0e7490; color: white; padding: 10px 15px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
        .btn:hover { background: #164e63; }
        .result-box { margin-top: 20px; padding: 15px; border: 1px solid #cbd5e1; border-radius: 8px; background: #f4f7fb; }
      </style>
      <div class="quiz">
        <h2>Avaliação de Conhecimentos</h2>
        <form id="quizForm">
    `;

    quizData.forEach((q, index) => {
      html += `
        <div class="question">
          <p>${index + 1}. ${q.pergunta}</p>`;
      q.alternativas.forEach((alt, i) => {
        html += `
          <label>
            <input type="radio" name="q${index}" value="${i}" required>
            ${alt}
          </label>`;
      });
      html += `</div>`;
    });

    html += `
          <button type="submit" class="btn" id="btn-submit">Corrigir Prova</button>
          <button type="button" class="btn" id="btn-reset" style="display: none;">Responder Novamente</button>
        </form>
        <div id="resultado"></div>
      </div>
    `;

    this.shadow.innerHTML = html;

    // Adição de Event Listeners para botões[cite: 72]
    this.shadow.querySelector('#quizForm').addEventListener('submit', (e) => this.corrigir(e));
    this.shadow.querySelector('#btn-reset').addEventListener('click', () => this.refazer());
  }

  corrigir(e) {
    e.preventDefault();
    let nota = 0;
    const form = this.shadow.querySelector('#quizForm');
    let relatorio = `<h3>Resultado Final</h3><ul>`;

    // Correção comparando as respostas com o objeto literal[cite: 2]
    quizData.forEach((q, index) => {
      let respSelecionada = parseInt(form.elements[`q${index}`].value);
      let acertou = (respSelecionada === q.correta);
      
      if (acertou) nota++;

      relatorio += `
        <li>
          <strong>Questão ${index + 1}:</strong> Você respondeu "${q.alternativas[respSelecionada]}".<br>
          ${acertou ? '<span style="color: green;">✔ Correto!</span>' : `<span style="color: red;">✖ Incorreto.</span> A resposta certa era "${q.alternativas[q.correta]}".`}
        </li><br>`;
    });

    relatorio += `</ul><p><strong>Sua Nota: ${nota} / ${quizData.length}</strong></p>`;

    this.shadow.querySelector('#resultado').innerHTML = `<div class="result-box">${relatorio}</div>`;
    this.shadow.querySelector('#btn-submit').style.display = 'none';
    this.shadow.querySelector('#btn-reset').style.display = 'inline-block';
  }

  refazer() {
    this.shadow.querySelector('#quizForm').reset();
    this.shadow.querySelector('#resultado').innerHTML = '';
    this.shadow.querySelector('#btn-submit').style.display = 'inline-block';
    this.shadow.querySelector('#btn-reset').style.display = 'none';
  }
}
customElements.define('my-test', MyTest);

// Web Component 2: Cabeçalho do Site (com slot)[cite: 2, 7, 12]
class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <header class="site-header">
        <div class="container">
          <h1>Portfólio de Design de Interação</h1>
          <p><slot name="subtitulo">Trabalhos da disciplina</slot></p>
        </div>
      </header>
    `;
  }
}
customElements.define('site-header', SiteHeader);

// Web Component 3: Navegação Principal[cite: 2, 7]
class SiteNav extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <nav class="site-nav" aria-label="Navegação principal">
        <div class="container">
          <ul>
            <li><a href="index.html">Apresentação</a></li>
            <li><a href="trabalho1.html">Trabalho 1</a></li>
            <li><a href="trabalho2.html">Trabalho 2</a></li>
            <li><a href="trabalho3.html">Trabalho 3</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
}
customElements.define('site-nav', SiteNav);

// Web Component 4: Rodapé[cite: 2, 7]
class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <footer class="site-footer">
        <p>Portfólio de Design de Interação</p>
        <p>HTML, CSS e JavaScript.</p>
      </footer>
    `;
  }
}
customElements.define('site-footer', SiteFooter);
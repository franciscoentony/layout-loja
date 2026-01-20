document.addEventListener('DOMContentLoaded', function () {

  const homeRoot = document.getElementById('home-root');
  const productsRoot = document.getElementById('products-root');
  const linkProducts = document.getElementById('link-products');
  const linkHome = document.getElementById('link-home');
  const backBtn = document.getElementById('backToHome');
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('productCount');
  const produtoDetalhes = document.querySelector(".detalhes-produto");

  const products = [
    // ATUALIZADO: LINKS DINÂMICOS PARA PÁGINAS DE DETALHE
    { id: 1, title: "Tênis Velocity Pro", category: "Tênis", desc: "Solado de poliamida com amortecimento em gel. Leve e estável para corridas.", price: 294.49, oldPrice: 349.99, rating: 4.7, img: "img1.jpg", link: "./pages-produtos/velocitypro.html" },
    { id: 2, title: "Tênis AirRun X", category: "Tênis", desc: "Cabedal em mesh respirável e palmilha com memória.", price: 408.49, oldPrice: 599.99, rating: 4.2, img: "img2.jpg", link: "./pages-produtos/airrunx.html"}, // Supondo que você criará airrunx.html
    { id: 3, title: "Tênis PowerFlex 500", category: "Tênis", desc: "Espuma EVA e base antiderrapante — ótimo para treino.", price: 329.90, oldPrice: 399.90, rating: 4.4, img: "img3.jpg", link: "./pages-produtos/powerflex500.html"}, // Supondo que você criará powerflex500.html
    { id: 4, title: "Shorts DryFit Motion", category: "Shorts", desc: "Tecido microfibra que afasta o suor e cós elástico ajustável.", price: 79.90, oldPrice: 0, rating: 4.1, img: "short01.jpg", link: "./pages-produtos/dryfitmotion.html"},
    { id: 5, title: "Shorts FlexMove", category: "Shorts", desc: "Poliéster reciclado com elastano para mobilidade total.", price: 89.90, oldPrice: 119.90, rating: 4.3, img: "short02.jpg", link: "./pages-produtos/flexmove.html"},
    { id: 6, title: "Camisa TechFit Performance", category: "Camisas", desc: "Material leve com antiodor e proteção UV 50+.", price: 129.90, oldPrice: 149.90, rating: 4.6, img: "camisa01.jpg", link: "./pages-produtos/techfitperformance.html"},
    { id: 7, title: "Camisa AirCool Pro", category: "Camisas", desc: "Painéis de ventilação e costuras seladas para menos atrito.", price: 119.90, oldPrice: 0, rating: 4.2, img: "camisa02.jpg", link: "./pages-produtos/aircoolpro.html"},
    { id: 8, title: "Camisa Energy Wave", category: "Camisas", desc: "Toque macio e design ergonômico pra movimentos livres.", price: 99.90, oldPrice: 129.90, rating: 4.0, img: "camisa03.jpg", link: "./pages-produtos/energywave.html"}
  ];

  function brl(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
  function calcDiscount(oldP, p) { if (!oldP || oldP <= p) return null; return Math.round((1 - (p / oldP)) * 100); }

  function renderProducts(list) {
    if (!grid) return;
    grid.innerHTML = '';
    list.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="img"><img src="${p.img}" alt="${p.title}"></div>
        <div class="meta">
          <div class="category">${p.category}</div>
          <div class="title">${p.title}</div>
          <div class="desc">${p.desc}</div>
          <div class="price-row">
            <div class="price">${brl(p.price)}</div>
            ${p.oldPrice && p.oldPrice > p.price ? `<div class="old">${brl(p.oldPrice)}</div>` : ''}
            ${p.oldPrice && p.oldPrice > p.price ? `<div class="discount">${calcDiscount(p.oldPrice, p.price)}% off</div>` : ''}
          </div>
          <div class="rating">★ ${p.rating} — <span class="muted">Avaliações</span></div>
          <div class="actions">
            <button type="button" class="buy">
              <a class="link" href="${p.link}">Comprar</a>
            </button>
            <button class="fav">♡</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
    if (countEl) countEl.textContent = `${list.length} itens`;
  }
  
  function infosRenderProducts(list) {
  if (!produtoDetalhes) return;
  produtoDetalhes.innerHTML = '';
  list.forEach(p => {
    const newCard = document.createElement('article');
    newCard.className = 'newcard';
    newCard.innerHTML = `
      <h2 class="titulo-produto">${p.title}</h2>
      <span class="etiqueta">${p.oldPrice > p.price ? "Promoção" : ""}</span>
      <p class="preco">${brl(p.price)}</p>
      <p class="descricao-resumida">${p.desc}</p>

      <div class="linha-opcoes">
        <div class="opcao">
          <label for="opcao-cor">Cor</label>
          <select id="opcao-cor">
            <option>Azul</option>
            <option>Vermelho</option>
            <option>Preto</option>
          </select>
        </div>

        <div class="opcao">
          <label for="opcao-tamanho">Tamanho</label>
          <select id="opcao-tamanho">
            <option>P</option>
            <option>M</option>
            <option>G</option>
          </select>
        </div>
      </div>

      <a href="#" id="atalhoComprar" class="atalho-comprar" role="button">Comprar</a>

      <div class="caixa-descricao">
        <a href="#" id="atalhoDescricao" class="cabecalho-descricao" role="button" aria-expanded="false">
          <h4>Detalhes do Produto</h4>
          <span class="seta">▼</span>
        </a>
        <p class="texto-descricao" id="textoDescricao">
          Este é um excelente produto, com design moderno, materiais de alta qualidade e ótimo custo-benefício.
        </p>
      </div>
    `;
    produtoDetalhes.appendChild(newCard);
  });
}

  const filterButtons = document.querySelectorAll('#filterList button');
  if (filterButtons.length > 0) { // Protege contra erro em páginas sem filtros
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
      });
    });
    
    const priceFilterBtn = document.getElementById('priceFilterBtn');
    const clearPrice = document.getElementById('clearPrice');
    
    if (priceFilterBtn) {
        priceFilterBtn.addEventListener('click', applyFilters);
    }
    
    if (clearPrice) {
        clearPrice.addEventListener('click', () => {
          document.getElementById('minPrice').value = '';
          document.getElementById('maxPrice').value = '';
          applyFilters();
        });
    }
  }
  
  function getActiveCategory() { const active = document.querySelector('#filterList button.active'); return active ? active.dataset.cat : 'all'; }

  function applyFilters() {
    const cat = getActiveCategory();
    const min = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxVal = parseFloat(document.getElementById('maxPrice').value);
    const hasMax = !isNaN(maxVal) && maxVal > 0;
    let list = products.slice();
    if (cat !== 'all') list = list.filter(p => p.category === cat);
    list = list.filter(p => p.price >= min);
    if (hasMax) list = list.filter(p => p.price <= maxVal);
    renderProducts(list);
  }
  function showProducts() {
    if (homeRoot) homeRoot.classList.add('hidden');
    if (productsRoot) productsRoot.classList.remove('hidden');
    applyFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState({ page: 'products' }, '', '#products');
  }
  function showHome() {
    if (productsRoot) productsRoot.classList.add('hidden');
    if (homeRoot) homeRoot.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState({ page: 'home' }, '', window.location.pathname);
  }

  if (linkProducts) linkProducts.addEventListener('click', (e) => { e.preventDefault(); showProducts(); });
  if (linkHome) linkHome.addEventListener('click', (e) => { e.preventDefault(); showHome(); });
  if (backBtn) backBtn.addEventListener('click', () => showHome());

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page === 'products') {
      if (homeRoot) homeRoot.classList.add('hidden');
      if (productsRoot) productsRoot.classList.remove('hidden');
    } else {
      if (productsRoot) productsRoot.classList.add('hidden');
      if (homeRoot) homeRoot.classList.remove('hidden');
    }
  });

  // NOVA LÓGICA: Busca dinâmica e INSERÇÃO DA IMAGEM
  if (produtoDetalhes) {
    const path = window.location.pathname;
    const currentFile = path.substring(path.lastIndexOf('/') + 1);

    // Procura o produto cujo link de compra inclua o nome do arquivo atual
    const produtoAtual = products.find(p => p.link && p.link.includes(currentFile));

    if (produtoAtual) {
      // ** CORREÇÃO DA IMAGEM **: Cria e insere o elemento <img> no container correto
      const imagemProdutoContainer = document.querySelector(".imagem-produto");
      if (imagemProdutoContainer) {
          // Cria o elemento <img>
          const imgElement = document.createElement('img');
          // O caminho '../' é usado porque o HTML está em 'pages-produtos/' e a imagem na raiz.
          imgElement.src = `../${produtoAtual.img}`; 
          imgElement.alt = produtoAtual.title;
          
          // Insere a imagem como o primeiro filho do container (preservando o atalho favorito que já existe)
          imagemProdutoContainer.prepend(imgElement);
      }
      
      // Insere os detalhes do produto
      infosRenderProducts([produtoAtual]);
    } else {
      console.error("Produto não encontrado para o arquivo:", currentFile);
    }
  }

  if (location.hash === '#products') showProducts();
  else if (!produtoDetalhes) renderProducts(products); // Renderiza a lista se não for a página de detalhes
});


// PROTEÇÃO: Envolve a lógica de PJ/PF e Datas com verificações de existência.
const botaoPF = document.getElementById("botaoPF")
const botaoPJ = document.getElementById("botaoPJ")
const camposPJ = document.getElementById("camposPJ")

if (botaoPF && botaoPJ && camposPJ) { 
  
  // Define o estado inicial se o botão PF for o padrão
  if (botaoPF) {
      botaoPF.classList.add("ativa");
      if (camposPJ) camposPJ.classList.add("escondido");
  }

  botaoPF.addEventListener("click", () => {
    if (camposPJ) camposPJ.classList.add("escondido")
    botaoPF.classList.add("ativa")
    if (botaoPJ) botaoPJ.classList.remove("ativa")
  });

  botaoPJ.addEventListener("click", () => {
    if (camposPJ) camposPJ.classList.remove("escondido")
    botaoPJ.classList.add("ativa")
    if (botaoPF) botaoPF.classList.remove("ativa")
  });
} 

const dia = document.getElementById("dia")
const mes = document.getElementById("mes")
const ano = document.getElementById("ano")

if (dia) { // Verificação
  for (let i = 1; i <= 31; i++) {
    dia.innerHTML += `<option value="${i}">${i}</option>`
  }
}

if (mes) { // Verificação
  for (let i = 1; i <= 12; i++) {
    mes.innerHTML += `<option value="${i}">${i}</option>`
  }
}

if (ano) { // Verificação
  for (let i = 2025; i >= 1900; i--) {
    ano.innerHTML += `<option value="${i}">${i}</option>`
  }
}


const atalhoFavorito = document.getElementById("atalhoFavorito")
const atalhoComprar = document.getElementById("atalhoComprar")
const atalhoDescricao = document.getElementById("atalhoDescricao")
const textoDescricao = document.getElementById("textoDescricao")
const seta = document.querySelector(".cabecalho-descricao .seta") || document.querySelector(".seta")

let descricaoVisivel = false

if (atalhoFavorito) {
  atalhoFavorito.addEventListener("click", function (evento) {
    evento.preventDefault()
    this.classList.toggle("favoritado")
  })
}

if (atalhoComprar) {
  atalhoComprar.addEventListener("click", function (evento) {
    evento.preventDefault()
    const opcaoCor = document.getElementById("opcao-cor")
    const opcaoTamanho = document.getElementById("opcao-tamanho")
    const corSelecionada = opcaoCor ? opcaoCor.value : ""
    const tamanhoSelecionado = opcaoTamanho ? opcaoTamanho.value : ""
    alert("Adicionado ao carrinho:\nProduto: Nome do Produto\nCor: " + corSelecionada + "\nTamanho: " + tamanhoSelecionado)
  })
}

if (atalhoDescricao) {
  atalhoDescricao.addEventListener("click", function (evento) {
    evento.preventDefault()
    descricaoVisivel = !descricaoVisivel
    if (textoDescricao) {
      textoDescricao.classList.toggle("visivel", descricaoVisivel)
    }
    if (seta) {
      seta.textContent = descricaoVisivel ? "▲" : "▼"
    }
    const expandido = descricaoVisivel ? "true" : "false"
    this.setAttribute("aria-expanded", expandido)
  })
}
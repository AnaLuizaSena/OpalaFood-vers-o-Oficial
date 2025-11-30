const PLANILHA_URL = 'https://script.google.com/macros/s/AKfycbzBFmLbAaCgAPQZ3yznTppDY7K41ilQsucCUuXfHUHKI2WeMyZK0CThqrpCtnaDaizv/exec';

let carrinho = [];

function carregarCarrinho() {
  try {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    carrinho = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error);
    carrinho = [];
  }
}

function salvarCarrinho() {
  try {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.dispatchEvent(new Event('carrinhoAtualizado'));
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error);
  }
}

function agruparItensPorEstabelecimento() {
  const grupos = {};
  
  carrinho.forEach(item => {
    const estabId = item.estabelecimentoId || 1;
    
    if (!grupos[estabId]) {
      grupos[estabId] = {
        estabelecimentoNome: item.estabelecimentoNome || 'Estabelecimento',
        telefone: item.estabelecimentoTelefone || '5586999999999',
        itens: [],
        total: 0
      };
    }
    
    grupos[estabId].itens.push(item);
    grupos[estabId].total += item.preco * item.quantidade;
  });
  
  return grupos;
}

function atualizarCarrinho() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');
  
  if (!cartCount || !cartItems || !cartFooter || !cartTotal) {
    return;
  }
  
  const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
  cartCount.textContent = totalItens;
  cartCount.style.display = totalItens > 0 ? 'block' : 'none';
  
  cartItems.innerHTML = '';
  
  if (carrinho.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">Seu carrinho está vazio</div>';
    cartFooter.style.display = 'none';
    return;
  }
  
  const grupos = agruparItensPorEstabelecimento();
  
  for (const [estabId, grupo] of Object.entries(grupos)) {
    const headerDiv = document.createElement('div');
    headerDiv.style.cssText = `
      background: linear-gradient(135deg, #f97316, #ff8c42);
      padding: 8px 12px;
      margin-bottom: 10px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      color: white;
      display: flex;
      align-items: center;
      gap: 6px;
    `;
    headerDiv.textContent = grupo.estabelecimentoNome;
    cartItems.appendChild(headerDiv);
    
    grupo.itens.forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <div class="cart-item-details">
          <div class="cart-item-name">${item.nome}</div>
          <div class="cart-item-size">${item.tamanho || ''}</div>
          <div class="cart-item-price">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
        </div>
        <div class="cart-item-actions">
          <button class="remove-item" onclick="removerDoCarrinho('${item.nome.replace(/'/g, "\\'")}', '${item.tamanho}', ${item.estabelecimentoId})" title="Remover item">×</button>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="alterarQuantidadeItem('${item.nome.replace(/'/g, "\\'")}', '${item.tamanho}', ${item.estabelecimentoId}, -1)" title="Diminuir quantidade">-</button>
            <span class="quantity-text">${item.quantidade}</span>
            <button class="quantity-btn" onclick="alterarQuantidadeItem('${item.nome.replace(/'/g, "\\'")}', '${item.tamanho}', ${item.estabelecimentoId}, 1)" title="Aumentar quantidade">+</button>
          </div>
        </div>
      `;
      cartItems.appendChild(itemDiv);
    });
  }
  
  const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
  cartTotal.textContent = `R$ ${total.toFixed(2)}`;
  cartFooter.style.display = 'block';
}

function toggleCart() {
  const dropdown = document.getElementById('cartDropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

function adicionarAoCarrinho(nome, tamanho, preco, estabelecimentoId, estabelecimentoNome, estabelecimentoTelefone) {
  console.log('🛒 Função adicionarAoCarrinho chamada!');
  console.log('Parâmetros:', { nome, tamanho, preco, estabelecimentoId, estabelecimentoNome, estabelecimentoTelefone });
  
  carregarCarrinho();
  
  const itemExistente = carrinho.find(item => 
    item.nome === nome && 
    item.tamanho === tamanho &&
    item.estabelecimentoId === estabelecimentoId
  );
  
  if (itemExistente) {
    itemExistente.quantidade++;
    mostrarNotificacao('Quantidade atualizada no carrinho');
  } else {
    const novoItem = {
      nome: nome,
      tamanho: tamanho,
      preco: preco,
      quantidade: 1,
      estabelecimentoId: estabelecimentoId || 1,
      estabelecimentoNome: estabelecimentoNome || 'Estabelecimento',
      estabelecimentoTelefone: estabelecimentoTelefone || '5586999999999'
    };
    carrinho.push(novoItem);
    mostrarNotificacao('Item adicionado ao carrinho');
  }
  
  salvarCarrinho();
  atualizarCarrinho();
}

function adicionarLancheAoCarrinho(nome, preco) {
  console.log('🍔 Função adicionarLancheAoCarrinho chamada!');
  
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));
  
  let estabelecimentoNome = 'Estabelecimento';
  let estabelecimentoTelefone = '5586999999999';
  
  if (typeof restaurantes !== 'undefined' && restaurantes[id]) {
    estabelecimentoNome = restaurantes[id].nome;
    estabelecimentoTelefone = restaurantes[id].whatsapp || restaurantes[id].telefone;
  }
  
  carregarCarrinho();
  
  const itemExistente = carrinho.find(item => 
    item.nome === nome && 
    item.tamanho === 'Único' &&
    item.estabelecimentoId === id
  );
  
  if (itemExistente) {
    itemExistente.quantidade++;
    mostrarNotificacao('Quantidade atualizada no carrinho');
  } else {
    const novoItem = {
      nome: nome,
      tamanho: 'Único',
      preco: preco,
      quantidade: 1,
      estabelecimentoId: id,
      estabelecimentoNome: estabelecimentoNome,
      estabelecimentoTelefone: estabelecimentoTelefone
    };
    carrinho.push(novoItem);
    mostrarNotificacao('Item adicionado ao carrinho');
  }
  
  salvarCarrinho();
  atualizarCarrinho();
}

function removerDoCarrinho(nome, tamanho, estabelecimentoId) {
  const indexItem = carrinho.findIndex(item => 
    item.nome === nome && 
    item.tamanho === tamanho && 
    item.estabelecimentoId === estabelecimentoId
  );
  
  if (indexItem !== -1) {
    carrinho.splice(indexItem, 1);
    salvarCarrinho();
    atualizarCarrinho();
    mostrarNotificacao('Item removido do carrinho');
  }
}

function alterarQuantidadeItem(nome, tamanho, estabelecimentoId, delta) {
  const item = carrinho.find(i => 
    i.nome === nome && 
    i.tamanho === tamanho && 
    i.estabelecimentoId === estabelecimentoId
  );
  
  if (item) {
    item.quantidade += delta;
    
    if (item.quantidade <= 0) {
      removerDoCarrinho(nome, tamanho, estabelecimentoId);
    } else {
      salvarCarrinho();
      atualizarCarrinho();
    }
  }
}

function limparCarrinho() {
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
  mostrarNotificacao('Carrinho limpo');
}

async function enviarParaPlanilha(dadosPedido) {
  console.log('📊 Enviando para planilha:', dadosPedido);
  
  try {
    const response = await fetch(PLANILHA_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosPedido)
    });
    
    console.log('✅ Dados enviados para a planilha com sucesso!');
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao enviar para planilha:', error);
    return false;
  }
}

function formatarMensagemWhatsApp(grupo) {
  let mensagem = `*PEDIDO - ${grupo.estabelecimentoNome}*\n\n`;
  
  grupo.itens.forEach((item, index) => {
    mensagem += `${index + 1}. ${item.nome}`;
    if (item.tamanho && item.tamanho !== 'Único') {
      mensagem += ` (${item.tamanho})`;
    }
    mensagem += `\n`;
    mensagem += `   Quantidade: ${item.quantidade}x\n`;
    mensagem += `   Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
  });
  
  mensagem += `*TOTAL: R$ ${grupo.total.toFixed(2)}*`;
  
  return encodeURIComponent(mensagem);
}

function finalizarPedidosSeparados() {
  carregarCarrinho();
  
  const grupos = agruparItensPorEstabelecimento();
  const totalEstabelecimentos = Object.keys(grupos).length;
  
  if (totalEstabelecimentos === 0) {
    mostrarModalVazio();
    return;
  }
  
  mostrarModalConfirmacao(grupos, totalEstabelecimentos);
}

function mostrarModalVazio() {
  const modal = criarModal();
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <h3 class="modal-title">Carrinho Vazio</h3>
        <p class="modal-subtitle">Você ainda não adicionou nenhum item ao carrinho.</p>
      </div>
      <div class="modal-actions">
        <button class="modal-btn modal-btn-primary" onclick="fecharModal()">Entendi</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
}

function mostrarModalConfirmacao(grupos, totalEstabelecimentos) {
  const modal = criarModal();
  
  let estabelecimentosLista = '';
  for (const [estabId, grupo] of Object.entries(grupos)) {
    estabelecimentosLista += `
      <div class="modal-info-item">
        <span class="modal-info-label">${grupo.estabelecimentoNome}</span>
        <span class="modal-info-value">R$ ${grupo.total.toFixed(2)}</span>
      </div>
    `;
  }
  
  const totalGeral = Object.values(grupos).reduce((sum, grupo) => sum + grupo.total, 0);
  
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <h3 class="modal-title">Confirmar Pedidos</h3>
        <p class="modal-subtitle">Você será redirecionado para o WhatsApp de cada estabelecimento para concluir seu pedido.</p>
      </div>
      
      <div class="modal-content">
        <div class="modal-info">
          ${estabelecimentosLista}
          <div class="modal-info-item" style="border-top: 2px solid #f97316; margin-top: 12px; padding-top: 12px;">
            <span class="modal-info-label" style="font-weight: 700;">Total Geral</span>
            <span class="modal-info-value" style="color: #f97316; font-size: 16px;">R$ ${totalGeral.toFixed(2)}</span>
          </div>
        </div>
        
        <p style="font-size: 13px; color: #6b7280; text-align: center; margin-top: 16px;">
          ${totalEstabelecimentos} conversa(s) do WhatsApp será(ão) aberta(s)
        </p>
      </div>
      
      <div class="modal-actions">
        <button class="modal-btn modal-btn-secondary" onclick="fecharModal()">Cancelar</button>
        <button class="modal-btn modal-btn-primary" onclick="enviarPedidosWhatsApp()">Confirmar Pedido</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
  
  window.pedidosParaEnviar = grupos;
}

async function enviarPedidosWhatsApp() {
  fecharModal();
  
  const grupos = window.pedidosParaEnviar;
  let contador = 0;
  
  for (const [estabId, grupo] of Object.entries(grupos)) {
    const dadosPlanilha = {
      dataHora: new Date().toLocaleString('pt-BR'),
      restaurante: grupo.estabelecimentoNome,
      telefone: grupo.telefone,
      cliente: 'Cliente WhatsApp',
      itens: grupo.itens.map(item => ({
        nome: item.nome,
        tamanho: item.tamanho,
        quantidade: item.quantidade,
        precoUnitario: item.preco,
        subtotal: item.preco * item.quantidade
      })),
      total: grupo.total,
      status: 'Pendente'
    };
    
    await enviarParaPlanilha(dadosPlanilha);
    
    setTimeout(() => {
      const mensagem = formatarMensagemWhatsApp(grupo);
      
      let telefoneLimpo = grupo.telefone.replace(/\D/g, '');
      
      if (!telefoneLimpo.startsWith('55')) {
        telefoneLimpo = '55' + telefoneLimpo;
      }
      
      if (telefoneLimpo.length < 12) {
        console.error('❌ Telefone inválido:', grupo.telefone, '→', telefoneLimpo);
        alert(`Telefone inválido para ${grupo.estabelecimentoNome}. Por favor, verifique o cadastro.`);
        return;
      }
      
      const url = `https://wa.me/${telefoneLimpo}?text=${mensagem}`;
      console.log('📱 Abrindo WhatsApp:', telefoneLimpo);
      window.open(url, '_blank');
    }, contador * 1500);
    
    contador++;
  }
  
  setTimeout(() => {
    mostrarModalSucesso(contador);
  }, contador * 1500 + 500);
}

function mostrarModalSucesso(totalEnviados) {
  const modal = criarModal();
  modal.innerHTML = `
    <div class="modal-box success-modal">
      <div class="success-icon">✓</div>
      <div class="modal-header">
        <h3 class="modal-title">Pedidos Enviados</h3>
      </div>
      <div class="success-message">
        ${totalEnviados} conversa(s) do WhatsApp foi(ram) aberta(s).<br>
        Os dados também foram salvos na planilha!<br><br>
        Complete as informações de entrega diretamente com cada estabelecimento.
      </div>
      <div class="modal-actions">
        <button class="modal-btn modal-btn-secondary" onclick="fecharModalEManter()">Manter Carrinho</button>
        <button class="modal-btn modal-btn-primary" onclick="fecharModalELimpar()">Limpar Carrinho</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
}

function showToast(titulo, mensagem) {
  mostrarNotificacao(mensagem);
}

function criarModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'customModal';
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      fecharModal();
    }
  });
  
  return modal;
}

function fecharModal() {
  const modal = document.getElementById('customModal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  }
}

function fecharModalEManter() {
  fecharModal();
}

function fecharModalELimpar() {
  limparCarrinho();
  fecharModal();
}

function mostrarNotificacao(mensagem) {
  const notifAnterior = document.querySelector('.cart-notification');
  if (notifAnterior) {
    notifAnterior.remove();
  }
  
  const notificacao = document.createElement('div');
  notificacao.className = 'cart-notification';
  notificacao.textContent = mensagem;
  notificacao.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #f97316, #ff8c42);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
    z-index: 10001;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notificacao);
  
  setTimeout(() => {
    notificacao.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notificacao.remove(), 300);
  }, 2000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

window.addEventListener('storage', function(e) {
  if (e.key === 'carrinho') {
    carregarCarrinho();
    atualizarCarrinho();
  }
});

window.addEventListener('carrinhoAtualizado', function() {
  carregarCarrinho();
  atualizarCarrinho();
});

window.addEventListener('focus', function() {
  carregarCarrinho();
  atualizarCarrinho();
});

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    carregarCarrinho();
    atualizarCarrinho();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  console.log(' cart-sync.js inicializado com integração Google Sheets!');
  carregarCarrinho();
  atualizarCarrinho();
  
  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) {
    cartIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleCart();
    });
  }
  
  document.addEventListener('click', function(e) {
    const cartIcon = document.getElementById('cartIcon');
    const cartDropdown = document.getElementById('cartDropdown');
    
    if (cartIcon && cartDropdown && !cartIcon.contains(e.target)) {
      cartDropdown.classList.remove('show');
    }
  });
});

setInterval(function() {
  const carrinhoAtual = JSON.stringify(carrinho);
  const carrinhoStorage = localStorage.getItem('carrinho');
  
  if (carrinhoAtual !== carrinhoStorage) {
    carregarCarrinho();
    atualizarCarrinho();
  }
}, 5000);
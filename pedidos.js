const PLANILHA_URL = 'https://script.google.com/macros/s/AKfycbzBFmLbAaCgAPQZ3yznTppDY7K41ilQsucCUuXfHUHKI2WeMyZK0CThqrpCtnaDaizv/exec';

let carrinho = [];

// ============================================
// FUNÇÕES DE CARRINHO
// ============================================

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
        id: estabId,
        estabelecimentoNome: item.estabelecimentoNome || 'Estabelecimento',
        telefone: item.estabelecimentoTelefone || '94906183',
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
    headerDiv.innerHTML = `<i class="fas fa-store"></i> ${grupo.estabelecimentoNome}`;
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
  console.log('🛒 Adicionando ao carrinho:', { nome, tamanho, preco, estabelecimentoId });
  
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
      estabelecimentoTelefone: estabelecimentoTelefone || '94906183'
    };
    carrinho.push(novoItem);
    mostrarNotificacao('Item adicionado ao carrinho');
  }
  
  salvarCarrinho();
  atualizarCarrinho();
}

function adicionarLancheAoCarrinho(nome, preco) {
  console.log('🍔 Adicionando lanche:', nome);
  
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));
  
  let estabelecimentoNome = 'Estabelecimento';
  let estabelecimentoTelefone = '94906183';
  
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

// ============================================
// INTEGRAÇÃO COM PLANILHA GOOGLE
// ============================================

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
    
    console.log('✅ Dados enviados para a planilha!');
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao enviar para planilha:', error);
    return false;
  }
}

// ============================================
// SISTEMA DE PEDIDOS VIA WHATSAPP
// ============================================

function formatarMensagemWhatsApp(grupo, dadosCliente) {
  let mensagem = `🍕 *NOVO PEDIDO - OPALA FOOD*\n\n`;
  mensagem += `📍 *${grupo.estabelecimentoNome}*\n`;
  mensagem += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Dados do cliente
  mensagem += `👤 *DADOS DO CLIENTE*\n`;
  mensagem += `Nome: ${dadosCliente.nome}\n`;
  mensagem += `Telefone: ${dadosCliente.telefone}\n`;
  
  if (dadosCliente.email) {
    mensagem += `Email: ${dadosCliente.email}\n`;
  }
  
  mensagem += `\n━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Itens do pedido
  mensagem += `🛒 *ITENS DO PEDIDO*\n\n`;
  
  grupo.itens.forEach((item, index) => {
    mensagem += `${index + 1}. *${item.nome}*\n`;
    mensagem += `   Quantidade: ${item.quantidade}x\n`;
    mensagem += `   Preço unitário: R$ ${item.preco.toFixed(2)}\n`;
    
    if (item.tamanho && item.tamanho !== 'Único') {
      mensagem += `   Tamanho: ${item.tamanho}\n`;
    }
    
    if (item.observacoes) {
      mensagem += `   Obs: ${item.observacoes}\n`;
    }
    
    mensagem += `   Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
  });
  
  mensagem += `━━━━━━━━━━━━━━━━━━━━\n`;
  mensagem += `💰 *TOTAL: R$ ${grupo.total.toFixed(2)}*\n`;
  mensagem += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Informações de retirada
  mensagem += `📦 *TIPO DE PEDIDO*\n`;
  mensagem += `⚠️ Encomenda para retirada presencial\n\n`;
  
  if (dadosCliente.dataRetirada) {
    mensagem += `📅 Data de retirada: ${dadosCliente.dataRetirada}\n`;
  }
  
  if (dadosCliente.horarioRetirada) {
    mensagem += `🕐 Horário: ${dadosCliente.horarioRetirada}\n`;
  }
  
  if (dadosCliente.observacoesGerais) {
    mensagem += `\n📝 *Observações gerais:*\n${dadosCliente.observacoesGerais}\n`;
  }
  
  mensagem += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  mensagem += `✅ Pedido realizado via OpalaFood`;
  
  return encodeURIComponent(mensagem);
}

function abrirModalDadosCliente(callback) {
  const modalHTML = `
    <div class="modal-overlay show" id="modalDadosCliente">
      <div class="modal-box" style="max-width: 550px;">
        <div class="modal-header">
          <h2 class="modal-title">📋 Dados para Encomenda</h2>
          <p class="modal-subtitle">Preencha seus dados para finalizar a encomenda</p>
        </div>
        
        <div class="modal-content">
          <form id="formDadosCliente" style="display: flex; flex-direction: column; gap: 16px;">
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <label style="font-weight: 600; color: #333; font-size: 14px;">
                Nome completo <span style="color: #f97316;">*</span>
              </label>
              <input 
                type="text" 
                id="nomeCliente" 
                required
                placeholder="Seu nome"
                style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: border-color 0.3s;"
                onfocus="this.style.borderColor='#f97316'"
                onblur="this.style.borderColor='#e5e7eb'"
              />
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <label style="font-weight: 600; color: #333; font-size: 14px;">
                Telefone <span style="color: #f97316;">*</span>
              </label>
              <input 
                type="tel" 
                id="telefoneCliente" 
                required
                placeholder="(86) 99999-9999"
                style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: border-color 0.3s;"
                onfocus="this.style.borderColor='#f97316'"
                onblur="this.style.borderColor='#e5e7eb'"
              />
            </div>
            
            <div style="display: flex; flex-direction: cohtlumn; gap: 8px;">
              <label style="font-weight: 600; color: #333; font-size: 14px;">
                Email (opcional)
              </label>
              <input 
                type="email" 
                id="emailCliente"
                placeholder="seu@email.com"
                style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: border-color 0.3s;"
                onfocus="this.style.borderColor='#f97316'"
                onblur="this.style.borderColor='#e5e7eb'"
              />
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <label style="font-weight: 600; color: #333; font-size: 14px;">
                  Data de retirada
                </label>ht
                <input 
                  type="date" 
                  id="dataRetirada"
                  style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: border-color 0.3s;"
                  onfocus="this.style.borderColor='#f97316'"
                  onblur="this.style.borderColor='#e5e7eb'"
                />
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <label style="font-weight: 600; color: ht#333; font-size: 14px;">
                  Horário
                </label>
                <input 
                  type="time" 
                  id="horarioRetirada"
                  style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: border-color 0.3s;"
                  onfocus="this.style.borderColor='#f97316'"
                  onblur="this.style.borderColor='#e5e7eb'"
                />
              </div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <label style="font-weight: 600; color: #333; font-size: 14px;">
                Observações gerais
              </label>
              <textarea 
                id="observacoesGerais"
                rows="3"
                placeholder="Alguma informação adicional sobre seu pedido..."
                style="padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; resize: vertical; transition: border-color 0.3s; font-family: inherit;"
                onfocus="this.style.borderColor='#f97316'"
                onblur="this.style.borderColor='#e5e7eb'"
              ></textarea>
            </div>
            
          </form>
        </div>
        
        <div class="modal-actions" style="margin-top: 24px;">
          <button 
            type="button" 
            class="modal-btn modal-btn-secondary" 
            onclick="fecharModalDadosCliente()"
          >
            Cancelar
          </button>
          <button 
            type="button" 
            class="modal-btn modal-btn-primary" 
            onclick="confirmarDadosCliente()"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Máscara para telefone
  const telInput = document.getElementById('telefoneCliente');
  telInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    }
    e.target.value = value;
  });
  
  // Define data mínima como hoje
  const dataInput = document.getElementById('dataRetirada');
  const hoje = new Date().toISOString().split('T')[0];
  dataInput.min = hoje;
  
  window.callbackDadosCliente = callback;
}

function fecharModalDadosCliente() {
  const modal = document.getElementById('modalDadosCliente');
  if (modal) {
    modal.remove();
  }
}

function confirmarDadosCliente() {
  const nome = document.getElementById('nomeCliente').value.trim();
  const telefone = document.getElementById('telefoneCliente').value.trim();
  const email = document.getElementById('emailCliente').value.trim();
  const dataRetirada = document.getElementById('dataRetirada').value;
  const horarioRetirada = document.getElementById('horarioRetirada').value;
  const observacoesGerais = document.getElementById('observacoesGerais').value.trim();
  
  if (!nome) {
    alert('Por favor, preencha seu nome');
    document.getElementById('nomeCliente').focus();
    return;
  }
  
  if (!telefone) {
    alert('Por favor, preencha seu telefone');
    document.getElementById('telefoneCliente').focus();
    return;
  }
  
  const dadosCliente = {
    nome,
    telefone,
    email,
    dataRetirada: dataRetirada ? new Date(dataRetirada + 'T00:00:00').toLocaleDateString('pt-BR') : null,
    horarioRetirada,
    observacoesGerais
  };
  
  fecharModalDadosCliente();
  
  if (window.callbackDadosCliente) {
    window.callbackDadosCliente(dadosCliente);
  }
}

function mostrarModalResumo(grupos, dadosCliente, callback) {
  let itensHTML = '';
  
  Object.values(grupos).forEach(est => {
    itensHTML += `
      <div class="modal-info" style="margin-bottom: 16px;">
        <h4 style="color: #f97316; margin-bottom: 12px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-store"></i> ${est.estabelecimentoNome}
        </h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${est.itens.map(item => `
            <div style="display: flex; justify-content: space-between; font-size: 14px;">
              <span>${item.quantidade}x ${item.nome}${item.tamanho && item.tamanho !== 'Único' ? ` (${item.tamanho})` : ''}</span>
              <span style="font-weight: 600;">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
            </div>
          `).join('')}
          <div style="border-top: 2px solid #f97316; padding-top: 8px; margin-top: 8px; display: flex; justify-content: space-between; font-weight: 700;">
            <span>Subtotal:</span>
            <span style="color: #f97316;">R$ ${est.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    `;
  });
  
  const totalGeral = Object.values(grupos).reduce((sum, est) => sum + est.total, 0);
  
  const modalHTML = `
    <div class="modal-overlay show" id="modalResumo">
      <div class="modal-box" style="max-width: 500px;">
        <div class="modal-header">
          <h2 class="modal-title">📦 Confirmar Encomenda</h2>
          <p class="modal-subtitle">Revise seu pedido antes de enviar</p>
        </div>
        
        <div class="modal-content" style="max-height: 400px; overflow-y: auto;">
          <div class="modal-info" style="background: #f0fdf4; border-left-color: #10b981; margin-bottom: 20px;">
            <div style="font-weight: 600; margin-bottom: 8px;">👤 ${dadosCliente.nome}</div>
            <div style="font-size: 13px; color: #666;">📞 ${dadosCliente.telefone}</div>
            ${dadosCliente.dataRetirada ? `<div style="font-size: 13px; color: #666;">📅 ${dadosCliente.dataRetirada} ${dadosCliente.horarioRetirada ? `às ${dadosCliente.horarioRetirada}` : ''}</div>` : ''}
          </div>
          
          ${itensHTML}
          
          <div class="modal-info" style="background: linear-gradient(135deg, #fff7ed, #ffedd5); border-left-color: #f97316;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 18px; font-weight: 700;">TOTAL GERAL</span>
              <span style="font-size: 22px; font-weight: 700; color: #f97316;">R$ ${totalGeral.toFixed(2)}</span>
            </div>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 12px; margin-top: 16px;">
            <div style="display: flex; gap: 8px; align-items: start;">
              <i class="fas fa-info-circle" style="color: #f59e0b; margin-top: 2px;"></i>
              <div style="font-size: 13px; color: #78350f;">
                <strong>Importante:</strong> Você será redirecionado para o WhatsApp de cada estabelecimento. Aguarde a confirmação antes de fechar as conversas.
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button 
            class="modal-btn modal-btn-secondary" 
            onclick="document.getElementById('modalResumo').remove()"
          >
            Voltar
          </button>
          <button 
            class="modal-btn modal-btn-primary" 
            onclick="confirmarEnvioResumo()"
          >
            <i class="fab fa-whatsapp"></i> Enviar Pedidos
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  window.callbackResumo = callback;
}

function confirmarEnvioResumo() {
  const modal = document.getElementById('modalResumo');
  if (modal) {
    modal.remove();
  }
  
  if (window.callbackResumo) {
    window.callbackResumo();
  }
}

async function enviarPedidosWhatsApp(grupos, dadosCliente) {
  let contador = 0;
  let erros = [];
  
  for (const [estabId, grupo] of Object.entries(grupos)) {
    // Envia para planilha
    const dadosPlanilha = {
      dataHora: new Date().toLocaleString('pt-BR'),
      restaurante: grupo.estabelecimentoNome,
      telefone: grupo.telefone,
      cliente: dadosCliente.nome,
      clienteTelefone: dadosCliente.telefone,
      clienteEmail: dadosCliente.email || '',
      dataRetirada: dadosCliente.dataRetirada || '',
      horarioRetirada: dadosCliente.horarioRetirada || '',
      observacoes: dadosCliente.observacoesGerais || '',
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
    
    // Abre WhatsApp com delay
    setTimeout(() => {
      try {
        const mensagem = formatarMensagemWhatsApp(grupo, dadosCliente);
        
        let telefoneLimpo = grupo.telefone.replace(/\D/g, '');
        
        if (!telefoneLimpo.startsWith('55')) {
          telefoneLimpo = '55' + telefoneLimpo;
        }
        
        if (telefoneLimpo.length < 12) {
          console.error('❌ Telefone inválido:', grupo.telefone);
          erros.push(grupo.estabelecimentoNome);
          return;
        }
        
        const url = `https://wa.me/${telefoneLimpo}?text=${mensagem}`;
        console.log('📱 Abrindo WhatsApp:', telefoneLimpo);
        window.open(url, '_blank');
        
        contador++;
      } catch (error) {
        console.error('Erro ao enviar pedido:', error);
        erros.push(grupo.estabelecimentoNome);
      }
    }, contador * 1500);
    
    contador++;
  }
  
  // Mostra modal de sucesso após todos os envios
  setTimeout(() => {
    mostrarModalSucesso(contador, erros);
  }, contador * 1500 + 500);
}

function mostrarModalSucesso(quantidade, erros) {
  const modalHTML = `
    <div class="modal-overlay show success-modal" id="modalSucesso">
      <div class="modal-box" style="text-align: center;">
        <div class="success-icon" style="width: 64px; height: 64px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 32px; color: white;">
          <i class="fas fa-check"></i>
        </div>
        <h2 class="modal-title" style="color: #10b981; margin-bottom: 12px;">Pedido${quantidade > 1 ? 's' : ''} Enviado${quantidade > 1 ? 's' : ''}!</h2>
        <p class="success-message" style="font-size: 16px; color: #6b7280; line-height: 1.6; margin: 16px 0;">
          ${quantidade > 1 
            ? `Seus ${quantidade} pedidos foram enviados com sucesso!` 
            : 'Seu pedido foi enviado com sucesso!'
          }
        </p>
        ${erros.length > 0 ? `
          <div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 12px; margin: 16px 0;">
            <p style="color: #991b1b; font-size: 14px; margin: 0;">
              <i class="fas fa-exclamation-triangle"></i> 
              Não foi possível enviar para: ${erros.join(', ')}
            </p>
          </div>
        ` : ''}
        <p style="color: #6b7280; font-size: 14px; margin-top: 12px;">
          Os dados foram salvos na planilha. Aguarde a confirmação do${quantidade > 1 ? 's' : ''} estabelecimento${quantidade > 1 ? 's' : ''} pelo WhatsApp.
        </p>
        <div class="modal-actions" style="margin-top: 24px; gap: 12px;">
          <button 
            class="modal-btn modal-btn-secondary" 
            onclick="fecharModalEManter()"
            style="flex: 1;"
          >
            Manter Carrinho
          </button>
          <button 
            class="modal-btn modal-btn-primary" 
            onclick="fecharModalELimpar()"
            style="flex: 1;"
          >
            Limpar Carrinho
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function fecharModalEManter() {
  const modal = document.getElementById('modalSucesso');
  if (modal) {
    modal.remove();
  }
  
  // Fecha o dropdown do carrinho
  const cartDropdown = document.getElementById('cartDropdown');
  if (cartDropdown) {
    cartDropdown.classList.remove('show');
  }
}

function fecharModalELimpar() {
  limparCarrinho();
  
  const modal = document.getElementById('modalSucesso');
  if (modal) {
    modal.remove();
  }
  
  // Fecha o dropdown do carrinho
  const cartDropdown = document.getElementById('cartDropdown');
  if (cartDropdown) {
    cartDropdown.classList.remove('show');
  }
}

// ============================================
// FUNÇÃO PRINCIPAL - FINALIZAR PEDIDOS
// ============================================

function finalizarPedidosSeparados() {
  carregarCarrinho();
  
  if (carrinho.length === 0) {
    mostrarModalVazio();
    return;
  }
  
  const grupos = agruparItensPorEstabelecimento();
  
  // Abre modal para coletar dados do cliente
  abrirModalDadosCliente((dadosCliente) => {
    // Mostra resumo para confirmação
    mostrarModalResumo(grupos, dadosCliente, () => {
      // Envia pedidos via WhatsApp
      enviarPedidosWhatsApp(grupos, dadosCliente);
    });
  });
}

function mostrarModalVazio() {
  const modal = `
    <div class="modal-overlay show" id="modalVazio">
      <div class="modal-box" style="text-align: center;">
        <div style="font-size: 64px; color: #d1d5db; margin-bottom: 20px;">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <h3 class="modal-title">Carrinho Vazio</h3>
        <p style="color: #6b7280; margin: 16px 0;">
          Você ainda não adicionou nenhum item ao carrinho.
        </p>
        <div class="modal-actions" style="margin-top: 24px;">
          <button 
            class="modal-btn modal-btn-primary" 
            onclick="document.getElementById('modalVazio').remove()"
            style="width: 100%;"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modal);
}

// ============================================
// NOTIFICAÇÕES
// ============================================

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

// Adiciona estilos de animação
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

// ============================================
// EVENT LISTENERS E SINCRONIZAÇÃO
// ============================================

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
  console.log('🚀 Cart-sync.js inicializado com WhatsApp integrado!');
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

// Sincronização periódica
setInterval(function() {
  const carrinhoAtual = JSON.stringify(carrinho);
  const carrinhoStorage = localStorage.getItem('carrinho');
  
  if (carrinhoAtual !== carrinhoStorage) {
    carregarCarrinho();
    atualizarCarrinho();
  }
}, 5000);

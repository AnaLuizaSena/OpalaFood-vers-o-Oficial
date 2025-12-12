// ============================================
// BANCO DE DADOS DE ESTABELECIMENTOS DE ENCOMENDAS
// ============================================

const ENCOMENDAS_DATA = {
  1: {
    id: 1,
    nome: "Pizzaria do Chiquin - Encomendas",
    categoria: "pizzarias",
    
    imagem: "pizzaria1.jpg",
    logo: "logo-pizzaria.jpg",
    
    endereco: "Av. José Lourenço Mourão, 402 - Pedro II, PI",
    bairro: "Centro",
    cep: "64255-000",
    cidade: "Pedro II",
    estado: "PI",
    
    telefone: "(86) 98187-2141",
    telefoneFixo: "(86) 98187-2141",
    whatsapp: "5586981872141",
    email: "contato@pizzariadochiquin.com",
    instagram: "@pizzariadochiquin",
    
    rating: 5.00,
    totalAvaliacoes: 50,
    
    // HORÁRIO DE FUNCIONAMENTO PARA ENCOMENDAS
    horarioAberturaHora: 8,
    horarioAberturaMin: 0,
    horarioFechamentoHora: 18,
    horarioFechamentoMin: 0,
    diasFuncionamento: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    
    // INFORMAÇÕES ESPECÍFICAS DE ENCOMENDA
    prazoMinimoEncomenda: "24 horas",
    prazoMaximoEncomenda: "7 dias",
    pedidoMinimo: 50.00,
    
    // NÃO FAZ ENTREGA - APENAS RETIRADA
    fazEntrega: false,
    fazRetirada: true,
    
    formasPagamento: ["Dinheiro", "Débito", "Crédito", "PIX", "Transferência"],
    aceitaSinal: true, // Se aceita sinal/entrada
    valorMinimoSinal: 20.00, // Valor mínimo do sinal (%)
    
    descricao: "Encomendas especiais de pizzas para festas e eventos. Pedidos com antecedência mínima de 24 horas.",
    
    especialidades: [
      "Pizzas gigantes para festas",
      "Kits de pizzas variadas",
      "Pizzas personalizadas",
      "Combos para eventos"
    ],

    // CATÁLOGO DE ENCOMENDAS
    catalogo: {
      "Pizzas Gigantes": [
        {
          id: 1,
          nome: "Pizza Gigante Calabresa",
          descricao: "Pizza de 50cm com calabresa artesanal, cebola roxa e azeitonas. Serve 10-12 pessoas.",
          imagem: "pizza-gigante-calabresa.png",
          categoria: "Pizza Gigante",
          disponivel: true,
          preco: 89.90,
          servePessoas: "10-12",
          prazoMinimo: "48 horas"
        },
        {
          id: 2,
          nome: "Pizza Gigante Portuguesa",
          descricao: "Pizza de 50cm completa com presunto, ovos, cebola, pimentão e azeitonas. Serve 10-12 pessoas.",
          imagem: "pizza-gigante-portuguesa.png",
          categoria: "Pizza Gigante",
          disponivel: true,
          preco: 99.90,
          servePessoas: "10-12",
          prazoMinimo: "48 horas"
        }
      ],
      "Kits para Festas": [
        {
          id: 3,
          nome: "Kit Festa 20 pessoas",
          descricao: "4 pizzas grandes (2 salgadas + 2 doces) + 4 refrigerantes 2L",
          imagem: "kit-festa-20.png",
          categoria: "Kit Festa",
          disponivel: true,
          preco: 179.90,
          servePessoas: "20",
          prazoMinimo: "48 horas",
          itensInclusos: [
            "2 Pizzas Grandes Salgadas (sabores a escolher)",
            "2 Pizzas Grandes Doces (sabores a escolher)",
            "4 Refrigerantes 2L"
          ]
        },
        {
          id: 4,
          nome: "Kit Festa 40 pessoas",
          descricao: "8 pizzas grandes (5 salgadas + 3 doces) + 8 refrigerantes 2L",
          imagem: "kit-festa-40.png",
          categoria: "Kit Festa",
          disponivel: true,
          preco: 329.90,
          servePessoas: "40",
          prazoMinimo: "72 horas",
          itensInclusos: [
            "5 Pizzas Grandes Salgadas (sabores a escolher)",
            "3 Pizzas Grandes Doces (sabores a escolher)",
            "8 Refrigerantes 2L"
          ]
        }
      ],
      "Pizzas Personalizadas": [
        {
          id: 5,
          nome: "Pizza Personalizada Grande",
          descricao: "Monte sua pizza com até 5 ingredientes à sua escolha",
          imagem: "pizza-personalizada.png",
          categoria: "Pizza Personalizada",
          disponivel: true,
          preco: 65.90,
          prazoMinimo: "48 horas",
          observacoes: "Entre em contato para escolher os ingredientes"
        }
      ]
    },
    
    // OFERTAS ESPECIAIS
    ofertas: [
      {
        nome: "Kit Aniversário Completo",
        descricao: "6 Pizzas Grandes + 6 Refrigerantes 2L + Decoração temática",
        precoOriginal: 280.00,
        precoPromocao: 249.90,
        ativo: true,
        prazoMinimo: "72 horas"
      }
    ],

    // INFORMAÇÕES ADICIONAIS
    informacoesAdicionais: [
      "Todas as encomendas requerem contato prévio via WhatsApp",
      "Aceitamos sinal de 20% do valor total",
      "Retirada no local no horário combinado",
      "Consulte disponibilidade para datas especiais",
      "Possibilidade de personalização mediante consulta"
    ]
  },
  

    2: {
    id: 2,
    nome: "NOME DO ESTABELECIMENTO - Encomendas",
    categoria: "lanchonetes", // pizzarias, lanchonetes, docerias, etc
    
    imagem: "NOME_DA_IMAGEM.jpg",
    logo: "NOME_DO_LOGO.jpg",
    
    endereco: "ENDEREÇO COMPLETO",
    bairro: "BAIRRO",
    cep: "00000-000",
    cidade: "CIDADE",
    estado: "UF",
    
    telefone: "(00) 00000-0000",
    telefoneFixo: "(00) 0000-0000",
    whatsapp: "55000000000000", // Código do país + DDD + número
    email: "email@estabelecimento.com",
    instagram: "@instagram",
    
    rating: 0.0,
    totalAvaliacoes: 0,
    
    horarioAberturaHora: 8,
    horarioAberturaMin: 0,
    horarioFechamentoHora: 18,
    horarioFechamentoMin: 0,
    diasFuncionamento: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    
    prazoMinimoEncomenda: "24 horas",
    prazoMaximoEncomenda: "15 dias",
    pedidoMinimo: 30.00,
    
    fazEntrega: false,
    fazRetirada: true,
    
    formasPagamento: ["Dinheiro", "PIX"],
    aceitaSinal: true,
    valorMinimoSinal: 20.00,
    
    descricao: "DESCRIÇÃO DO ESTABELECIMENTO E TIPO DE ENCOMENDAS",
    
    especialidades: [
      "Especialidade 1",
      "Especialidade 2",
      "Especialidade 3"
    ],

    catalogo: {
      "Categoria 1": [
        {
          id: 1,
          nome: "Nome do Produto",
          descricao: "Descrição detalhada",
          imagem: "imagem.png",
          categoria: "Categoria",
          disponivel: true,
          preco: 0.0,
          servePessoas: "0-0",
          prazoMinimo: "24 horas"
        }
      ]
    },
    
    ofertas: [],

    informacoesAdicionais: [
      "Informação 1",
      "Informação 2"
    ]
  },
  
  3: {
    id: 2,
    nome: "NOME DO ESTABELECIMENTO - Encomendas",
    categoria: "lanchonetes", // pizzarias, lanchonetes, docerias, etc
    
    imagem: "NOME_DA_IMAGEM.jpg",
    logo: "NOME_DO_LOGO.jpg",
    
    endereco: "ENDEREÇO COMPLETO",
    bairro: "BAIRRO",
    cep: "00000-000",
    cidade: "CIDADE",
    estado: "UF",
    
    telefone: "(00) 00000-0000",
    telefoneFixo: "(00) 0000-0000",
    whatsapp: "55000000000000", // Código do país + DDD + número
    email: "email@estabelecimento.com",
    instagram: "@instagram",
    
    rating: 0.0,
    totalAvaliacoes: 0,
    
    horarioAberturaHora: 8,
    horarioAberturaMin: 0,
    horarioFechamentoHora: 18,
    horarioFechamentoMin: 0,
    diasFuncionamento: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    
    prazoMinimoEncomenda: "24 horas",
    prazoMaximoEncomenda: "15 dias",
    pedidoMinimo: 30.00,
    
    fazEntrega: false,
    fazRetirada: true,
    
    formasPagamento: ["Dinheiro", "PIX"],
    aceitaSinal: true,
    valorMinimoSinal: 20.00,
    
    descricao: "DESCRIÇÃO DO ESTABELECIMENTO E TIPO DE ENCOMENDAS",
    
    especialidades: [
      "Especialidade 1",
      "Especialidade 2",
      "Especialidade 3"
    ],

    catalogo: {
      "Categoria 1": [
        {
          id: 1,
          nome: "Nome do Produto",
          descricao: "Descrição detalhada",
          imagem: "imagem.png",
          categoria: "Categoria",
          disponivel: true,
          preco: 0.0,
          servePessoas: "0-0",
          prazoMinimo: "24 horas"
        }
      ]
    },
    
    ofertas: [],

    informacoesAdicionais: [
      "Informação 1",
      "Informação 2"
    ]
  }
};

// Função auxiliar para calcular preços (como no arquivo original)
function calcularPrecosEncomenda(estabelecimento) {
  const precos = [];
  
  Object.values(estabelecimento.catalogo).forEach(categoria => {
    categoria.forEach(item => {
      if (item.preco) precos.push(item.preco);
    });
  });
  
  if (precos.length > 0) {
    estabelecimento.precoMinimo = Math.min(...precos);
    estabelecimento.precoMaximo = Math.max(...precos);
    estabelecimento.precoMedio = precos.reduce((a, b) => a + b, 0) / precos.length;
    estabelecimento.precoMedio = parseFloat(estabelecimento.precoMedio.toFixed(2));
  } else {
    estabelecimento.precoMinimo = 0;
    estabelecimento.precoMaximo = 0;
    estabelecimento.precoMedio = 0;
  }
  
  return estabelecimento;
}

// Calcular preços para todos os estabelecimentos
Object.keys(ENCOMENDAS_DATA).forEach(id => {
  ENCOMENDAS_DATA[id] = calcularPrecosEncomenda(ENCOMENDAS_DATA[id]);
});
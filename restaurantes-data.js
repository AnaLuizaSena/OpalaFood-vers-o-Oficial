// ============================================
// BANCO DE DADOS DE RESTAURANTES
// ============================================
// Quando tiver os dados reais, é só preencher aqui

const RESTAURANTES_DATA = {
  1: {
    id: 1,
    nome: "Pizzaria do Chiquin",
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
    whatsapp: "5586981872141", // Bota o caralho do código do país
    email: "contato@pizzariadochiquin.com",
    instagram: "@pizzariadochiquin",
    
    rating: 5.00,
    totalAvaliacoes: 248,
    
    horarioAberturaHora: 18,
    horarioAberturaMin: 0,
    horarioFechamentoHora: 23,
    horarioFechamentoMin: 30,
    diasFuncionamento: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
    
    tempoEntrega: "25-30",
    taxaEntrega: 3.50,
    pedidoMinimo: 25.00,
    fazEntrega: true,
    fazRetirada: true,
    
    formasPagamento: ["Dinheiro", "Débito", "Crédito", "PIX"],
    aceitaTroco: true,
    
    bairrosEntrega: ["Centro", "Zona Sul", "Vila Nova", "São José"],
    
    descricao: "Descubra os sabores únicos das nossas pizzas artesanais, preparadas com ingredientes frescos e selecionados.",
    
    taxaPizzaMista: 5.00,

    // CARDÁPIO
    cardapio: {
      "Pizzas Salgadas": [
        {
          id: 1,
          nome: "Margherita",
          descricao: "Clássica italiana com molho de tomate, mussarela de búfala, rodelas de tomate fresco, manjericão e orégano.",
          imagem: "margherita.png",
          categoria: "Pizza Salgada",
          disponivel: true,
          pequena: 28.90,
          media: 38.90,
          grande: 48.90,
          ingredientes: ["Molho de tomate", "Mussarela de búfala", "Tomate", "Manjericão", "Orégano"]
        },
        {
          id: 2,
          nome: "Calabresa",
          descricao: "Tradicional brasileira com molho de tomate, mussarela, calabresa artesanal fatiada, cebola roxa e orégano.",
          imagem: "calabresa.png",
          categoria: "Pizza Salgada",
          disponivel: true,
          pequena: 26.90,
          media: 35.90,
          grande: 44.90,
          ingredientes: ["Molho de tomate", "Mussarela", "Calabresa", "Cebola", "Orégano"]
        },
        {
          id: 3,
          nome: "Portuguesa",
          descricao: "Completa e saborosa com molho de tomate, mussarela, presunto, ovo cozido, cebola, pimentão, azeitonas e orégano.",
          imagem: "portuguesa.png",
          categoria: "Pizza Salgada",
          disponivel: true,
          pequena: 32.90,
          media: 42.90,
          grande: 52.90,
          ingredientes: ["Molho de tomate", "Mussarela", "Presunto", "Ovo", "Cebola", "Pimentão", "Azeitona", "Orégano"]
        }
      ],
      "Pizzas Doces": [
        {
          id: 4,
          nome: "Chocolate",
          descricao: "Irresistível cobertura de chocolate ao leite derretido com granulado crocante e pedaços de morango fresco.",
          imagem: "chocolate.png",
          categoria: "Pizza Doce",
          disponivel: true,
          pequena: 26.90,
          media: 35.90,
          grande: 44.90,
          ingredientes: ["Chocolate ao leite", "Granulado", "Morango"]
        },
        {
          id: 5,
          nome: "Romeu e Julieta",
          descricao: "Clássica combinação brasileira com goiabada artesanal derretida e lascas generosas de queijo branco cremoso.",
          imagem: "romeu.png",
          categoria: "Pizza Doce",
          disponivel: true,
          pequena: 28.90,
          media: 37.90,
          grande: 46.90,
          ingredientes: ["Goiabada", "Queijo branco"]
        }
      ],
      "Bebidas": [
        {
          id: 6,
          nome: "Coca-Cola 2L",
          descricao: "Refrigerante Coca-Cola 2 litros",
          imagem: "coca.png",
          categoria: "Bebida",
          disponivel: true,
          preco: 8.00
        },
        {
          id: 7,
          nome: "Guaraná Antarctica 2L",
          descricao: "Refrigerante Guaraná Antarctica 2 litros",
          imagem: "guarana.png",
          categoria: "Bebida",
          disponivel: true,
          preco: 7.50
        }
      ]
    },
    
    // OFERTAS ESPECIAIS
    ofertas: [
      {
        nome: "Pizza Família",
        descricao: "Pizza Grande + 2 Refrigerantes + Sobremesa",
        precoOriginal: 65.00,
        precoPromocao: 49.90,
        ativo: true
      },
      {
        nome: "Combo Casal",
        descricao: "Pizza Média + 2 Refrigerantes",
        precoOriginal: 45.00,
        precoPromocao: 35.90,
        ativo: true
      }
    ]
  },
  
 
  2: {
    id: 2,
    nome: "NOME DO RESTAURANTE",
    categoria: "pizzarias", 
    imagem: "lanchonete1.jpeg",
    logo: "NOME_DO_LOGO.jpg",
    endereco: "ENDEREÇO COMPLETO",
    bairro: "BAIRRO",
    cep: "00000-000",
    cidade: "CIDADE",
    estado: "UF",
    telefone: "(00) 00000-0000",
    telefoneFixo: "(00) 0000-0000",
    whatsapp: "55000000000000",
    email: "email@restaurante.com",
    instagram: "@instagram",
    rating: 0.0,
    totalAvaliacoes: 0,
    horarioAberturaHora: 0,
    horarioAberturaMin: 0,
    horarioFechamentoHora: 0,
    horarioFechamentoMin: 0,
    diasFuncionamento: [],
    tempoEntrega: "00-00",
    taxaEntrega: 0.00,
    pedidoMinimo: 0.00,
    fazEntrega: true,
    fazRetirada: true,
    formasPagamento: [],
    aceitaTroco: true,
    bairrosEntrega: [],
    descricao: "DESCRIÇÃO",
    cardapio: {
      "Pizzas Doces": [
        {
          id: 4,
          nome: "Chocolate",
          descricao: "Irresistível cobertura de chocolate ao leite derretido com granulado crocante e pedaços de morango fresco.",
          imagem: "chocolate.png",
          categoria: "Pizza Doce",
          disponivel: true,
          pequena: 26.90,
          media: 35.90,
          grande: 44.90,
          ingredientes: ["Chocolate ao leite", "Granulado", "Morango"]
        },
        {
          id: 5,
          nome: "Romeu e Julieta",
          descricao: "Clássica combinação brasileira com goiabada artesanal derretida e lascas generosas de queijo branco cremoso.",
          imagem: "romeu.png",
          categoria: "Pizza Doce",
          disponivel: true,
          pequena: 28.90,
          media: 37.90,
          grande: 46.90,
          ingredientes: ["Goiabada", "Queijo branco"]
        }
      ],
    },
    ofertas: []
  },

  3: {
    id: 3,
    nome: "Kombi Burguer",
    categoria: "lanchonetes", 
    imagem: "lanchonete 1.jpeg",
    endereco: "R. João Benício da Silva, 243-165 - Pedro II,  PI",
    bairro: "Centro",
    cep: "64255-000",
    cidade: "Pedro II",
    estado: "PI",
    telefone: "(86) 99573-2715",
    telefoneFixo: "Indefinido",
    whatsapp: "5586995732715",
    email: "indefinido",
    instagram: "@kombiburguer2025",
    rating: 0,
    totalAvaliacoes: 0,
    horarioAberturaHora: 18,
    horarioAberturaMin: 0,
    horarioFechamentoHora: 0,
    horarioFechamentoMin: 0,
    diasFuncionamento: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
    tempoEntrega: "20-30",
    taxaEntrega: 3.00,
    pedidoMinimo: 0.00,
    fazEntrega: true,
    fazRetirada: true,
    formasPagamento: ["Aceitamos todas as formas de pagamento"],
    aceitaTroco: true,
    bairrosEntrega: ["Centro", "Toda a cidade"],
    descricao: "Carne artesanal tem acréscimo de R$ 3,00",
    cardapio: {
      "Lanches": [
        {
          id: 1,
          nome: "X-Tudo",
          descricao: "Carne, bacon, ovo, alface, tomate, batata palha, queijo, presunto, maionese temperada.",
          categoria: "Lanche",
          disponivel: true,
          preco: 17.00
        },
        
        {
          id: 2,
          nome: "X-Salada",
          descricao: "Carne, queijo, presunto, alface, tomate, maionese temperada.",
          categoria: "Lanche",
          disponivel: true,
          preco: 13.00
        },

        {
          id: 3,
          nome: "X-Simples",
          descricao: "Carne, queijo, presunto, maionese temperada.",
          categoria: "Lanche",
          disponivel: true,
          preco: 11.00
        },

        {
          id: 4,
          nome: "X-Brutus",
          descricao: "Carne, ovo, bacon, alface, tomate, queijo, presunto, batat palha, maionese temperada, fritas.",
          categoria: "Lanche",
          disponivel: true,
          preco: 25.00
        },

        {
          id: 5,
          nome: "X-Frango",
          descricao: "Frango, ovo, queijo, batata palha, presunto, alface, tomate, maionese temperada.",
          categoria: "Lanche",
          disponivel: true,
          preco: 18.00
        },

        {
          id: 6,
          nome: "Cachorro-Quente na Chapa",
          descricao: "Queijo, bacon, milho, batata palha e salsicha.",
          categoria: "Lanche",
          disponivel: true,
          preco: 12.00
        },

        {
          id: 7,
          nome: "Batata Frita Tradicional ou Macaxeira Frita",
          descricao: "Sem descrição",
          categoria: "Lanche",
          disponivel: true,
          preco: 16.00
        },

        {
          id: 8,
          nome: "Batata Frita com Chedeer",
          descricao: "Batata frita, cheddar e bacon",
          categoria: "Lanche",
          disponivel: true,
          preco: 25.00
        },

        {
          id: 9,
          nome: "Porção de Carne de Sol Acebolada",
          descricao: "300 gramas",
          categoria: "Lanche",
          disponivel: true,
          preco: 30.00
        },

        {
          id: 10,
          nome: "Porção de Carne de Sol com Fritas",
          descricao: "300 gramas.",
          categoria: "Lanche",
          disponivel: true,
          preco: 39.00
        },

        
        {
          id: 11,
          nome: "Pastel de carne ou de Queijo",
          descricao: "Sem descrição",
          categoria: "Lanche",
          disponivel: true,
          preco: 5.00
        },
      ],

      "Bebidas": [
        {
          id: 12,
          nome: "Suco natural",
          descricao: "300 ml",
          categoria: "Bebida",
          disponivel: true,
          preco: 6.00
        },

        {
          id: 13,
          nome: "Refrigerante de Lata",
          descricao: "Sem descrição",
          categoria: "Bebida",
          disponivel: true,
          preco: 6.00
        },

        {
          id: 14,
          nome: "Refrigerante 1L",
          descricao: "Sem descrição",
          categoria: "Bebida",
          disponivel: true,
          preco: 10.00
        },

        {
          id: 15,
          nome: "Heineken Long Neck",
          descricao: "Sem descrição",
          categoria: "Bebida",
          disponivel: true,
          preco: 11.00
        },

        {
          id: 16,
          nome: "Heineken 600ml",
          descricao: "Sem descrição",
          categoria: "Bebida",
          disponivel: true,
          preco: 16.00
        },

        {
          id: 17,
          nome: "Cerveja Bohemia/Brahama 600ml",
          descricao: "Sem descrição",
          categoria: "Bebida",
          disponivel: true,
          preco: 12.00
        },

        {
          id: 18,
          nome: "Cerveja 300ml",
          descricao: "Sem descrição",
          categoria: "Bebida",
          disponivel: true,
          preco: 6.00
        },

        {
          id: 19,
          nome: "RedBull",
          descricao: "Sem descrição",
          categoria: "Bebida",
          disponivel: true,
          preco: 12.00
        },

        {
          id: 20,
          nome: "Água 500ml",
          descricao: "Sem descrição",
          categoria: "Bebida",
          disponivel: true,
          preco: 4.00
        },
      ]
    },
    ofertas: []
  }
};

function calcularPrecosRestaurante(restaurante) {
  const precos = [];
  
  Object.values(restaurante.cardapio).forEach(categoria => {
    categoria.forEach(item => {
      if (item.pequena) precos.push(item.pequena);
      if (item.media) precos.push(item.media);
      if (item.grande) precos.push(item.grande);
      
      if (item.preco) precos.push(item.preco);
    });
  });
  
  if (precos.length > 0) {
    restaurante.precoMinimo = Math.min(...precos);
    restaurante.precoMaximo = Math.max(...precos);
    restaurante.precoMedio = precos.reduce((a, b) => a + b, 0) / precos.length;
    restaurante.precoMedio = parseFloat(restaurante.precoMedio.toFixed(2));
  } else {
    restaurante.precoMinimo = 0;
    restaurante.precoMaximo = 0;
    restaurante.precoMedio = 0;
  }
  
  return restaurante;
}

Object.keys(RESTAURANTES_DATA).forEach(id => {
  RESTAURANTES_DATA[id] = calcularPrecosRestaurante(RESTAURANTES_DATA[id]);
});


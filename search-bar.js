class SearchBar {
  constructor(hasFilters = false) {
    this.hasFilters = hasFilters;
    this.establishments = [];
    this.init();
  }

  init() {
    this.createSearchBar();
    this.attachEvents();
    this.loadEstablishments();
  }

  createSearchBar() {
    const container = document.createElement('div');
    container.className = 'search-bar-container';
    container.innerHTML = `
      <div class="search-bar-wrapper">
        <input 
          type="text" 
          class="search-input" 
          id="searchInput"
          placeholder="Buscar estabelecimentos, pratos ou categorias..."
        >
        <div class="search-icons">
          <button class="search-btn" id="searchBtn" title="Buscar">
            <i class="fas fa-search"></i>
          </button>
          ${this.hasFilters ? `
            <button class="filter-toggle-btn" id="filterToggle" title="Filtros">
              <i class="fas fa-sliders-h"></i>
            </button>
          ` : ''}
        </div>
        <div class="search-suggestions" id="searchSuggestions"></div>
      </div>
    `;

    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.id = 'searchOverlay';

    document.body.appendChild(container);
    document.body.appendChild(overlay);
  }

  attachEvents() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const filterToggle = document.getElementById('filterToggle');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
      searchInput.addEventListener('focus', () => this.showOverlay());
      
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.executeSearch();
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.executeSearch());
    }

    if (searchOverlay) {
      searchOverlay.addEventListener('click', () => this.hideSearch());
    }

    if (filterToggle && this.hasFilters) {
      filterToggle.addEventListener('click', () => this.toggleFilters());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideSearch();
        this.closeFilters();
      }
    });
  }

  loadEstablishments() {
    const cards = document.querySelectorAll('.card');
    this.establishments = Array.from(cards).map(card => {
      const nome = card.querySelector('.nome')?.textContent || '';
      const descricao = card.querySelector('.descricao')?.textContent || '';
      const categoria = card.closest('.category-section')?.getAttribute('data-category') || '';
      
      return {
        nome,
        descricao,
        categoria,
        element: card
      };
    });
  }

  handleSearch(query) {
    const suggestions = document.getElementById('searchSuggestions');
    
    if (!query.trim()) {
      suggestions.classList.remove('show');
      return;
    }

    const results = this.establishments.filter(est => {
      const searchText = `${est.nome} ${est.descricao} ${est.categoria}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    this.displaySuggestions(results);
  }

  displaySuggestions(results) {
    const suggestions = document.getElementById('searchSuggestions');
    
    if (results.length === 0) {
      suggestions.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <p>Nenhum resultado encontrado</p>
        </div>
      `;
      suggestions.classList.add('show');
      return;
    }

    suggestions.innerHTML = results.slice(0, 6).map(est => `
      <div class="suggestion-item" data-name="${est.nome}">
        <div class="suggestion-icon">
          <i class="fas fa-utensils"></i>
        </div>
        <div class="suggestion-content">
          <div class="suggestion-name">${est.nome}</div>
          <div class="suggestion-category">${this.getCategoryName(est.categoria)}</div>
        </div>
      </div>
    `).join('');

    suggestions.classList.add('show');

    suggestions.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const name = item.getAttribute('data-name');
        this.selectEstablishment(name);
      });
    });
  }

  selectEstablishment(name) {
    const establishment = this.establishments.find(est => est.nome === name);
    if (establishment) {
      establishment.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      establishment.element.style.animation = 'pulse 1s ease';
      setTimeout(() => {
        establishment.element.style.animation = '';
      }, 1000);
    }
    this.hideSearch();
  }

  executeSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;

    const results = this.establishments.filter(est => {
      const searchText = `${est.nome} ${est.descricao}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    document.querySelectorAll('.card').forEach(card => {
      card.style.display = 'none';
    });

    results.forEach(est => {
      est.element.style.display = 'flex';
    });

    document.querySelectorAll('.category-section').forEach(section => {
      const visibleCards = section.querySelectorAll('.card[style*="display: flex"]');
      section.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });

    const noResults = document.getElementById('noResultsMessage');
    if (results.length === 0) {
      noResults.classList.add('show');
    } else {
      noResults.classList.remove('show');
    }

    this.hideSearch();
  }

  toggleFilters() {
    const sidebar = document.getElementById('filterSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const filterBtn = document.getElementById('filterToggle');
    
    if (sidebar && overlay) {
      const isOpen = sidebar.classList.contains('open');
      
      if (isOpen) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        filterBtn.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        filterBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  }

  closeFilters() {
    const sidebar = document.getElementById('filterSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const filterBtn = document.getElementById('filterToggle');
    
    if (sidebar) {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
      if (filterBtn) filterBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  showOverlay() {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.add('show');
    document.body.classList.add('search-active');
  }

  hideSearch() {
    const overlay = document.getElementById('searchOverlay');
    const suggestions = document.getElementById('searchSuggestions');
    const searchInput = document.getElementById('searchInput');
    
    overlay.classList.remove('show');
    suggestions.classList.remove('show');
    document.body.classList.remove('search-active');
    if (searchInput) searchInput.blur();
  }

  getCategoryName(category) {
    const categories = {
      'pizzarias': 'Pizzarias',
      'lanchonetes': 'Lanchonetes',
      'sorveterias': 'Sorveterias',
      'docerias': 'Docerias',
      'frutosdomar': 'Frutos do Mar',
      'comidajaponesa': 'Comida Japonesa',
      'restaurantes': 'Restaurantes',
      'churrascarias': 'Churrascarias'
    };
    return categories[category] || category;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  const pagesWithFilters = ['estabelecimentos.html', 'encomendas.html'];
  const hasFilters = pagesWithFilters.includes(currentPage);
  
  new SearchBar(hasFilters);
});
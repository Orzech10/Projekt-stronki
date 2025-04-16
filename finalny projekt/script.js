  document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.accessibility-option');
    const resetBtn = document.getElementById('reset-accessibility');
    const toggleBtn = document.getElementById('toggle-accessibility');
    const panel = document.querySelector('.accessibility-panel');
    
    // Ładowanie zapisanych ustawień
    options.forEach(option => {
      const action = option.dataset.action;
      if (localStorage.getItem(action) === 'true') {
        option.checked = true;
        document.body.classList.add(action);
      }
      
      option.addEventListener('change', function() {
        const action = this.dataset.action;
        if (this.checked) {
          document.body.classList.add(action);
          localStorage.setItem(action, 'true');
        } else {
          document.body.classList.remove(action);
          localStorage.removeItem(action);
        }
      });
    });
    
    // Resetowanie ustawień
    resetBtn.addEventListener('click', function() {
      options.forEach(option => {
        option.checked = false;
        const action = option.dataset.action;
        document.body.classList.remove(action);
        localStorage.removeItem(action);
      });
    });
    
    // Otwieranie/zamykanie panelu
    toggleBtn.addEventListener('click', function() {
      panel.classList.toggle('hidden');
      toggleBtn.classList.toggle('active');
    });
  
    // Dynamiczne pozycjonowanie panelu podczas przewijania
    window.addEventListener('scroll', function() {
      if (!panel.classList.contains('hidden')) {
        const scrollPosition = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const panelHeight = panel.offsetHeight;
        
        // Oblicz nową pozycję panelu (zawsze widoczny w oknie przeglądarki)
        let newPosition = scrollPosition + (windowHeight / 2) - (panelHeight / 2);
        
        // Ogranicz pozycję, aby panel nie wychodził poza okno
        newPosition = Math.max(20, Math.min(newPosition, document.body.scrollHeight - panelHeight - 20));
        
        panel.style.top = newPosition + 'px';
      }
    });
  
    // Inicjalne ustawienie pozycji
    window.dispatchEvent(new Event('scroll'));
  });


  //gwiazdki

  javascript
Copy
document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja ocen
    const ratings = document.querySelectorAll('.rating');
    
    ratings.forEach(rating => {
        const value = parseFloat(rating.getAttribute('data-rating'));
        const stars = rating.querySelector('.stars');
        const valueDisplay = rating.querySelector('.rating-value');
        
        // Zaokrąglenie do najbliższej 0.5
        const roundedValue = Math.round(value * 2) / 2;
        rating.setAttribute('data-rating', roundedValue.toString());
        valueDisplay.textContent = `${roundedValue}/5`;
        
        // Opcjonalnie: dodanie tooltipa z liczbą ocen
        rating.title = `Ocena ${roundedValue} na podstawie ${Math.floor(Math.random() * 50) + 10} opinii`;
    });
});

//koszyk
const services = [
    { 
        name: "Sprzątanie mieszkania (do 50m²)", 
        price: 150,
        icon: "fas fa-home",
        description: "Kompleksowe sprzątanie całego mieszkania w tym kuchni, łazienki i pokoi"
    },
    { 
        name: "Mycie okien (za sztukę)", 
        price: 25,
        icon: "fas fa-window-maximize",
        description: "Mycie szyb wewnętrznych i zewnętrznych (wraz z framugami)"
    },
    { 
        name: "Czyszczenie dywanów (za m²)", 
        price: 15,
        icon: "fas fa-rug",
        description: "Profesjonalne czyszczenie dywanów metodą ekstrakcyjną"
    },
    { 
        name: "Sprzątanie po remoncie", 
        price: 300,
        icon: "fas fa-paint-roller",
        description: "Usuwanie pyłów budowlanych, mycie powierzchni, porządkowanie"
    },
    { 
        name: "Pranie tapicerki meblowej", 
        price: 180,
        icon: "fas fa-couch",
        description: "Czyszczenie kanap, foteli i innych mebli tapicerowanych"
    },
    { 
        name: "Mycie podłóg (za m²)", 
        price: 5,
        icon: "fas fa-broom",
        description: "Mycie i dezynfekcja podłóg wszystkich typów"
    }
];

let cart = [];

// Dodaj usługę do koszyka
function addToCart(service) {
    cart.push(service);
    updateCart();
    showToast(`Dodano "${service.name}" do koszyka`);
}

// Usuń usługę z koszyka
function removeFromCart(index) {
    const removedService = cart[index];
    cart.splice(index, 1);
    updateCart();
    showToast(`Usunięto "${removedService.name}" z koszyka`, 'error');
}

// Zaktualizuj koszyk
function updateCart() {
    const cartContainer = document.getElementById("cart");
    const summaryContainer = document.getElementById("summary");
    const cartActions = document.getElementById("cart-actions");
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-cart-arrow-down"></i>
                <p>Twój koszyk jest pusty</p>
            </div>
        `;
        summaryContainer.style.display = 'none';
        cartActions.style.display = 'none';
        return;
    }

    let cartHTML = "";
    let totalPrice = 0;
    
    cart.forEach((service, index) => {
        totalPrice += service.price;
        cartHTML += `  
            <div class="service">
                <div class="service-info">
                    <h3>${service.name}</h3>
                    <span class="price">${service.price} zł</span>
                </div>
                <div class="service-actions">
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = cartHTML;
    document.getElementById("total").textContent = `${totalPrice} zł`;
    document.getElementById("services-count").textContent = `${cart.length}`;
    summaryContainer.style.display = 'block';
    cartActions.style.display = 'block';
    
    // Zapisz koszyk do localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toString());
}

// Wyczyść koszyk
function clearCart() {
    if (cart.length === 0) return;
    
    cart = [];
    updateCart();
    showToast('Koszyk został wyczyszczony', 'error');
}

// Pokaz toast wiadomości
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
    toast.innerHTML = `
        <div class="toast-message">${message}</div>
        <button class="toast-close">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
    
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
}

// Renderuj dostępne usługi
function renderServices() {
    const servicesList = document.getElementById("services-list");
    
    services.forEach(service => {
        servicesList.innerHTML += ` 
            <div class="service">
                <div class="service-info">
                    <h3><i class="${service.icon}"></i> ${service.name}</h3>
                    <p style="font-size: 0.9rem; opacity: 0.8;">${service.description}</p>
                </div>
                <div class="service-actions">
                    <span class="price">${service.price} zł</span>
                    <button class="btn btn-sm btn-primary" onclick='addToCart(${JSON.stringify(service)})'>
                        <i class="fas fa-plus"></i> Dodaj
                    </button>
                </div>
            </div>
        `;
    });
}

// Inicjalizacja
document.addEventListener('DOMContentLoaded', () => {
    // Wczytaj koszyk z localStorage jeśli istnieje
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
    
    renderServices();
});

//koszyk
const services = [
    { 
        name: "Sprzątanie mieszkania (do 50m²)", 
        price: 150,
        icon: "fas fa-home",
        description: "Kompleksowe sprzątanie całego mieszkania w tym kuchni, łazienki i pokoi"
    },
    { 
        name: "Mycie okien (za sztukę)", 
        price: 25,
        icon: "fas fa-window-maximize",
        description: "Mycie szyb wewnętrznych i zewnętrznych (wraz z framugami)"
    },
    { 
        name: "Czyszczenie dywanów (za m²)", 
        price: 15,
        icon: "fas fa-rug",
        description: "Profesjonalne czyszczenie dywanów metodą ekstrakcyjną"
    },
    { 
        name: "Sprzątanie po remoncie", 
        price: 300,
        icon: "fas fa-paint-roller",
        description: "Usuwanie pyłów budowlanych, mycie powierzchni, porządkowanie"
    },
    { 
        name: "Pranie tapicerki meblowej", 
        price: 180,
        icon: "fas fa-couch",
        description: "Czyszczenie kanap, foteli i innych mebli tapicerowanych"
    },
    { 
        name: "Mycie podłóg (za m²)", 
        price: 5,
        icon: "fas fa-broom",
        description: "Mycie i dezynfekcja podłóg wszystkich typów"
    }
];

let cart = [];

// Dodaj usługę do koszyka
function addToCart(service) {
    cart.push(service);
    updateCart();
    showToast(`Dodano "${service.name}" do koszyka`);
}

// Usuń usługę z koszyka
function removeFromCart(index) {
    const removedService = cart[index];
    cart.splice(index, 1);
    updateCart();
    showToast(`Usunięto "${removedService.name}" z koszyka`, 'error');
}

// Zaktualizuj koszyk
function updateCart() {
    const cartContainer = document.getElementById("cart");
    const summaryContainer = document.getElementById("summary");
    const cartActions = document.getElementById("cart-actions");
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-cart-arrow-down"></i>
                <p>Twój koszyk jest pusty</p>
            </div>
        `;
        summaryContainer.style.display = 'none';
        cartActions.style.display = 'none';
        return;
    }

    let cartHTML = "";
    let totalPrice = 0;
    
    cart.forEach((service, index) => {
        totalPrice += service.price;
        cartHTML += `  
            <div class="service">
                <div class="service-info">
                    <h3>${service.name}</h3>
                    <span class="price">${service.price} zł</span>
                </div>
                <div class="service-actions">
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = cartHTML;
    document.getElementById("total").textContent = `${totalPrice} zł`;
    document.getElementById("services-count").textContent = `${cart.length}`;
    summaryContainer.style.display = 'block';
    cartActions.style.display = 'block';
    
    // Zapisz koszyk do localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toString());
}

// Wyczyść koszyk
function clearCart() {
    if (cart.length === 0) return;
    
    cart = [];
    updateCart();
    showToast('Koszyk został wyczyszczony', 'error');
}

// Pokaz toast wiadomości
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
    toast.innerHTML = `
        <div class="toast-message">${message}</div>
        <button class="toast-close">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
    
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
}

// Renderuj dostępne usługi
function renderServices() {
    const servicesList = document.getElementById("services-list");
    
    services.forEach(service => {
        servicesList.innerHTML += ` 
            <div class="service">
                <div class="service-info">
                    <h3><i class="${service.icon}"></i> ${service.name}</h3>
                    <p style="font-size: 0.9rem; opacity: 0.8;">${service.description}</p>
                </div>
                <div class="service-actions">
                    <span class="price">${service.price} zł</span>
                    <button class="btn btn-sm btn-primary" onclick='addToCart(${JSON.stringify(service)})'>
                        <i class="fas fa-plus"></i> Dodaj
                    </button>
                </div>
            </div>
        `;
    });
}

// Inicjalizacja
document.addEventListener('DOMContentLoaded', () => {
    // Wczytaj koszyk z localStorage jeśli istnieje
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
    
    renderServices();
});
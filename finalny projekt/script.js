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
document.addEventListener('DOMContentLoaded', function() {
  // Przykładowe dane koszyka - w rzeczywistości pobierane z localStorage lub API
  const cartItems = [
      {
          id: 1,
          name: "Profesjonalne sprzątanie mieszkania",
          price: 150,
          image: "foto/5.png",
          quantity: 1
      },
      {
          id: 2,
          name: "Mycie okien",
          price: 25,
          image: "foto/cleaner1.jpg",
          quantity: 3
      }
  ];

  const cartContainer = document.getElementById('cart-items');
  const productsCount = document.getElementById('products-count');
  const subtotal = document.getElementById('subtotal');
  const total = document.getElementById('total');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Renderowanie koszyka
  function renderCart() {
      if (cartItems.length === 0) {
          cartContainer.innerHTML = `
              <div class="empty-cart">
                  <i class="fas fa-shopping-cart"></i>
                  <p>Twój koszyk jest pusty</p>
              </div>
          `;
          return;
      }

      let cartHTML = '';
      let itemsCount = 0;
      let subtotalValue = 0;

      cartItems.forEach(item => {
          itemsCount += item.quantity;
          subtotalValue += item.price * item.quantity;

          cartHTML += `
              <div class="cart-item">
                  <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                  <div class="cart-item-details">
                      <h3 class="cart-item-title">${item.name}</h3>
                      <p class="cart-item-price">${item.price} zł</p>
                  </div>
                  <div class="cart-item-actions">
                      <div class="quantity-control">
                          <button class="quantity-btn minus" data-id="${item.id}">-</button>
                          <span>${item.quantity}</span>
                          <button class="quantity-btn plus" data-id="${item.id}">+</button>
                      </div>
                      <button class="remove-btn" data-id="${item.id}">
                          <i class="fas fa-trash-alt"></i>
                      </button>
                  </div>
              </div>
          `;
      });

      cartContainer.innerHTML = cartHTML;
      productsCount.textContent = itemsCount;
      subtotal.textContent = subtotalValue + ' zł';
      total.textContent = subtotalValue + ' zł';

      // Dodanie event listenerów do przycisków
      document.querySelectorAll('.quantity-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              const id = parseInt(this.getAttribute('data-id'));
              const isPlus = this.classList.contains('plus');
              updateQuantity(id, isPlus);
          });
      });

      document.querySelectorAll('.remove-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              const id = parseInt(this.getAttribute('data-id'));
              removeItem(id);
          });
      });
  }

  // Aktualizacja ilości
  function updateQuantity(id, isPlus) {
      const item = cartItems.find(item => item.id === id);
      if (item) {
          if (isPlus) {
              item.quantity++;
          } else {
              if (item.quantity > 1) {
                  item.quantity--;
              } else {
                  removeItem(id);
                  return;
              }
          }
          renderCart();
      }
  }

  // Usuwanie przedmiotu
  function removeItem(id) {
      const index = cartItems.findIndex(item => item.id === id);
      if (index !== -1) {
          cartItems.splice(index, 1);
          renderCart();
      }
  }

  // Inicjalizacja
  renderCart();

  // Obsługa przycisku płatności
  checkoutBtn.addEventListener('click', function() {
      if (cartItems.length > 0) {
          window.location.href = "płatność.html";
      } else {
          alert('Twój koszyk jest pusty!');
      }
  });
});
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
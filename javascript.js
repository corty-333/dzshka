document.addEventListener('DOMContentLoaded', function() {
    const animationArea = document.getElementById('animationArea');
    const bubblesContainer = document.getElementById('bubbles');
    const speedUpBtn = document.getElementById('speedUp');
    const speedDownBtn = document.getElementById('speedDown');
    const crazyModeBtn = document.getElementById('crazyMode');
    const resetBtn = document.getElementById('reset');
    
    let speed = 1;
    let isCrazyMode = false;
    
    // Создание пузырьков
    function createBubbles() {
        for (let i = 0; i < 15; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Случайный размер и положение
            const size = Math.random() * 40 + 10;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 5 + 8;
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.animationDuration = `${duration}s`;
            
            bubblesContainer.appendChild(bubble);
        }
    }
    
    // Инициализация пузырьков
    createBubbles();
    
    // Управление скоростью
    function updateSpeed() {
        const elements = document.querySelectorAll('.octopus-body, .octopus-tentacle, .octopus-pupil, .octopus-mouth, .bubble');
        
        elements.forEach(el => {
            const currentAnimation = getComputedStyle(el).animationName;
            if (currentAnimation && currentAnimation !== 'none') {
                // Получаем текущую длительность анимации
                const currentDuration = parseFloat(getComputedStyle(el).animationDuration);
                const newDuration = currentDuration / speed;
                
                el.style.animationDuration = `${newDuration}s`;
            }
        });
    }
    
    // Обработчики кнопок
    speedUpBtn.addEventListener('click', function() {
        if (speed < 3) {
            speed += 0.5;
            updateSpeed();
        }
    });
    
    speedDownBtn.addEventListener('click', function() {
        if (speed > 0.5) {
            speed -= 0.5;
            updateSpeed();
        }
    });
    
    crazyModeBtn.addEventListener('click', function() {
        isCrazyMode = !isCrazyMode;
        
        if (isCrazyMode) {
            animationArea.classList.add('crazy');
            crazyModeBtn.textContent = 'Нормальный режим';
            speed = 2;
            updateSpeed();
            
            // Создаем больше пузырьков в безумном режиме
            const extraBubbles = 10;
            for (let i = 0; i < extraBubbles; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                
                const size = Math.random() * 30 + 5;
                const left = Math.random() * 100;
                const delay = Math.random() * 2;
                const duration = Math.random() * 3 + 5;
                
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${left}%`;
                bubble.style.animationDelay = `${delay}s`;
                bubble.style.animationDuration = `${duration}s`;
                
                bubblesContainer.appendChild(bubble);
            }
        } else {
            animationArea.classList.remove('crazy');
            crazyModeBtn.textContent = 'Безумный режим';
            speed = 1;
            updateSpeed();
        }
    });
    
    resetBtn.addEventListener('click', function() {
        speed = 1;
        isCrazyMode = false;
        animationArea.classList.remove('crazy');
        crazyModeBtn.textContent = 'Безумный режим';
        updateSpeed();
        
        // Удаляем все пузырьки и создаем заново
        while (bubblesContainer.firstChild) {
            bubblesContainer.removeChild(bubblesContainer.firstChild);
        }
        createBubbles();
    });
    
    // Добавляем случайные пузырьки время от времени
    setInterval(() => {
        if (Math.random() > 0.7) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            const size = Math.random() * 30 + 10;
            const left = Math.random() * 100;
            const duration = Math.random() * 4 + 6;
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            
            bubblesContainer.appendChild(bubble);
            
            // Удаляем пузырек после завершения анимации
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, duration * 1000);
        }
    }, 1000);
});
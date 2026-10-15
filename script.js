const music = document.querySelector('#site-music');
const musicToggle = document.querySelector('#music-toggle');
const pageFrame = document.querySelector('#page-frame');

function updateMusicButton() {
    musicToggle.textContent = music.paused ? 'Bật nhạc ♪' : 'Tắt nhạc ♪';
    musicToggle.setAttribute('aria-label', music.paused ? 'Bật nhạc' : 'Tắt nhạc');
}

function playMusic() {
    music.play().then(() => {
        musicToggle.removeAttribute('title');
        updateMusicButton();
    }).catch(() => {
        musicToggle.title = 'Nếu nhạc chưa phát, hãy chạm nút này để thử lại.';
        updateMusicButton();
    });
}

musicToggle.addEventListener('click', () => {
    if (music.paused) {
        playMusic();
    } else {
        music.pause();
        updateMusicButton();
    }
});

// Typing effect for greeting
const greetingText = "này cậu biết không cậu giống như thiên thần vậy 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 100);
    }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    if (!window.gsap) {
        element.style.opacity = '1';
        setTimeout(() => element.remove(), 6000);
        return;
    }

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Initialize animations
window.addEventListener('load', () => {
    if (window.gsap) {
        gsap.to('h1', {
            opacity: 1,
            duration: 1,
            y: 20,
            ease: "bounce.out"
        });

        gsap.to('.cta-button', {
            opacity: 1,
            duration: 1,
            y: -20,
            ease: "back.out"
        });
    } else {
        document.querySelector('h1').style.opacity = '1';
        document.querySelector('.cta-button').style.opacity = '1';
    }

    // Start typing effect
    typeGreeting();

    // Create floating elements periodically
    setInterval(createFloating, 1000);
});

// Hover effects
       // Hover effects
       document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (window.gsap) {
                gsap.to(button, {
                    scale: 1.1,
                    duration: 0.3
                });
            }
        });

        button.addEventListener('mouseleave', () => {
            if (window.gsap) {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3
                });
            }
        });

        // Smooth page transition on click
        button.addEventListener('click', () => {
            playMusic();
            pageFrame.src = 'cause.html';
            pageFrame.hidden = false;
        });
    });
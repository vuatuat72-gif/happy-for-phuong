 // Reasons database
 const reasons = [
    { 
        text: "tuổi mới vui vẻ hơn nói chuyện nhiều hơn với tớ nhé 💖", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "không được khóc nhé khóc là xấu lắm đó 🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "học giỏi hơn vào được trường mình mong muốn ✨ ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "tớ sẽ vẫn luôn ở đây để lắng nghe cậu 🥳 ", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    if (window.gsap) {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: "back.out"
        });
    }

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            const enableStoryButton = () => {
                shuffleButton.textContent = "vào phần chính nhé 💫";
                shuffleButton.classList.add('story-mode');
            };

            if (window.gsap) {
                gsap.to(shuffleButton, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: "elastic.out",
                    onComplete: enableStoryButton
                });
            } else {
                enableStoryButton();
            }
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

function navigateToLastPage() {
    if (window.gsap) {
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
    } else {
        window.location.href = 'last.html';
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    if (currentReasonIndex >= reasons.length) {
        navigateToLastPage();
        return;
    }

    if (window.gsap) {
        gsap.to(shuffleButton, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    }
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    if (!window.gsap) {
        element.style.opacity = '1';
        setTimeout(() => element.remove(), 10000);
        return;
    }

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Create initial floating elements
setInterval(createFloatingElement, 2000);
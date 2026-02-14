document.addEventListener('DOMContentLoaded', () => {
    // Buttons & Sections
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');

    // Page Sections
    const letterSection = document.getElementById('letter-section');
    const questionSection = document.getElementById('question-section');
    const celebrationSection = document.getElementById('celebration');

    // Letter Elements
    const envelope = document.getElementById('envelope');
    const letterText = document.getElementById('letter-text');
    const nextPageBtn = document.getElementById('nextPageBtn');

    // --- STEP 1: Letter Interaction ---

    envelope.addEventListener('click', () => {
        // Hide envelope, show text
        envelope.style.display = 'none';
        letterText.classList.remove('hidden');
    });

    nextPageBtn.addEventListener('click', () => {
        // Hide letter section, show question section
        letterSection.classList.add('hidden');
        questionSection.classList.remove('hidden');
    });


    // --- STEP 2: Main Question Interaction ---

    // Function to move the "No" button
    const moveButton = () => {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Define a "safe zone" in the middle of the screen
        // e.g., keep it within the central 60% of the screen
        const safeMarginX = viewportWidth * 0.2; // 20% padding on sides
        const safeMarginY = viewportHeight * 0.2; // 20% padding on top/bottom

        const minX = safeMarginX;
        const maxX = viewportWidth - btnWidth - safeMarginX;
        const minY = safeMarginY;
        const maxY = viewportHeight - btnHeight - safeMarginY;

        // Generate a random position strictly within this central box
        const newX = Math.random() * (maxX - minX) + minX;
        const newY = Math.random() * (maxY - minY) + minY;

        // Apply new position
        if (!noBtn.classList.contains('moving')) {
            noBtn.classList.add('moving');
        }

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    };

    // Desktop: Move on mouseover
    noBtn.addEventListener('mouseover', moveButton);

    // Mobile/Touch: Move on touchstart (since there's no hover)
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent clicking
        moveButton();
    });

    // Just in case they somehow click it
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });

    // Yes button handler
    yesBtn.addEventListener('click', () => {
        questionSection.classList.add('hidden');
        celebrationSection.classList.remove('hidden');
        createConfetti();
    });

    // --- Celebration Confetti ---
    function createConfetti() {
        const colors = ['#ff4d6d', '#ff8fa3', '#fff0f3', '#ffd166', '#06d6a0'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');

            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.floor(Math.random() * 10) + 5;
            const startX = Math.random() * window.innerWidth;
            const startY = -10;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;

            // Style
            confetti.style.position = 'fixed';
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `fall ${duration}s linear ${delay}s forwards`;

            document.body.appendChild(confetti);

            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }
});

// Add confetti animation style
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 50}px) rotate(720deg);
        }
    }
`;
document.head.appendChild(style);

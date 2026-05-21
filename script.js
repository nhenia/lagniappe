document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById('intro-screen');
    const readingScreen = document.getElementById('reading-screen');
    const drawBtn = document.getElementById('draw-btn');

    // DOM Elements for Card Data
    const elCardNum = document.getElementById('card-number');
    const elCardTitle = document.getElementById('card-title');
    const elCardSubtitle = document.getElementById('card-subtitle');
    const elCardKeywords = document.getElementById('card-keywords');
    const elCardFraming = document.getElementById('card-framing');
    const elCardUpright = document.getElementById('card-upright');
    const elCardReversed = document.getElementById('card-reversed');
    const elCardDomains = document.getElementById('card-domains');
    const elCardInquiry = document.getElementById('card-inquiry');
    const elCardTell = document.getElementById('card-tell');

    // Check localStorage
    const savedCardIndex = localStorage.getItem('lagniappe_drawn_card');

    if (savedCardIndex !== null) {
        // User already drew a card
        const cardIndex = parseInt(savedCardIndex, 10);
        populateCard(cards[cardIndex]);
        // Show reading immediately, skip intro
        introScreen.classList.remove('active');
        readingScreen.classList.add('active');
    } else {
        // First time
        introScreen.classList.add('active');
    }

    drawBtn.addEventListener('click', () => {
        // Prevent double clicks
        drawBtn.disabled = true;

        // Select random card
        const randomIndex = Math.floor(Math.random() * cards.length);

        // Save to localStorage
        localStorage.setItem('lagniappe_drawn_card', randomIndex);

        // Populate the DOM
        populateCard(cards[randomIndex]);

        // Trigger transition
        introScreen.classList.remove('active');
        // Slight delay to allow fade out before fading in
        setTimeout(() => {
            readingScreen.classList.add('active');
        }, 800);
    });

    function populateCard(card) {
        elCardNum.textContent = card.number;
        elCardTitle.textContent = card.title;
        elCardSubtitle.textContent = card.subtitle;
        elCardKeywords.textContent = card.keywords;

        elCardFraming.textContent = card.visual_framing;
        elCardUpright.textContent = card.upright;
        elCardReversed.textContent = card.reversed;

        // Clear previous domains
        elCardDomains.innerHTML = '';
        for (const [key, value] of Object.entries(card.domains)) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${key}:</strong> ${value}`;
            elCardDomains.appendChild(li);
        }

        elCardInquiry.textContent = card.inquiry;
        elCardTell.textContent = card.env_tell;
    }
});

// Select DOM elements
const calendarContainer = document.querySelector('.calendar-container');
const modalOverlay = document.querySelector('.modal-overlay');
const modalQuestion = document.querySelector('.modal-question');
const modalNominations = document.querySelector('.modal-nominations');
const modalReveal = document.querySelector('.modal-reveal');
const modalNo = document.querySelector('.modal-no');
const celebratoryModal = document.getElementById('celebratory-modal');
const winnerNameElement = document.getElementById('winner-name');
const fireworksContainer = document.getElementById('fireworks-container');
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
const toggle = document.getElementById('navbar-toggle');
const links = document.getElementById('navbar-links');

// Set canvas size for snow animation
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Snow animation
let snowflakes = [];
function createSnowflakes() {
  for (let i = 0; i < 200; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 3 + 1,
      radius: Math.random() * 5 + 2,
      opacity: Math.random() * 0.8 + 0.2,
    });
  }
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  snowflakes.forEach((flake) => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.globalAlpha = flake.opacity;
    ctx.fill();
    flake.y += flake.speed;
    if (flake.y > canvas.height) flake.y = 0;
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawSnowflakes);
}

createSnowflakes();
drawSnowflakes();

// Door contents
const doorContents = {
  "1": { "question": "Knows more than they let on?", "winner": "Heath" },
  "2": { "question": "Cool under pressure?", "winner": "Ray" },
  "3": { "question": "Most likely to commit at 4:59:59?", "winner": "Sazzzel" },
  "4": { "question": "Who is the most likely to share a funny story about their pet?", "winner": "Martin" },
  "5": { "question": "Coding coach you wish came with you at the end of the course?", "winner": "John" },
  "6": { "question": "Most likely to be talking with their mic off in a meeting?", "winner": "Guisella" },
  "7": { "question": "Most likely to blame an ‘animal’ off camera for random noise?", "winner": "Sazzzel" },
  "8": { "question": "Who is the office (or rather, online) fashion icon?", "winner": "Sarah" },
  "9": { "question": "Most LinkedIn followers?", "winner": "Joanne" },
  "10": { "question": "Most chilled out?", "winner": "Heath" },
  // Add remaining questions up to door number '25'
    '11': { question: 'The person who has looked after us no matter the situation?', winner: 'Amy' },
    '12': { question: 'Most likely to be finished just as everyone else has started?', winner: 'Sarah' },
    '13': { question: 'Who is the most likely to fall asleep during a live lecture and still manage to pass the course?', winner: 'Laura' },
    '14': { question: 'The person to have a question as Amy says ’If there are no more questions…”?', winner: 'Yazdan' },
    '15': { question: 'Who is the most likely to confuse their microphone with their speaker and create an echo chamber?', winner: 'Yvonne' },
    '16': { question: 'The person who is always smiling no matter what?', winner: 'Zandile' },
    '17': { question: 'Most mysterious?', winner: 'Matt' },
    '18': { question: 'Most likely to have the biggest Readme?', winner: 'Ricky' },
    '19': { question: 'Who is the online course\'s resident tech wizard (or wizard-in-training)?', winner: 'Ricky' },
    '20': { question: 'Most likely to be way ahead in the LMS?', winner: 'Sarah' },
    '21': { question: 'Most likely to git merge main…while in the main branch?', winner: 'Martin' },
    '22': { question: 'Person who always does great…but doesn’t believe in themselves?', winner: 'Tayla' },
    '23': { question: 'Most likely to miss commas?', winner: 'Mark' },
    '24': { question: 'Most likely to never use Bootstrap again?', winner: 'Grace' },
  "25": { "question": "Enjoy this special holiday surprise video!", "winner": "" }
};

const nominations = {
  '1': ['Laura', 'Heath', 'Tayla'],
  '2': ['Grace', 'Heath', 'Ray'],
  '3': ['Grace', 'Sazzzel', 'Zandile'],
  '4': ['Sazzzel', 'Martin', 'Tayla'],
  '5': ['John', 'Mark', 'Roo'],
  '6': ['Guisella', 'Yvonne', 'Yazdan'],
  '7': ['Sazzzel', 'Tayla', 'Yvonne'],
  '8': ['Grace', 'Sarah', 'Heath'],
  '9': ['Joanne', 'Laura', 'Sazzzel'],  
  '10': ['Heath', 'Matt', 'Ray'],
  '11': ['Sazzzel', 'Martin', 'Amy'],
  '12': ['Heath', 'Sarah', 'Ricky'],
  '13': ['Laura', 'Ray', 'Grace'],
  '14': ['Sazzzel', 'Yazdan', 'Sarah'],
  '15': ['Yvonne', 'Heath', 'Martin'],
  '16': ['Sazzzel', 'Zandile', 'Tayla'],
  '17': ['Matt', 'Zandile', 'Guisella'],
  '18': ['Amy', 'Ricky', 'Laura'],
  '19': ['Mark', 'Ricky', 'Sazzzel'],
  '20': ['Sazzzel', 'Laura', 'Sarah'],
  '21': ['Martin', 'Yazdan', 'Grace'],
  '22': ['Ray', 'Tayla', 'Grace'],
  '23': ['Mark', 'Sazzzel', 'Martin'],
  '24': ['Yvonne', 'Grace', 'Sarah'],
  '25': ['Surprise Video!']
};

// Create doors
for (let i = 1; i <= 25; i++) {
  const door = document.createElement('div');
  door.classList.add('door');
  door.textContent = i;

  const hollyImage = document.createElement('img');
  hollyImage.src = 'holly-2035434_640-removebg-preview.png';
  hollyImage.alt = 'A festive holly leaf with berries';
  hollyImage.classList.add('holly-image');
  door.appendChild(hollyImage);

  door.addEventListener('click', () => {
    if (door.classList.contains('opened')) return;

    modalQuestion.textContent = doorContents[i]?.question || "No question available.";
    const nominationsList = nominations[i] || ["No nominations available"];
    const nominationsHTML = nominationsList.map(nom => `<li>${nom}</li>`).join('');
    modalNominations.innerHTML = `<ul>${nominationsHTML}</ul>`;

    modalOverlay.style.display = 'flex';

    if (i === 25) {
      // Handle the 25th door logic - autoplay video
      winnerNameElement.innerHTML = `
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/EnMj8gmg4w8?autoplay=1" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>`;
      celebratoryModal.style.display = 'flex';
      modalOverlay.style.display = 'none';
      door.classList.add('opened');
    } else {
      // Handle normal door logic
      modalReveal.onclick = () => {
        winnerNameElement.textContent = doorContents[i]?.winner || "No winner available.";
        celebratoryModal.style.display = 'flex';
        modalOverlay.style.display = 'none';
        door.classList.add('opened');
        createFireworks();
      };
    }

    modalNo.onclick = () => {
      modalOverlay.style.display = 'none';
      door.classList.add('opened');
    };
  });

  calendarContainer.appendChild(door);
}

// Handle fireworks
function createFireworks() {
  const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
  for (let i = 0; i < 50; i++) {
    const firework = document.createElement('div');
    firework.classList.add('firework', colors[Math.floor(Math.random() * colors.length)]);
    firework.style.left = `${Math.random() * window.innerWidth}px`;
    firework.style.top = `${Math.random() * window.innerHeight}px`;
    firework.style.animationDelay = `${Math.random() * 2}s`;
    fireworksContainer.appendChild(firework);
  }
}

function clearFireworks() {
  while (fireworksContainer.firstChild) {
    fireworksContainer.removeChild(fireworksContainer.firstChild);
  }
}

// Close celebratory modal logic
celebratoryModal.addEventListener('click', () => {
  celebratoryModal.style.display = 'none';
  clearFireworks();
});

// Navbar toggle
toggle.addEventListener('click', () => {
  links.classList.toggle('show');
});

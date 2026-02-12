const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.nav-item');
const quickNavButtons = document.querySelectorAll('[data-nav-target]');
const startDemoButton = document.getElementById('start-demo');
const themeToggle = document.getElementById('theme-toggle');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatFeed = document.getElementById('chat-feed');

const aiResponses = [
  'Absolutely — I can pull up your account and check the latest ticket updates now.',
  'Great question. I can automate that request and send a confirmation in under a minute.',
  'I detected positive sentiment after resolution. Shall I summarize this conversation for your CRM?',
  'I can route this to a specialist while preserving the full customer context.',
];

const setActiveScreen = (targetScreen) => {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.id === targetScreen);
  });

  navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.screen === targetScreen);
  });
};

const addMessage = (text, sender) => {
  const message = document.createElement('article');
  message.className = `message ${sender}`;
  const content = document.createElement('p');
  content.textContent = text;
  message.appendChild(content);
  chatFeed.appendChild(message);
  message.scrollIntoView({ behavior: 'smooth', block: 'end' });
};

navButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveScreen(button.dataset.screen));
});

quickNavButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveScreen(button.dataset.navTarget));
});

startDemoButton.addEventListener('click', () => {
  setActiveScreen('chat');
  chatInput.focus();
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const prompt = chatInput.value.trim();

  if (!prompt) {
    return;
  }

  addMessage(prompt, 'user');
  chatInput.value = '';

  const reply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
  window.setTimeout(() => addMessage(reply, 'ai'), 500);
});

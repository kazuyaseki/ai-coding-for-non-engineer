import { GoogleGenAI } from '@google/genai';
import confetti from 'canvas-confetti';

// Initialize the API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    console.error('API Key not found. Please set VITE_GEMINI_API_KEY in .env file.');
}
const ai = new GoogleGenAI({ apiKey });

// State Management
let sessions = JSON.parse(localStorage.getItem('gemini_sessions')) || [];
let activeSessionId = localStorage.getItem('gemini_active_session_id') || null;
let chatSession = null;
let isComposing = false;

// DOM Elements
const chatDisplay = document.getElementById('chatDisplay');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const historyList = document.getElementById('historyList');
const newChatBtn = document.getElementById('newChatBtn');

// Initialization
function init() {
    if (sessions.length === 0) {
        createNewSession();
    } else {
        if (!activeSessionId || !sessions.find(s => s.id === activeSessionId)) {
            activeSessionId = sessions[0].id;
        }
        loadSession(activeSessionId);
    }
    renderHistoryList();
}

function createNewSession() {
    const newId = Date.now().toString();
    const newSession = {
        id: newId,
        title: 'NEW_DATA_STRM',
        history: []
    };
    sessions.unshift(newSession);
    activeSessionId = newId;
    saveToLocalStorage();
    loadSession(newId);
    renderHistoryList();
}

async function loadSession(id) {
    activeSessionId = id;
    const session = sessions.find(s => s.id === id);

    // Clear display
    chatDisplay.innerHTML = '';

    // Restore history to UI
    if (session.history.length === 0) {
        appendMessage('ai', 'SYSTEM READY. SESSION ESTABLISHED. HOW CAN I ASSIST?', false);
    } else {
        session.history.forEach(msg => {
            const role = msg.role === 'user' ? 'user' : 'model';
            appendMessage(role === 'user' ? 'user' : 'ai', msg.parts[0].text, false);
        });
    }

    // Initialize stateful SDK session
    chatSession = ai.chats.create({
        model: 'gemini-3-flash-preview',
    });

    saveToLocalStorage();
    renderHistoryList();
}

function saveToLocalStorage() {
    localStorage.setItem('gemini_sessions', JSON.stringify(sessions));
    localStorage.setItem('gemini_active_session_id', activeSessionId);
}

function renderHistoryList() {
    historyList.innerHTML = '';
    sessions.forEach(session => {
        const item = document.createElement('div');
        item.classList.add('history-item');
        if (session.id === activeSessionId) item.classList.add('active');
        item.textContent = session.title;
        item.addEventListener('click', () => {
            if (session.id !== activeSessionId) loadSession(session.id);
        });
        historyList.appendChild(item);
    });
}

// Event Listeners
newChatBtn.addEventListener('click', createNewSession);

userInput.addEventListener('compositionstart', () => isComposing = true);
userInput.addEventListener('compositionend', () => isComposing = false);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
        e.preventDefault();
        handleSendMessage();
    }
});

userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = (userInput.scrollHeight) + 'px';
});

sendBtn.addEventListener('click', handleSendMessage);

async function handleSendMessage() {
    const text = userInput.value.trim();
    if (!text || !chatSession) return;

    // UI Updates
    appendMessage('user', text); // Fixed: Replaced intentional bug variable with 'text'
    userInput.value = '';
    userInput.style.height = 'auto';
    showLoading(true);

    const session = sessions.find(s => s.id === activeSessionId);

    try {
        console.log('メッセージを送信します:', text);
        const response = await chatSession.sendMessage({ message: text });
        appendMessage('ai', response.text);
        console.log('AIの応答:', response.text);

        // Trigger Confetti Blast
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 1, x: 0.5 },
            colors: ['#00f3ff', '#ff00ff', '#ffffff', '#39ff14']
        });

        // Update local history
        const updatedHistory = await chatSession.getHistory();
        session.history = updatedHistory;

        // Update Title if it's the first message
        if (session.title === 'NEW_DATA_STRM') {
            session.title = text.substring(0, 15).toUpperCase() + (text.length > 15 ? '...' : '');
        }

        saveToLocalStorage();
        renderHistoryList();
    } catch (error) {
        console.error('Error:', error);
        appendMessage('ai', 'CRITICAL ERROR: DATA STREAM INTERRUPTED.');
    } finally {
        showLoading(false);
    }
}

function appendMessage(role, text, isNew = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${role}-message`);
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = text;
    messageDiv.appendChild(contentDiv);
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    if (isNew) {
        // High-impact Cyberpunk Digital Reveal
        messageDiv.classList.add('message-reveal');
    }
}

function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
    userInput.disabled = show;
    sendBtn.disabled = show;
    if (!show) userInput.focus();
}

init();

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Login state management
let isLoggedIn = false;
const loggedInElements = document.querySelectorAll('.logged-in-only');
const loggedOutElements = document.querySelectorAll('.logged-out-only');

function updateLoginState(loggedIn) {
    isLoggedIn = loggedIn;
    loggedInElements.forEach(el => {
        el.classList.toggle('hidden', !loggedIn);
    });
    loggedOutElements.forEach(el => {
        el.classList.toggle('hidden', loggedIn);
    });
}

// Modal functionality
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.querySelector('.auth-btn');
const closeBtns = document.querySelectorAll('.close-modal');
const loginLink = document.getElementById('loginLink');
const signupLink = document.getElementById('signupLink');

// Open login modal
document.querySelectorAll('.auth-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
});

// Close modals when clicking the close button
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        signupModal.classList.remove('active');
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === signupModal) {
        loginModal.classList.remove('active');
        signupModal.classList.remove('active');
    }
});

// Switch between login and signup
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.classList.remove('active');
    loginModal.classList.add('active');
});

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    signupModal.classList.add('active');
});

// Form handling
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Here you would typically make an API call to authenticate
    console.log('Login attempt:', { email, password });
    loginModal.classList.remove('active');
    updateLoginState(true);
    window.location.hash = '#find-companion';
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Here you would typically make an API call to register
    console.log('Signup attempt:', { name, email, password });
    signupModal.classList.remove('active');
    updateLoginState(true);
    window.location.hash = '#find-companion';
});

// Tab switching in find companion section
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        // Update active button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show selected content
        tabContents.forEach(content => {
            content.classList.toggle('hidden', content.id !== tabId);
        });
          });
        });
        
// Search form handling
const searchForm = document.getElementById('searchForm');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = document.querySelector('.search-input input[type="text"]').value;
        const date = document.querySelector('.search-input input[type="date"]').value;
        const budget = document.getElementById('budget').value;
        const travelType = document.getElementById('travelType').value;
        const activities = Array.from(document.getElementById('activities').selectedOptions).map(opt => opt.value);

        if (!location || !date || !budget || !travelType) {
            alert('Please fill in all required fields');
            return;
        }

        // Here you would typically make an API call to search for matches
        console.log('Searching for matches with criteria:', {
            location,
            date,
            budget,
            travelType,
            activities
        });

        // Switch to matches tab
        document.querySelector('[data-tab="matches"]').click();
    });
}

// Initialize multiple select with custom styling
const activitiesSelect = document.getElementById('activities');
if (activitiesSelect) {
    activitiesSelect.addEventListener('change', function() {
        const selected = Array.from(this.selectedOptions).map(opt => opt.text);
        if (selected.length > 0) {
            this.title = selected.join(', ');
        } else {
            this.title = 'Select Activities';
          }
        });
      }
      
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
          });
        });
        
// Add hover effects to destination cards
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Chatbot State
const chatbotState = {
    mode: 'assistant',
    isOpen: false,
    messages: [],
    lastResponseTime: null
};

// Bot Knowledge Base
const botResponses = {
    greetings: ['Hello!', 'Hi there!', 'Welcome!', 'How can I help you today?'],
    bookingHelp: {
        steps: [
            'First, select your destination from the search bar',
            'Choose your travel dates',
            'Select your preferred budget range',
            'Pick your accommodation preferences',
            'Review and confirm your booking'
        ],
        tips: [
            'Book in advance for better rates',
            'Check for seasonal discounts',
            'Compare different travel packages',
            'Look for combo deals (flight + hotel)',
            'Consider off-peak travel times'
        ]
    },
    travelTips: [
        'Always keep digital copies of important documents',
        'Get travel insurance for peace of mind',
        'Learn basic phrases in local language',
        'Research local customs and etiquette',
        'Pack light and smart',
        'Keep emergency contacts handy',
        'Check visa requirements well in advance'
    ],
    popularDestinations: {
        'Paris': 'Known for the Eiffel Tower, art museums, and romantic atmosphere',
        'Tokyo': 'Experience unique culture, technology, and amazing food',
        'Bali': 'Beautiful beaches, temples, and tropical paradise',
        'New York': 'The city that never sleeps, amazing shopping and culture',
        'Dubai': 'Modern architecture, luxury shopping, and desert adventures'
    },
    commonQuestions: {
        'how to book': 'To book a trip, click on "Book Tickets" in the navigation menu or use our quick booking form.',
        'find companion': 'Use our "Find Companion" feature to match with travelers who share your interests and travel plans.',
        'payment methods': 'We accept all major credit cards, PayPal, and bank transfers. All payments are secured with SSL encryption.',
        'cancellation policy': 'Free cancellation is available up to 48 hours before your trip start date. Partial refunds available after that.',
        'travel packages': 'Browse our curated travel packages under the "Travel Packages" section for the best deals.',
        'insurance': 'We offer comprehensive travel insurance covering medical, cancellation, and luggage protection.',
        'visa': 'Our visa assistance service helps with application process and documentation requirements.',
        'group tours': 'Join our guided group tours for a social and hassle-free travel experience.',
        'hotel deals': 'We partner with top hotels worldwide to offer exclusive rates and special perks.'
    }
};

// DOM Elements
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const modeToggle = document.getElementById('modeToggle');
const minimizeChat = document.getElementById('minimizeChat');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');
const botMode = document.querySelector('.bot-mode');

// Initialize Quick Reply and Suggestion Buttons
document.querySelectorAll('.quick-replies button, .bot-suggestion').forEach(button => {
    button.addEventListener('click', () => handleQuickReply(button.textContent));
});

// Chat Window Controls
chatToggle.addEventListener('click', () => {
    chatbotState.isOpen = !chatbotState.isOpen;
    chatWindow.classList.toggle('active', chatbotState.isOpen);
});

minimizeChat.addEventListener('click', () => {
    chatbotState.isOpen = false;
    chatWindow.classList.remove('active');
});

modeToggle.addEventListener('click', async () => {
    const previousMode = chatbotState.mode;
    chatbotState.mode = chatbotState.mode === 'assistant' ? 'realtime' : 'assistant';
    
    // Update UI
    botMode.textContent = `${chatbotState.mode.charAt(0).toUpperCase() + chatbotState.mode.slice(1)} Mode`;
    
    if (chatbotState.mode === 'realtime') {
        // Test API connection
        try {
            const response = await fetch(config.API_ENDPOINT + `?key=${config.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: 'Test connection'
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024,
                    }
                })
            });
            
            if (!response.ok) {
                throw new Error(`API connection failed: ${response.status}`);
            }
            
            addBotMessage('Switched to real-time mode. You are now connected to an AI assistant powered by Gemini. How can I help you with your travel plans?', false);
        } catch (error) {
            console.error('API Connection Error:', error);
            chatbotState.mode = previousMode;
            botMode.textContent = `${previousMode.charAt(0).toUpperCase() + previousMode.slice(1)} Mode`;
            addBotMessage('Unable to connect to real-time mode. Please check your internet connection and try again.', true);
        }
    } else {
        addBotMessage('Switched to assistant mode. I can help you with general inquiries and booking assistance.', true);
    }
});

// Message Handlers
sendMessage.addEventListener('click', () => sendUserMessage());
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendUserMessage();
});

function sendUserMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    userInput.value = '';

    if (chatbotState.mode === 'assistant') {
        handleAssistantMode(message);
    } else {
        handleRealtimeMode(message).catch(error => {
            console.error('Error sending message:', error);
            addBotMessage('Sorry, there was an error processing your message. Please try again.', true);
        });
    }
}

// Message Display Functions
function addUserMessage(message) {
    const messageHTML = `
        <div class="message user-message">
            <div class="message-content">
                <p>${message}</p>
            </div>
            </div>
          `;
    appendMessage(messageHTML);
}

function addBotMessage(message, includeQuickReplies = false) {
    let quickRepliesHTML = '';
    if (includeQuickReplies) {
        quickRepliesHTML = `
            <div class="quick-replies">
                <button>Book Tickets</button>
                <button>Travel Packages</button>
                <button>Find Companions</button>
                <button>Popular Destinations</button>
                <button>Travel Tips</button>
                <button>Help & Support</button>
          </div>
        `;
    }

    const messageHTML = `
        <div class="message bot-message">
            <img src="assets/prembot-icon.png" alt="Travel Bot" class="message-avatar">
            <div class="message-content">
                <p>${message}</p>
                ${quickRepliesHTML}
            </div>
        </div>
    `;
    appendMessage(messageHTML);
          
    if (includeQuickReplies) {
        document.querySelectorAll('.quick-replies button').forEach(button => {
            button.addEventListener('click', () => handleQuickReply(button.textContent));
        });
      }
    }
  
function appendMessage(messageHTML) {
    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Quick Reply Handler
function handleQuickReply(topic) {
    switch(topic) {
        case 'Book Tickets':
            addUserMessage('How do I book tickets?');
            addBotMessage('Here\'s how to book tickets:\n' + botResponses.bookingHelp.steps.join('\n'));
            break;
        case 'Travel Packages':
            addUserMessage('Tell me about travel packages');
            addBotMessage(botResponses.commonQuestions['travel packages']);
            break;
        case 'Find Companions':
            addUserMessage('How can I find travel companions?');
            addBotMessage(botResponses.commonQuestions['find companion']);
            break;
        case 'Popular Destinations':
            addUserMessage('Show me popular destinations');
            let destinations = Object.entries(botResponses.popularDestinations)
                .map(([city, desc]) => `🌟 ${city}: ${desc}`)
                .join('\n\n');
            addBotMessage('Here are some popular destinations:\n\n' + destinations);
            break;
        case 'Travel Tips':
            addUserMessage('Share some travel tips');
            addBotMessage('Here are some essential travel tips:\n\n' + botResponses.travelTips.map(tip => '• ' + tip).join('\n'));
            break;
        case 'Help & Support':
            addUserMessage('I need help');
            addBotMessage('What can I help you with? You can ask about:\n- Booking process\n- Payment methods\n- Cancellation policy\n- Travel insurance\n- Visa assistance\n- Finding travel companions\n- Travel packages', true);
            break;
        // Handle additional quick replies
        case 'Flight Booking':
            addUserMessage('I want to book a flight');
            addBotMessage(botResponses.bookingHelp.steps.join('\n') + '\n\nPro tips:\n' + botResponses.bookingHelp.tips.join('\n'));
            break;
        case 'Hotel Deals':
            addUserMessage('Tell me about hotel deals');
            addBotMessage(botResponses.commonQuestions['hotel deals']);
            break;
        case 'Group Tours':
            addUserMessage('Information about group tours');
            addBotMessage(botResponses.commonQuestions['group tours']);
            break;
        case 'Travel Insurance':
            addUserMessage('Tell me about travel insurance');
            addBotMessage(botResponses.commonQuestions['insurance']);
            break;
        case 'Visa Help':
            addUserMessage('I need help with visa');
            addBotMessage(botResponses.commonQuestions['visa']);
            break;
    }
}

// Assistant Mode Handler
function handleAssistantMode(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for greetings
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
        addBotMessage(botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)], true);
        return;
    }

    // Check for destination queries
    for (const [city, desc] of Object.entries(botResponses.popularDestinations)) {
        if (lowerMessage.includes(city.toLowerCase())) {
            addBotMessage(`${city}: ${desc}\n\nWould you like to:\n1. Book a trip to ${city}\n2. Find travel companions for ${city}\n3. See travel packages`, true);
            return;
        }
    }

    // Check common questions
    for (const [keyword, response] of Object.entries(botResponses.commonQuestions)) {
        if (lowerMessage.includes(keyword)) {
            addBotMessage(response, true);
            return;
        }
    }

    // Handle booking related queries
    if (lowerMessage.includes('book') || lowerMessage.includes('reservation')) {
        addBotMessage('Here are the booking steps:\n' + botResponses.bookingHelp.steps.join('\n') + '\n\nBooking Tips:\n' + botResponses.bookingHelp.tips.join('\n'));
        return;
    }

    // Handle travel tips queries
    if (lowerMessage.includes('tip') || lowerMessage.includes('advice')) {
        addBotMessage('Here are some travel tips:\n\n' + botResponses.travelTips.map(tip => '• ' + tip).join('\n'), true);
        return;
    }

    // Default response
    addBotMessage('I understand you\'re asking about "' + message + '". Here are some options that might help:', true);
}

// Realtime Mode Handler with Gemini API
async function handleRealtimeMode(message) {
    try {
        // Show typing indicator
        addBotMessage('Thinking...', false);
        
        // Log the API request
        console.log('Sending request to Gemini API...');
        
        const apiUrl = `${config.API_ENDPOINT}?key=${config.GEMINI_API_KEY}`;
        console.log('API URL:', apiUrl);

        const requestBody = {
            contents: [{
                parts: [{
                    text: message
                }]
            }]
        };
        
        console.log('Request body:', JSON.stringify(requestBody));

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`API request failed: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        // Remove the typing indicator
        const typingMessage = chatMessages.lastElementChild;
        if (typingMessage) {
            typingMessage.remove();
        }

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const botResponse = data.candidates[0].content.parts[0].text;
            addBotMessage(botResponse, false);
        } else {
            console.error('Invalid API response format:', data);
            throw new Error('Invalid response format from API');
        }
        
    } catch (error) {
        console.error('Error in real-time chat:', error);
        
        // Remove the typing indicator if it exists
        const typingMessage = chatMessages.lastElementChild;
        if (typingMessage) {
            typingMessage.remove();
        }
        
        addBotMessage(`Error: ${error.message}. Please try again or switch to assistant mode.`, false);
    }
}

// Initial greeting
setTimeout(() => {
    if (chatbotState.messages.length === 0) {
        addBotMessage('👋 Hi! I\'m Travel Bot, your travel assistant. How can I help you today?', true);
    }
}, 1000);

// Update the chat toggle button style
const chatToggleBtn = document.getElementById('chatToggle');
if (chatToggleBtn) {
    chatToggleBtn.innerHTML = `
        <div class="bot-icon">
            <div class="bot-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <span class="bot-status online"></span>
        </div>
    `;
}

// Add new styles for the updated toggle button
const style = document.createElement('style');
style.textContent = `
    .bot-avatar {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        border-radius: 50%;
        color: white;
        font-size: 2rem;
        transition: all 0.3s ease;
    }

    .bot-avatar i {
        transition: transform 0.3s ease;
    }

    .chat-toggle:hover .bot-avatar i {
        transform: scale(1.1) rotate(10deg);
    }

    .bot-status {
        position: absolute;
        bottom: 5px;
        right: 5px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        background-color: #2ecc71;
        transition: all 0.3s ease;
    }

    .chat-toggle:hover .bot-status {
        transform: scale(1.2);
    }
`;
document.head.appendChild(style);

// Handle custom country input
const countrySelect = document.getElementById('countrySelect');
const customCountry = document.getElementById('customCountry');

countrySelect.addEventListener('change', function() {
    if (this.value === 'other') {
        customCountry.classList.remove('hidden');
        customCountry.required = true;
        customCountry.focus();
    } else {
        customCountry.classList.add('hidden');
        customCountry.required = false;
        customCountry.value = '';
    }
});

// Update the filterMatches function to handle custom country
function filterMatches() {
    const ageGroup = document.querySelector('select[name="ageGroup"]').value;
    const companionSex = document.querySelector('input[name="companionSex"]:checked').value;
    const countrySelect = document.getElementById('countrySelect');
    const customCountry = document.getElementById('customCountry');
    const country = countrySelect.value === 'other' ? customCountry.value.toLowerCase() : countrySelect.value;
    const matchCards = document.querySelectorAll('.match-card');
    
    // Get age range from selected age group
    let minAge, maxAge;
    if (ageGroup) {
        [minAge, maxAge] = ageGroup.split('-').map(Number);
    }

    matchCards.forEach(card => {
        const cardAge = parseInt(card.dataset.age);
        const cardGender = card.dataset.gender;
        const cardCountry = card.dataset.country;
        let shouldShow = true;

        // Filter by age
        if (ageGroup && (cardAge < minAge || cardAge > maxAge)) {
            shouldShow = false;
        }

        // Filter by gender
        if (companionSex !== 'any' && cardGender !== companionSex) {
            shouldShow = false;
        }

        // Filter by country
        if (country) {
            if (countrySelect.value === 'other') {
                // For custom country, check if the country name contains the input text
                shouldShow = cardCountry.toLowerCase().includes(country);
            } else if (cardCountry !== country) {
                shouldShow = false;
            }
        }

        // Show/hide card based on filters
        card.style.display = shouldShow ? 'block' : 'none';
    });
}

// Add event listeners for preference changes
document.querySelector('select[name="ageGroup"]').addEventListener('change', filterMatches);
document.querySelector('select[name="country"]').addEventListener('change', filterMatches);
document.querySelectorAll('input[name="companionSex"]').forEach(radio => {
    radio.addEventListener('change', filterMatches);
});

// Initial filter when preferences are loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.match-card')) {
        filterMatches();
    }
});

// Sample user data
const sampleUsers = [
    {
        name: "Sarah",
        age: 28,
        location: "New York",
        interests: ["Adventure", "Photography", "Food"],
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
        name: "Alex",
        age: 31,
        location: "Toronto",
        interests: ["Hiking", "Photography", "History"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
        name: "Emma",
        age: 27,
        location: "Amsterdam",
        interests: ["Art", "Cycling", "Food"],
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    {
        name: "James",
        age: 29,
        location: "Sydney",
        interests: ["Surfing", "Photography", "Food"],
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
        name: "Sophie",
        age: 24,
        location: "Vienna",
        interests: ["Music", "Art", "Food"],
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    }
];

// Function to get random users
function getRandomUsers(count) {
    const shuffled = [...sampleUsers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to create user card HTML
function createUserCard(user) {
    return `
        <div class="user-card">
            <img src="${user.image}" alt="${user.name}">
            <h3>${user.name}</h3>
            <p>${user.age} years old</p>
            <p>From: ${user.location}</p>
            <div class="interests">
                ${user.interests.map(interest => `<span>${interest}</span>`).join('')}
            </div>
            <button class="connect-btn">Connect</button>
        </div>
    `;
}

// Find Companion button functionality
document.getElementById('findCompanionBtn')?.addEventListener('click', () => {
    // Get random users
    const randomUsers = getRandomUsers(3);
    
    // Clear existing cards
    const userCardsContainer = document.querySelector('.user-cards');
    if (userCardsContainer) {
        userCardsContainer.innerHTML = '';
        
        // Add new cards
        randomUsers.forEach(user => {
            userCardsContainer.innerHTML += createUserCard(user);
        });
        
        // Switch to matches tab
        document.querySelector('[data-tab="matches"]').click();
    }
}); 
// 3. JAVASCRIPT: INTERACTIVITY AND DYNAMIC CONTENT

// -- Mock Data (simulating an API response) --
const eventsData = [
    {
        id: 1,
        title: "Summer Music Festival",
        date: "2025-08-15T18:00:00",
        location: "Central Park, Metropolis",
        description: "An outdoor festival featuring the best indie bands from around the country. Bring a blanket and enjoy the tunes under the stars.",
        category: "Music",
        imageText: "🎵"
    },
    {
        id: 2,
        title: "Downtown Art Walk",
        date: "2025-08-20T17:00:00",
        location: "Arts District, Gotham",
        description: "Explore local galleries and artist studios. A night of culture, creativity, and community. Free for all ages.",
        category: "Art",
        imageText: "🎨"
    },
    {
        id: 3,
        title: "Gourmet Food Truck Rally",
        date: "2025-08-22T12:00:00",
        location: "Waterfront Park, Star City",
        description: "Taste the best street food your city has to offer. Over 20 food trucks, live music, and family-friendly activities.",
        category: "Food",
        imageText: "🍔"
    },
    {
        id: 4,
        title: "Tech Innovators Conference",
        date: "2025-09-05T09:00:00",
        location: "Convention Center, Central City",
        description: "Join industry leaders for a day of talks on the future of technology, AI, and sustainable innovation. Great for networking.",
        category: "Tech",
        imageText: "💻"
    },
    {
        id: 5,
        title: "Charity 5K Run",
        date: "2025-09-10T08:00:00",
        location: "Lakeside Path, Keystone",
        description: "Run for a cause! All proceeds from this 5K run/walk will go to support local animal shelters. Pets are welcome!",
        category: "Sports",
        imageText: "🏃"
    },
    {
        id: 6,
        title: "Open Mic Night",
        date: "2025-09-12T20:00:00",
        location: "The Laughing Bean Cafe",
        description: "Share your poetry, comedy, or music in a supportive and friendly environment. Sign-ups start at 7:30 PM.",
        category: "Community",
        imageText: "🎤"
    }
];

// -- DOM Element Selection --
const eventGrid = document.getElementById('event-grid');
const modal = document.getElementById('event-modal');
const closeModalBtn = document.getElementById('close-modal');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');

// -- Core Functions --

/**
 * Formats a date string into a more readable format.
 * @param {string} dateString - The ISO date string.
 * @returns {string} - Formatted date and time.
 */
function formatEventDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Creates and displays event cards in the grid.
 * @param {Array} events - An array of event objects.
 */
function displayEvents(events) {
    if (!eventGrid) return; // Safety check
    eventGrid.innerHTML = ''; // Clear existing events
    events.forEach(event => {
        const card = document.createElement('article');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-card-image" style="background-color: ${getCategoryColor(event.category)}">${event.imageText}</div>
            <div class="event-card-content">
                <h3>${event.title}</h3>
                <div class="event-info">
                    <span>📅 ${new Date(event.date).toLocaleDateString()}</span>
                    <span>📍 ${event.location}</span>
                </div>
                <div class="event-card-footer">
                    <span class="event-category">${event.category}</span>
                    <button class="btn btn-primary view-details" data-id="${event.id}">View Details</button>
                </div>
            </div>
        `;
        eventGrid.appendChild(card);
    });
}

/**
 * Returns a color based on the event category.
 * @param {string} category - The event category.
 * @returns {string} - A hex color code.
 */
function getCategoryColor(category) {
    const colors = {
        'Music': '#50E3C2', // Teal
        'Art': '#F5A623',   // Orange
        'Food': '#E24A7F',  // A custom pink/red
        'Tech': '#4A90E2',  // Blue
        'Sports': '#7ED321', // Green
        'Community': '#9013FE' // Purple
    };
    return colors[category] || '#888';
}

/**
 * Opens the modal and populates it with event details.
 * @param {number} eventId - The ID of the event to show.
 */
function openModal(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
        document.getElementById('modal-title').textContent = event.title;
        document.getElementById('modal-date').textContent = formatEventDate(event.date);
        document.getElementById('modal-location').textContent = event.location;
        document.getElementById('modal-description').textContent = event.description;
        modal.style.display = 'block';
    }
}

// -- Event Listeners --

// Load initial events when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    displayEvents(eventsData);
});

// Hamburger menu toggle
if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Close modal
if (modal && closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal if clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Event delegation for "View Details" buttons
if (eventGrid) {
    eventGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')) {
            const eventId = parseInt(e.target.getAttribute('data-id'));
            openModal(eventId);
        }
    });
}
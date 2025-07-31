// src/App.js

// This function contains the core application logic.
// It's exported so it can be called from index.js.
export function initializeApp() {
    const events = [
        {
            title: "Summer Music Fest",
            category: "Music",
            date: "August 15, 2025",
            location: "Central Park, Downtown",
            description: "An open-air festival featuring the best local bands and artists. Bring a blanket and enjoy the vibes.",
            price: "$25",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
        },
        {
            title: "Downtown Art Walk",
            category: "Art",
            date: "August 20, 2025",
            location: "Gallery District",
            description: "Explore dozens of galleries and studios showcasing incredible local talent. A perfect evening for art lovers.",
            price: "Free",
            image: "https://images.unsplash.com/photo-1534439829553-1c909a508789?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
        },
        {
            title: "Gourmet Food Fair",
            category: "Food",
            date: "August 22, 2025",
            location: "Waterfront Plaza",
            description: "Taste the city's best culinary creations from food trucks and pop-up restaurants. A feast for the senses.",
            price: "Varies",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
        },
        {
            title: "Tech Innovators Conference",
            category: "Tech",
            date: "September 5, 2025",
            location: "Convention Center",
            description: "Join industry leaders for a day of insightful talks on the future of technology, AI, and sustainable innovation.",
            price: "$150",
            image: "https://images.unsplash.com/photo-1526948531399-320e7e40f05d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
        },
        {
            title: "Rooftop Yoga Session",
            category: "Wellness",
            date: "August 18, 2025",
            location: "The Skydeck Building",
            description: "Start your week with a refreshing sunrise yoga session overlooking the city. All levels are welcome.",
            price: "$20",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
        },
        {
            title: "Indie Film Premiere",
            category: "Art",
            date: "September 1, 2025",
            location: "The Grand Cinema",
            description: "Be the first to see a groundbreaking new film from an acclaimed independent director, followed by a Q&A.",
            price: "$18",
            image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
        }
    ];

    const eventGrid = document.getElementById('eventGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchButton = document.getElementById('searchButton');
    const eventsHeading = document.getElementById('events-heading');

    const calendarIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
    const locationIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;

    function createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-image" style="background-image: url('${event.image}')">
                <span class="event-category">${event.category}</span>
            </div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-info">
                    ${calendarIcon}
                    <span>${event.date}</span>
                </div>
                <div class="event-info">
                    ${locationIcon}
                    <span>${event.location}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-footer">
                    <span class="event-price">${event.price}</span>
                    <a href="#" class="details-button">View Details</a>
                </div>
            </div>
        `;
        return card;
    }

    function displayEvents(filteredEvents) {
        eventGrid.innerHTML = '';
        if (filteredEvents.length === 0) {
            eventsHeading.textContent = "No events found";
            return;
        }
        eventsHeading.textContent = "Upcoming Events";
        filteredEvents.forEach(event => {
            const card = createEventCard(event);
            eventGrid.appendChild(card);
        });
    }

    function filterEvents() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        const filteredEvents = events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                                  event.description.toLowerCase().includes(searchTerm) ||
                                  event.location.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || event.category === category;
            return matchesSearch && matchesCategory;
        });

        displayEvents(filteredEvents);
    }

    // Initial display of all events
    displayEvents(events);

    // Event listeners for filtering
    searchButton.addEventListener('click', filterEvents);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterEvents();
        }
    });
    categoryFilter.addEventListener('change', filterEvents);
}
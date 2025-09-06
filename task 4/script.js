document.addEventListener('DOMContentLoaded', () => {

            // Mock blog post data
            const posts = [
                { id: 1, title: "Getting Started with JavaScript", image: "https://placehold.co/600x400/34495e/ecf0f1?text=JS", description: "A beginner's guide to the fundamentals of JavaScript and web development.", category: "Tech", date: "2024-09-01" },
                { id: 2, title: "Exploring the Italian Dolomites", image: "https://placehold.co/600x400/ecf0f1/34495e?text=Dolomites", description: "Breathtaking landscapes and hiking trails in Northern Italy.", category: "Travel", date: "2024-08-28" },
                { id: 3, title: "My Favorite Tiramisu Recipe", image: "https://placehold.co/600x400/ecf0f1/34495e?text=Tiramisu", description: "A rich and creamy classic Italian dessert with a modern twist.", category: "Food", date: "2024-08-25" },
                { id: 4, title: "The Rise of AI in Everyday Life", image: "https://placehold.co/600x400/34495e/ecf0f1?text=AI", description: "How artificial intelligence is transforming our daily routines.", category: "Tech", date: "2024-08-20" },
                { id: 5, title: "A Weekend in Paris", image: "https://placehold.co/600x400/ecf0f1/34495e?text=Paris", description: "A short but sweet travel itinerary for the city of lights.", category: "Travel", date: "2024-08-15" },
                { id: 6, title: "Baking Sourdough from Scratch", image: "https://placehold.co/600x400/ecf0f1/34495e?text=Sourdough", description: "The satisfying journey of creating your own sourdough starter.", category: "Food", date: "2024-08-10" },
                { id: 7, title: "Introduction to Cloud Computing", image: "https://placehold.co/600x400/34495e/ecf0f1?text=Cloud", description: "Understanding the basics of cloud services and their importance.", category: "Tech", date: "2024-08-05" },
                { id: 8, title: "Hiking the Pacific Crest Trail", image: "https://placehold.co/600x400/ecf0f1/34495e?text=PCT", description: "My experience on one of the world's most famous long-distance trails.", category: "Travel", date: "2024-08-01" },
                { id: 9, title: "5-Minute Healthy Smoothies", image: "https://placehold.co/600x400/ecf0f1/34495e?text=Smoothies", description: "Quick and delicious smoothie recipes for a healthy breakfast.", category: "Food", date: "2024-07-28" },
                { id: 10, title: "Building a Simple REST API", image: "https://placehold.co/600x400/34495e/ecf0f1?text=API", description: "A step-by-step guide to creating your first web API.", category: "Tech", date: "2024-07-25" },
                { id: 11, title: "Discovering Hidden Gems in Kyoto", image: "https://placehold.co/600x400/ecf0f1/34495e?text=Kyoto", description: "Beyond the temples: finding authentic experiences in Kyoto, Japan.", category: "Travel", date: "2024-07-20" },
                { id: 12, title: "Grilling the Perfect Steak", image: "https://placehold.co/600x400/ecf0f1/34495e?text=Steak", description: "Tips and tricks for a perfectly cooked steak every time.", category: "Food", date: "2024-07-15" },
                { id: 13, title: "Mastering CSS Grid", image: "https://placehold.co/600x400/34495e/ecf0f1?text=CSS+Grid", description: "A deep dive into CSS Grid for modern web layouts.", category: "Tech", date: "2024-07-10" },
                { id: 14, title: "Backpacking through Southeast Asia", image: "https://placehold.co/600x400/ecf0f1/34495e?text=SE+Asia", description: "My adventures traveling through Thailand, Vietnam, and Cambodia.", category: "Travel", date: "2024-07-05" },
                { id: 15, title: "Making Homemade Pasta", image: "https://placehold.co/600x400/ecf0f1/34495e?text=Pasta", description: "From flour to fork: a guide to making fresh pasta by hand.", category: "Food", date: "2024-07-01" },
            ];

            const postsPerPage = 6;
            let currentPage = 1;
            let currentCategory = 'All';
            let searchQuery = '';

            const postsContainer = document.getElementById('posts-container');
            const paginationContainer = document.getElementById('pagination-container');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const searchInput = document.getElementById('search-input');

            const renderPosts = (postsToShow) => {
                postsContainer.innerHTML = '';
                if (postsToShow.length === 0) {
                    postsContainer.innerHTML = '<p class="no-posts">No posts found for this query.</p>';
                    return;
                }
                postsToShow.forEach(post => {
                    const postCard = `
                        <div class="post-card">
                            <img src="${post.image}" alt="${post.title}" class="post-image">
                            <div class="post-content">
                                <span class="post-category">${post.category}</span>
                                <h3 class="post-title">${post.title}</h3>
                                <p class="post-description">${post.description}</p>
                                <div class="post-meta">
                                    <span>${post.date}</span>
                                    <a href="#" class="read-more-link">Read more &rarr;</a>
                                </div>
                            </div>
                        </div>
                    `;
                    postsContainer.innerHTML += postCard;
                });
            };

            const renderPagination = (filteredPosts) => {
                paginationContainer.innerHTML = '';
                const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

                if (totalPages > 1) {
                    // Previous button
                    const prevButton = document.createElement('button');
                    prevButton.textContent = 'Previous';
                    prevButton.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
                    prevButton.disabled = currentPage === 1;
                    prevButton.onclick = () => {
                        currentPage--;
                        filterAndRenderPosts();
                    };
                    paginationContainer.appendChild(prevButton);

                    // Page buttons
                    for (let i = 1; i <= totalPages; i++) {
                        const pageButton = document.createElement('button');
                        pageButton.textContent = i;
                        pageButton.className = `page-number ${currentPage === i ? 'active' : ''}`;
                        pageButton.onclick = () => {
                            currentPage = i;
                            filterAndRenderPosts();
                        };
                        paginationContainer.appendChild(pageButton);
                    }

                    // Next button
                    const nextButton = document.createElement('button');
                    nextButton.textContent = 'Next';
                    nextButton.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
                    nextButton.disabled = currentPage === totalPages;
                    nextButton.onclick = () => {
                        currentPage++;
                        filterAndRenderPosts();
                    };
                    paginationContainer.appendChild(nextButton);
                }
            };

            const filterAndRenderPosts = () => {
                const filteredByCategory = currentCategory === 'All' ? posts : posts.filter(post => post.category === currentCategory);
                const filteredBySearch = filteredByCategory.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
                
                const startIndex = (currentPage - 1) * postsPerPage;
                const endIndex = startIndex + postsPerPage;
                const postsToShow = filteredBySearch.slice(startIndex, endIndex);

                renderPosts(postsToShow);
                renderPagination(filteredBySearch);
            };

            // Event listeners
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    currentCategory = button.dataset.category;
                    currentPage = 1;
                    filterAndRenderPosts();
                });
            });

            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                currentPage = 1;
                filterAndRenderPosts();
            });

            // Initial render
            filterAndRenderPosts();
        });
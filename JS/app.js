// ==================== MAIN APP ====================

let currentPage = 1;
let currentQuery = "";
let currentCategory = "business";
let isLoading = false;
let showingFavorites = false;

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const suggestionsDiv = document.getElementById("suggestions");
const categoryButtons = document.querySelectorAll(".category-btn");
const favoritesBtn = document.getElementById("favoritesBtn");
const themeToggle = document.getElementById("themeToggle");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    // Theme Init
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        updateThemeIcon(true);
    }

    updateFavCount();
    fetchNewsAndRender();
    setupEventListeners();
});

function updateThemeIcon(isDark) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector("i");
    if (icon) {
        if (isDark) {
            icon.className = "fas fa-sun";
        } else {
            icon.className = "fas fa-moon";
        }
    }
}

async function fetchNewsAndRender(isLoadMore = false) {
    if (isLoading) return;
    isLoading = true;

    const errorDiv = document.getElementById("error");
    if (errorDiv) errorDiv.textContent = "";

    if (!isLoadMore) {
        showSkeletonLoader();
        currentPage = 1;
    }

    try {
        let articles = [];
        if (showingFavorites) {
            articles = favorites;
            if (loadMoreBtn) loadMoreBtn.style.display = "none";
        } else {
            articles = await fetchNews(currentQuery, currentCategory, currentPage);
            if (loadMoreBtn) {
                // Show load more if we fetched exactly page size (12)
                loadMoreBtn.style.display = articles.length === 12 ? "block" : "none";
            }
        }

        if (!isLoadMore) newsContainer.innerHTML = "";

        articles.forEach(article => {
            if (article.title && article.title !== "[Removed]") {
                newsContainer.appendChild(createCard(article));
            }
        });

        if (showingFavorites && articles.length === 0) {

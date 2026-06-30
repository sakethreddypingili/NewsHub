// ==================== UI RENDERING ====================

const newsContainer = document.getElementById("news");

function createCard(article) {
    const card = document.createElement("div");
    card.className = "article";

    const isFav = isFavorite(article.url);

    const imageHTML = `
        <img 
            src="${article.urlToImage || DEFAULT_IMAGE}" 
            alt="${article.title || 'News image'}"
            loading="lazy"
            onerror="this.src='${DEFAULT_IMAGE}'"
        >
    `;

    card.innerHTML = `
        <div class="article-image-wrapper">
            ${imageHTML}
            <button class="bookmark-btn ${isFav ? 'active' : ''}" data-url="${article.url}">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="article-content">
            <h3>${article.title || 'No Title Available'}</h3>
            <p>${article.description ? article.description.substring(0, 130) + "..." : "Click to read the full story"}</p>
            <div class="article-meta">
                <span>${article.source?.name || "News Source"}</span>
                <span>${timeAgo(article.publishedAt)}</span>
            </div>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="read-more">Read Full Article →</a>
        </div>
    `;

    // Bookmark click event
    card.querySelector(".bookmark-btn").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(article);
        if (typeof showingFavorites !== 'undefined' && !showingFavorites) {
            e.currentTarget.classList.toggle("active");
        }
    });

    return card;
}

function showSkeletonLoader(count = 6) {
    newsContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement("div");
        skeleton.className = "skeleton-card";
        skeleton.innerHTML = `
            <div class="skeleton-img skeleton-pulse"></div>
            <div class="skeleton-content">
                <div class="skeleton-title skeleton-pulse"></div>
                <div class="skeleton-title skeleton-pulse" style="width: 80%;"></div>
                <div class="skeleton-text skeleton-pulse"></div>
                <div class="skeleton-text skeleton-pulse" style="width: 90%;"></div>
                <div class="skeleton-meta skeleton-pulse"></div>
            </div>
        `;
        newsContainer.appendChild(skeleton);
    }

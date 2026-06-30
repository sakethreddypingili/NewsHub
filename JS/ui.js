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

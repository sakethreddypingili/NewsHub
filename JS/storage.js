let favorites = JSON.parse(localStorage.getItem("newsFavorites")) || [];

function saveFavorites() {
    localStorage.setItem("newsFavorites", JSON.stringify(favorites));
}

function isFavorite(url) {
    return favorites.some(fav => fav.url === url);
}

function toggleFavorite(article) {
    if (isFavorite(article.url)) {
        favorites = favorites.filter(fav => fav.url !== article.url);
        showToast("Removed from favorites");
    } else {

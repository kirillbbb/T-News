document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.search-tab');
    const contents = document.querySelectorAll('.search-content__users, .search-content__posts');
    const searchQuery = document.getElementById('searchQuery');
    const usersResults = document.getElementById('usersResults');
    const postsResults = document.getElementById('postsResults');
    const messageElement = document.getElementById('message');

    // Обработка переключения вкладок
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const contentType = tab.getAttribute('data-type');
            document.querySelector(`.search-content__${contentType}`).classList.add('active');
            loadSearchResults(); // Обновляем результаты при переключении
        });
    });

    // Загрузка результатов поиска
    async function loadSearchResults() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (!query) {
            messageElement.textContent = 'Введите запрос в поиске';
            messageElement.style.color = 'red';
            return;
        }

        searchQuery.textContent = query;
        try {
            const response = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Ошибка запроса');
            const data = await response.json();

            usersResults.innerHTML = '';
            postsResults.innerHTML = '';

            // Отображаем пользователей
            if (data.users.length > 0) {
                data.users.forEach(user => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.innerHTML = `
                        <img src="../../icons/default-avatar-profile-icon-vector-600nw-1745180411.jpg" alt="photo" class="search-result-avatar">
                        <span class="search-result-name">${user.login}</span>
                    `;
                    usersResults.appendChild(item);
                });
            } else {
                usersResults.innerHTML = '<p>Пользователи не найдены</p>';
            }

            // Отображаем посты
            if (data.posts.length > 0) {
                data.posts.forEach(post => {
                    const article = document.createElement('article');
                    article.className = 'news-feed__publication';
                    article.innerHTML = `
                        <div class="news-feed__author">
                            <img class="news-feed__author-img" src="${post.user_id === 1 ? '../../icons/default-avatar-profile-icon-vector-600nw-1745180411.jpg' : '../../icons/default-avatar-profile-icon-vector-600nw-1745180411.jpg'}" alt="photo author">
                            <span class="news-feed__author-name">User ${post.user_id}</span>
                        </div>
                        <div class="news-feed__text">
                            <p>${post.content}</p>
                        </div>
                        <div class="news-feed__interaction">
                            <button class="news-feed__like button primary">
                                <img src="/icons/button-heart.svg" alt="Лайк">
                                <span class="like-count">0</span>
                            </button>
                            <button class="news-feed__comment button secondary">
                                <span class="news-feed__comment-text">Комментарий</span>
                                <span class="news-feed__comment-count">0</span>
                            </button>
                        </div>
                    `;
                    postsResults.appendChild(article);
                });
            } else {
                postsResults.innerHTML = '<p>Посты не найдены</p>';
            }
        } catch (error) {
            messageElement.textContent = 'Ошибка при загрузке результатов';
            messageElement.style.color = 'red';
            console.error('Ошибка:', error);
        }
    }

    // Загрузка результатов при открытии страницы
    loadSearchResults();

    // Активируем первую вкладку по умолчанию
    tabs[0].classList.add('active');
    document.querySelector('.search-content__users').classList.add('active');
});
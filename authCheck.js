let isAuthenticated = false; // Для теста можно переключить на true

// Функция для обновления header
function updateHeader() {
    const searchContainer = document.getElementById('searchContainer');
    const authContainer = document.getElementById('authContainer');

    // Очищаем контейнеры
    searchContainer.innerHTML = '';
    authContainer.innerHTML = '';

    // Добавляем форму поиска
    const searchForm = document.createElement('form');
    searchForm.className = 'header__search';
    searchForm.setAttribute('role', 'search');
    searchForm.setAttribute('action', '/search');

    const searchLabel = document.createElement('label');
    searchLabel.className = 'visually-hidden';
    searchLabel.setAttribute('for', 'searchInput');

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = 'searchInput';
    searchInput.name = 'q';
    searchInput.placeholder = 'Поиск по T-News';
    searchInput.setAttribute('aria-label', 'Поиск новостей');

    // --- НОВОЕ: Контейнер для поля поиска и кнопки очистки ---
    const searchInputWrapper = document.createElement('div');
    searchInputWrapper.className = 'search-input-wrapper';

    // Добавляем поле ввода в обертку
    searchInputWrapper.appendChild(searchInput);

    // --- НАЧАЛО: Код для кастомной кнопки очистки ---
    const customClearButton = document.createElement('button');
    customClearButton.type = 'button'; // Предотвращает отправку формы
    customClearButton.className = 'custom-search-clear-button';
    customClearButton.setAttribute('aria-label', 'Очистить поиск');

    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('width', '12');
    svgIcon.setAttribute('height', '12');
    svgIcon.setAttribute('viewBox', '0 0 15 15');
    svgIcon.setAttribute('fill', 'none');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('clip-rule', 'evenodd');
    path.setAttribute('d', 'M8.022 9.437 12 13.415l1.415-1.414-3.979-3.978L13.459 4l-1.415-1.414-4.022 4.022-4.023-4.022L2.585 4l4.023 4.023-4.021 4.02 1.414 1.414 4.02-4.02Z');
    path.setAttribute('fill', 'currentColor');

    svgIcon.appendChild(path);
    customClearButton.appendChild(svgIcon);

    customClearButton.style.display = 'none'; // Изначально скрыта

    // Обработчик для очистки поля
    customClearButton.addEventListener('click', () => {
        searchInput.value = '';
        customClearButton.style.display = 'none';
        searchInput.focus();
    });

    // Обработчик для показа/скрытия кнопки
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            customClearButton.style.display = 'block';
        } else {
            customClearButton.style.display = 'none';
        }
    });

    // Проверяем состояние поля при загрузке
    if (searchInput.value.length > 0) {
        customClearButton.style.display = 'block';
    }

    // Добавляем кнопку очистки в обертку
    searchInputWrapper.appendChild(customClearButton);

    // Добавляем элементы в форму
    searchForm.appendChild(searchLabel);
    searchForm.appendChild(searchInputWrapper);
    searchContainer.appendChild(searchForm);

    // Добавляем кнопки авторизации
    if (isAuthenticated) {
        // Кнопки для авторизованного пользователя
        const logoutButton = document.createElement('button');
        logoutButton.className = 'header__button header__button--logout';
        logoutButton.setAttribute('aria-label', 'Выйти из аккаунта');
        logoutButton.textContent = 'Выйти';
        const logoutIcon = document.createElement('img');
        logoutIcon.src = '/icons/arrow-in-right.svg';
        logoutIcon.alt = '';
        logoutButton.appendChild(logoutIcon);

        const profileButton = document.createElement('button');
        profileButton.className = 'header__button header__button--profile';
        profileButton.setAttribute('aria-label', 'Перейти в профиль');
        const profileIcon = document.createElement('img');
        profileIcon.src = '/icons/Profile.svg';
        profileIcon.alt = '';
        profileButton.appendChild(profileIcon);

        authContainer.appendChild(logoutButton);
        authContainer.appendChild(profileButton);
    } else {
        // Кнопки для неавторизованного пользователя
        const registerButton = document.createElement('button');
        registerButton.className = 'header__button header__button--register';
        registerButton.setAttribute('aria-label', 'Зарегистрироваться');
        registerButton.textContent = 'Регистрация';
        const registerIcon = document.createElement('img');
        registerIcon.src = '/icons/arrow-in-right.svg';
        registerIcon.alt = '';
        registerButton.appendChild(registerIcon);

        const loginButton = document.createElement('button');
        loginButton.className = 'header__button header__button--login';
        loginButton.setAttribute('aria-label', 'Войти в аккаунт');
        loginButton.textContent = 'Войти';
        const loginIcon = document.createElement('img');
        loginIcon.src = '/icons/arrow-in-right.svg';
        loginIcon.alt = '';
        loginButton.appendChild(loginIcon);

        authContainer.appendChild(registerButton); // Сначала "Регистрация"
        authContainer.appendChild(loginButton); // Затем "Войти"
    }
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', updateHeader);

// Для тестирования
function toggleAuth() {
    isAuthenticated = !isAuthenticated;
    updateHeader();
}
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
    searchInputWrapper.className = 'search-input-wrapper'; // Используем этот класс в CSS для позиционирования

    // Добавляем поле ввода в обертку
    searchInputWrapper.appendChild(searchInput);

    // --- НАЧАЛО: Код для вашей кастомной кнопки очистки ---
    const customClearButton = document.createElement('button');
    customClearButton.type = 'button'; // Важно: предотвращает отправку формы
    customClearButton.className = 'custom-search-clear-button'; // Класс для стилизации (определен в CSS)
    customClearButton.setAttribute('aria-label', 'Очистить поиск');

    // Создаем SVG-элемент для иконки "X"
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('width', '12');
    svgIcon.setAttribute('height', '12');
    svgIcon.setAttribute('viewBox', '0 0 15 15');
    svgIcon.setAttribute('fill', 'none'); // Устанавливаем fill="none" здесь, если ваш path сам задает fill

    // Создаем path-элемент для формы "X"
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('clip-rule', 'evenodd');
    path.setAttribute('d', 'M8.022 9.437 12 13.415l1.415-1.414-3.979-3.978L13.459 4l-1.415-1.414-4.022 4.022-4.023-4.022L2.585 4l4.023 4.023-4.021 4.02 1.414 1.414 4.02-4.02Z');
    path.setAttribute('fill', 'currentColor'); // Это заставит SVG наследовать цвет из CSS-свойства `color` родителя

    svgIcon.appendChild(path);           // Добавляем path в SVG
    customClearButton.appendChild(svgIcon); // Добавляем SVG в кнопку

    customClearButton.style.display = 'none'; // Изначально скрываем кастомную кнопку

    // Добавляем обработчик события для очистки поля ввода при клике на кастомную кнопку
    customClearButton.addEventListener('click', () => {
        searchInput.value = '';
        customClearButton.style.display = 'none'; // Скрываем кнопку после очистки
        searchInput.focus(); // Возвращаем фокус на поле ввода
    });

    // Добавляем обработчик события 'input' для показа/скрытия кастомной кнопки
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            customClearButton.style.display = 'block'; // Показываем кнопку
        } else {
            customClearButton.style.display = 'none'; // Скрываем кнопку
        }
    });

    // Проверяем состояние поля ввода при первой загрузке (например, если есть автозаполнение)
    if (searchInput.value.length > 0) {
        customClearButton.style.display = 'block';
    } else {
        customClearButton.style.display = 'none';
    }
    // --- КОНЕЦ: Код для вашей кастомной кнопки очистки ---

    // Добавляем элементы в форму поиска
    searchForm.appendChild(searchLabel);
    searchForm.appendChild(searchInputWrapper); // НОВОЕ: Добавляем обертку вместо прямого input
    searchInputWrapper.appendChild(customClearButton); // НОВОЕ: Добавляем кастомную кнопку внутрь обертки

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
        registerButton.textContent = 'Зарегистрироваться';
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

        authContainer.appendChild(registerButton);
        authContainer.appendChild(loginButton);
    }
}

document.addEventListener('DOMContentLoaded', updateHeader);

function toggleAuth() {
    isAuthenticated = !isAuthenticated;
    updateHeader();
}

document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('authContainer');

    if (authContainer) {
        authContainer.addEventListener('click', (event) => {
            if (event.target.closest('.header__button--login') || event.target.closest('.header__button--logout')) {
                toggleAuth();
                console.log('Статус авторизации изменен.');
            }
        });
    } else {
        console.warn('Элемент #authContainer не найден. Обработчик событий для авторизации не будет работать.');
    }
});
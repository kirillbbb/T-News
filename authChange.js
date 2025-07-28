document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('authContainer');

    if (authContainer) {
        authContainer.addEventListener('click', (event) => {
            // Проверяем, является ли кликнутый элемент кнопкой "Войти"
            if (event.target.closest('.header__button--login')) {
                toggleAuth();
                console.log('Кнопка "Войти" нажата, статус авторизации изменен.');
            }
            // Добавляем проверку для кнопки "Выйти"
            else if (event.target.closest('.header__button--logout')) {
                toggleAuth();
                console.log('Кнопка "Выйти" нажата, статус авторизации изменен.');
            }
        });
    } else {
        console.warn('Элемент #authContainer не найден. Прослушиватель событий для авторизации не будет работать.');
    }
});
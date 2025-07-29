
    document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.search-tab');
    const contents = document.querySelectorAll('.search-content__users, .search-content__posts');

    tabs.forEach(tab => {
    tab.addEventListener('click', () => {
    // Убираем активный класс у всех вкладок и контента
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    // Добавляем активный класс выбранной вкладке и соответствующему контенту
    tab.classList.add('active');
    const contentType = tab.getAttribute('data-type');
    document.querySelector(`.search-content__${contentType}`).classList.add('active');
});
});

    // Активируем первую вкладку по умолчанию
    tabs[0].classList.add('active');
    document.querySelector('.search-content__users').classList.add('active');
});
const btns = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', function (e) {
    const target = e.target;
    const id = target.dataset.id;
    if (!id) return;

    btns.forEach(function (btn) {
        btn.classList.remove('active');
    });
    target.classList.add('active');

    articles.forEach(function (item) {
        if (item.id === id) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }

    })
})

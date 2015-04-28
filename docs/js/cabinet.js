document.addEventListener('DOMContentLoaded', function() {
    function query(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    // === Elements

    var cabinet = document.querySelector('.cabinet-container'),
        content = cabinet.querySelector('.content'),
        links = query('.btn.test').concat(query('.btn.src'));

    // === Handlers

    function showCabinet(e) {
        e.preventDefault();

        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', this.getAttribute('href'));
        iframe.style.width = '100%';
        iframe.style.height = '100%';

        cabinet.className += ' visible';
        content.appendChild(iframe);
    }

    function hideCabinet() {
        cabinet.className = cabinet.className.replace(' visible', '');
        content.innerHTML = '';
    }

    // === Bind

    links.forEach(function(link) {
        link.addEventListener('click', showCabinet);
    });
    cabinet.querySelector('.close').addEventListener('click', hideCabinet);
    cabinet.querySelector('.cabinet-shadow').addEventListener('click', hideCabinet);
});
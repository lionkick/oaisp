$(function () {

    $.get("/partials/_awards-widget.html", function (data) {
        document.querySelector('header').insertAdjacentHTML("afterend", data);
        $('#awards-widget .awards-widget__body').css('overflow', 'hidden');
        $('#awards-widget .awards-widget__btn').on('click', function () {
            const awardsWidget = this.closest('.awards-widget');
            if (awardsWidget.classList.contains('active')) {
                awardsWidget.classList.remove('show');
                setTimeout(function () {
                    awardsWidget.classList.remove('active');
                }, 300);
            } else {
                awardsWidget.classList.add('active');
                setTimeout(function () {
                    awardsWidget.classList.add('show');
                }, 300);
            }
        });
    });

});
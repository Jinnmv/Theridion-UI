// Placeholder
(function() {
    $('.toggle-sidebar').click(function() {
        $('.sidebar-menu').addClass('open');
        $('.filter').removeClass('open');
    });

    $('.toggle-filter').click(function() {
        $('.filter').addClass('open');
        $('.sidebar-menu').removeClass('open');
    });

    $('.filter-close-btn, .filter-apply-btn').click(function() {
        $('.filter').removeClass('open');
    });

    $('.sidebar-close-btn').click(function() {
        $('.sidebar-menu').removeClass('open');
    });



})();

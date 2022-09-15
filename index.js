$( document ).ready(function() {
    $('#arrow_1').on("click", function (e) {
        if ($(this).hasClass('panel-collapsed')) {
            // expand the panel 1
            $('#collapsable_1').slideDown();
            $('#collapsable_1').addClass('active_collapse');
            $(this).removeClass('panel-collapsed');
            
        }
        else {
            // collapse the panel 2
            $('#collapsable_1').slideUp();
            $('#collapsable_1').removeClass('active_collapse');
            $(this).addClass('panel-collapsed');
        }
    });


    $('#arroww_2').on("click", function (e) {
        if ($(this).hasClass('panel-collapsed')) {
            // expand the panel 2
            $('#collapsable_2').slideDown();
            $('#collapsable_2').addClass('active_collapse');
            $(this).removeClass('panel-collapsed');
            
        }
        else {
            // collapse the panel 2
            $('#collapsable_2').slideUp();
            $('#collapsable_2').removeClass('active_collapse');
            $(this).addClass('panel-collapsed');
        }
    });
});
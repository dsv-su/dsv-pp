/*
 * Javascript for DSV's Polopoly instance
 */

$(function () {
    var APP_URI = '//www2.dsv.su.se/daisyweb/';
    var DAISY_HOST = 'daisy.dsv.su.se';
    var DAISY_DIMS = {
        '/servlet/Momentinfo':                        [640, 450],
        '/servlet/anstalld.Anstalldinfo':             [500, 250],
        '/anstalld/anstalldinfo.jspa':                [500, 250],
        '/servlet/schema.moment.Momentschema':        [500, 500],
        '/servlet/student.Studentinfo':               [400, 300],
        '/anstalld/publikation/publicationInfo.jspa': [500, 500]
    };
    var THROBBER_URI = '//www2.dsv.su.se/images/throbber.gif';
    var lang = $('html').attr('lang');

    function handleDaisyPopupClick() {
        var dims = DAISY_DIMS[this.pathname];
        if (dims) {
            window.open(this.href, '_blank',
                        'scrollbars=yes,resizable=yes,width=' + dims[0] +
                        ',height=' + dims[1]);
            return false;
        } else {
            return true;
        }
    }

    function popupifyDaisyLinks(parent) {
        $('a', parent).filter(function () {
            return this.hostname === DAISY_HOST;
        }).click(handleDaisyPopupClick);
    }

    /*
     * Deserialize a query string.
     *
     * Based on code from
     * http://stackoverflow.com/questions/1131630
     */
    function deparam(query) {
        var hash = {};
        if (!query) return hash;
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair.length != 2) continue;
            var k = decodeURIComponent(pair[0]);
            var v = decodeURIComponent(pair[1]);

            if (k.substr(k.length-2) === '[]') {
                if (!hash[k]) hash[k] = [];
                hash[k].push(v);
            } else {
                hash[k] = v;
            }
        } 
        return hash;
    }

    function callMacro(element, func, args, extra_query) {
        var action = null;
        var query = {lang: lang};
        var base_uri = APP_URI;
        var footable = false;

        switch (func) {
        case 'dsv_staff':
        case 'dsv_staff_new':
            action = 'staff.php';
            footable = true;
            break;
        case 'all_course_units':
        case 'course_segments':
            action = 'course_segments.php';
            footable = true;
            break;
        case 'search_publications':
            action = 'publications.php';
            break;
        case 'publications':
            action = 'publications.php';
            query.included = 1;
            query.researchArea = args.area.split(',');
            break;
        }

        if (footable && !window.footable) {
            $('<link rel="stylesheet" type="text/css" href="' + base_uri
              + 'css/footable.css" />').appendTo('head');
            $.getScript(base_uri + 'js/footable.js');
        }

        if (extra_query) $.extend(query, extra_query);

        if (action) {
            qs = $.param(query);
            if (qs !== '') qs = '&' + qs;

            $(element).addClass('dsv-macro-loading');

            function macroLoaded(html) {
                $(element).html(html).removeClass('dsv-macro-loading');
                popupifyDaisyLinks(element);
                $('a[href^="?"]', element).click(function () {
                    callMacro(element, func, args,
                              deparam(this.search.substr(1)));
                    return false;
                });
                $('form', element).submit(function () {
                    // It might seem silly to serialize and then deserialize
                    // the form values, but doing it directly is more code.
                    // (There is no form -> object function in jQuery.)
                    callMacro(element, func, args,
                              deparam($(this).serialize()));
                    return false;
                });
            }

            $.get(base_uri + action + '?' + qs, macroLoaded);
        } else {
            element.text('(Unknown macro.)');
        }
    }

    $('.dsv-macro').each(function () {
        var m = /\[\[([^\]]+)\]\]/.exec($(this).text());
        if (!m) return;
        var macro = m[1];
        m = /^(\S+)\s*/.exec(macro);
        if (!m) return;
        var func = m[1];
        var args = {};
        var arg_re = /(\S+)=("[^"]*"|[^" ]+)/g;
        while ((m = arg_re.exec(macro)) !== null) {
            args[m[1]] = m[2];
        }

        var throbber = $('<img class="dsv-throbber"/>')
            .attr('src', THROBBER_URI);
        $(this).empty().removeClass('dsv-macro').append(throbber);

        callMacro(this, func, args);
    });

    popupifyDaisyLinks(document);
});

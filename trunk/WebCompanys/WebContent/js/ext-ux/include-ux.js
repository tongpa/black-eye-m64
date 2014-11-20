/**
 * This file includes the required ext-all js and css files based upon "theme" and "rtl"
 * url parameters.  It first searches for these parameters on the page url, and if they
 * are not found there, it looks for them on the script tag src query string.
 * For example, to include the neptune flavor of ext from an index page in a subdirectory
 * of extjs/examples/:
 * <script type="text/javascript" src="../../examples/shared/include-ext.js?theme=neptune"></script>
 */
(function() {
    function getQueryParam(name) {
        var regex = RegExp('[?&]' + name + '=([^&]*)');

        var match = regex.exec(location.search) || regex.exec(path);
        return match && decodeURIComponent(match[1]);
    }

    function hasOption(opt, queryString) {
        var s = queryString || location.search;
        var re = new RegExp('(?:^|[&?])' + opt + '(?:[=]([^&]*))?(?:$|[&])', 'i');
        var m = re.exec(s);

        return m ? (m[1] === undefined || m[1] === '' ? true : m[1]) : false;
    }

    function getCookieValue(name){
        var cookies = document.cookie.split('; '),
            i = cookies.length,
            cookie, value;

        while(i--) {
           cookie = cookies[i].split('=');
           if (cookie[0] === name) {
               value = cookie[1];
           }
        }

        return value;
    }

    var scriptEls = document.getElementsByTagName('script'),
        path = scriptEls[scriptEls.length - 1].src,
        rtl = getQueryParam('rtl'),
        theme = getQueryParam('theme') || 'crisp',
        includeCSS = !hasOption('nocss', path),
        useDebug = hasOption('debug'),
        hasOverrides = !hasOption('nooverrides', path) && !!{
            // TODO: remove neptune
            neptune: 1,
            classic: 1,
            gray: 1,
            'neptune-touch': 1,
            crisp: 1,
            'crisp-touch': 1
        }[theme],
        repoDevMode = getCookieValue('ExtRepoDevMode'),
        packagePath,
        themePath,
        i = 3,
        overridePath, extPrefix;

    rtl = rtl && rtl.toString() === 'true';

    while (i--) {
        path = path.substring(0, path.lastIndexOf('/'));
    }
    // path == root of ext
    path = path + '/js/extjs'
        
    theme = 'ext-theme-' + theme;
    packagePath = path + '/packages/' + theme + '/build/';
     
    themePath = packagePath + 'resources/' + theme + (rtl ? '-all-rtl' : '-all');

    
    document.write('<script type="text/javascript" src="' + path + extPrefix +  (rtl ? '-rtl' : '') + '.js"></script>');

})();

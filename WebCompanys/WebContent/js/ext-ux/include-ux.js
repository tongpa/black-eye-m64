
(function() {
     
	var scriptEls = document.getElementsByTagName('script'),
		path = scriptEls[scriptEls.length - 1].src,
		i=3;
	console.log('include-ux');
	console.log(path);
	while (i--) {
        path = path.substring(0, path.lastIndexOf('/'));
    }
    // path == root of ext
    path = path + '/js/ext-ux/company/'
    
	console.log(path + 'app.js');
     

     

    document.write('<script type="text/javascript" src="' + path + 'addPosition.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'listPosition.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'listCompany.js"></script>');
    
    document.write('<script type="text/javascript" src="' + path + 'app.js"></script>');

})();

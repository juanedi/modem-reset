var page = require('webpage').create();

page.settings.userName = "";
page.settings.password = "";

modem_ui = "http://192.168.0.1/RgBackupRestore.asp";
jquery_src = "http://code.jquery.com/jquery-1.9.1.min.js";

backup_path = "/Users/jedi/Desktop/GatewaySettings.bin";

page.onConsoleMessage = function (msg) {
    console.log(msg);
};


page.open(modem_ui, function (status) {


	if (status === "success") {

		console.log("Página cargada...");

		page.includeJs(jquery_src, function() {
			page.evaluate(function() {
				jQuery.noConflict();
				
				// Dentro de la configuración del modem con jQuery cargado :-)
			});

			phantom.exit();
		});
	} else {
		console.log("Error al cargar la página...")
		phantom.exit();
	}

});
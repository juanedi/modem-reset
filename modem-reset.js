var page = require('webpage').create();

/**
 * Datos a completar! 
 *		- Login a la interfaz de configuracion del modem
 *		- Path absoluto al archivo de backup
 */
page.settings.userName = "";
page.settings.password = "";
backup_path = "";


modem_ui = "http://192.168.0.1/RgBackupRestore.asp";
jquery_src = "http://code.jquery.com/jquery-1.9.1.min.js";


page.onConsoleMessage = function (msg) {
    console.log(msg);
};

page.open(modem_ui, function (status) {


	if (status === "success") {

		console.log("Seleccionando backup a subir: " + backup_path);
		page.uploadFile('input[name=ImportFile]', backup_path);

		page.includeJs(jquery_src, function() {
			page.evaluate(function() {
				jQuery.noConflict();
				var filePath = jQuery("input[name=ImportFile]").val();
				
				if (filePath) {
					console.log("Reiniciando modem!");
					jQuery("input[type=submit]").click();
				} else {
					console.log("Error al subir archivo, comprobar el path.")
				}

			});
		});

	} else {
		console.log("Error al cargar la página...")
		phantom.exit();
	}

});
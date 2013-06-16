/**
 * Este script ingresa via phantomjs a la interfaz web de configuración
 * del modem Technicolor TC7110.
 *
 * Dado que el modem no ofrece interfaz telnet, se debe simular el
 * acceso desde un browser.
 *
 * Por otro lado, como no ofrece desde la interfaz una feature para
 * reiniciar, se debe contar con un backup previo de la configuración
 * del modem. Este script simplemente restaura un backup, lo que fuerza
 * que se reinicie el modem y se restrablezca la conexión en caso de que
 * esté caída.
 *
 */

var page = require('webpage').create();

// datos de login a la UI del modem
page.settings.userName = "";
page.settings.password = "";

// path absoluto al archivo de backup
backup_path = "";

modem_ui = "http://192.168.0.1/RgBackupRestore.asp";


page.onConsoleMessage = function (msg) {
    console.log(msg);
};

page.open(modem_ui, function (status) {
	if (status === "success") {

		console.log("Seleccionando backup a subir: " + backup_path);
		page.uploadFile('input[name=ImportFile]', backup_path);

		page.evaluate(function() {
			// Dentro del contexto del sitio.

			var fileInput = document.getElementsByName("ImportFile")[0];
			var restoreForm = document.getElementsByTagName("form")[0];

			if (fileInput.value) {
				console.log("Reiniciando el modem...");
				restoreForm.submit();
			} else {
				console.log("Error al subir archivo, comprobar el path.")
				phantom.exit();
			}

		});

		// hay que esperar unos segundos antes de salir, para que suba el backup
		setTimeout(function() {
			console.log("Fin!");
			phantom.exit();
		}, 7000);
	} else {
		console.log("Error al cargar la página...")
		phantom.exit();
	}
});
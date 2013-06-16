modem-reset
===========

Monitorea y reinicial modem Technicolor TC7110 (Telecentro) cuando se cae la conexión.

* Script reinicia la conexión
* Script monitorea la conexión


La idea es schedulear el script de monitoreo (via contrab). Dado que el modem no ofrece interfaz telnet,
para reiniciar la conexión se utiliza phantomjs para simular el uso de la interfaz de configuración web.

A su vez, como la interfaz web no posee opción de "Reset" se debe utilizar un backup con la configuración
deseada, el cuál será restaurado (forzando el reset en la conexión).

Intrucciones:

* Generar manualmente un backup desde la interfaz web del modem

* Configurar modem-reset.js
  * page.settings.username: usuario de la configuración del modem
  * page.settings.password: password de la configuración del modem
  * backup_path: path absoluto al archivo de backup

* Configurar check-connectivity.sh:
  * PHANTOM_BIN: comando para ejecutar phantomjs (si el binario está disponible globalmente es 'phantomjs')
  * RESET_SCRIPT: path absoluto a modem-reset.js

* Agregar entrada en crontab para ejecutar check-connectivity.sh

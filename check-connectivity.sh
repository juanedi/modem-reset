####################################################################
#
# Script sencillo para verificar la conexión.
# En caso de que falle se inicia el script para resetear el modem.
#
# Se debe completar la ruta del binario de phantomjs y el script.
#
####################################################################

PHANTOM_BIN=''
RESET_SCRIPT=''
PING_DEST='www.google.com'

echo "Chequeando conectividad a internet"
ping -c3 $PING_DEST > /dev/null 2>&1

if [ "$?" = '0' ]; then
    echo "La conexión funciona bien"
else
    echo "No hay internet... reiniciando el modem"
	$PHANTOM_BIN $RESET_SCRIPT
fi

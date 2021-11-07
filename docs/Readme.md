Validacion de que no esten instalados los complementos

![](img/NPM-NotFound.svg)

![](img/Node-NotFound.svg)

![](img/Git-NotFound.svg)

Instalación de git

![](img/InstallGit.svg)

descarga de node Js dejar un .tar.xz (archivo comprimido)

![](img/InstallWGET.svg)

![](img/RequestNodeTar.svg)

descomprimir archivo: Para descomprimir el archivo es el comando tar -xvf

![](img/TarNode.svg)

movemos lo descomprimido a la carpeta usr con el fin de que todo los usuarios puedan
utilizar Node Js.

Ruta de donde se descomprimió

Ruta de donde se pegara

Comando de copiado

![](img/CopyRecursively.svg)

instalación del servicio

Nos traemos el repositorio del servicio desde

Se debe de modificar el WorkingDirectory (debe ser la ruta donde se descargo el
repositorio)

![](img/CatService.svg)

Para este caso “/home/prbfundacion/services/TyJExtremoDigital/WSCMV”

Mover el archivo de decisión del servicio a la carpeta donde se 
hacen la ejecución de los servicios Systemctl.

Copio el archivo estando posicionado en la ruta:

Crear archivo .env

![](img/EnvFile.svg)

Instalar Dependencias: se debe ejecutar el comando desde la ruta del repositorio

Activar Servicio

Ejecutar npm install en la ruta

![](img/NPM-Install.svg)

Log general de servicios 
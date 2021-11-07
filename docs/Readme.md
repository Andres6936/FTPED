### Precondiciones

Para la instalación del servicio se debe tener instalada los siguientes complementos:

- Node JS (Versión mínima 14.4)
- NPM (Usualmente la instalación de Node JS trae consigo un binario del NPM)
- Git
- WGet

Se recomienda obtener un binario ya compilado desde
la [página oficial](https://nodejs.org/en/download/) de Node JS para el sistema operativo
donde se hará el despliegue del servicio, la guía aqui presente usará Ubuntu x64 para la
instalación.

Evite utilizar la gestión de paquetes por defecto de su sistema operativo ya que las
versiones compiladas para estos paquetes suelen ser anticuadas, instale siempre desde la
página oficial.

### Proceso de Instalación

Validacion de que no esten instalados los complementos

![](img/NPM-NotFound.svg)

![](img/Node-NotFound.svg)

![](img/Git-NotFound.svg)

Instalación de git

![](img/InstallGit.svg)

Descarga de Node JS desde la página oficial, el binario viene comprimido, la extensión
será `.tar.xz` (archivo comprimido).

Para este caso, si usted no puede proveerse de una interfaz de usuario, tendra que
realizar la descarga del binario desde una linea de comandos, para este caso usamos `wget`
, que nos permitirá descargar el archivo con relativa sencillez, si recibe una error al no
poder encontrar el paquete wget, instalelo de la siguiente forma:

![](img/InstallWGET.svg)

Procedemos a descargar el binario desde la página oficial de Node JS.

![](img/RequestNodeTar.svg)

Descomprimir archivo: Para descomprimir el archivo es el comando tar -xvf

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
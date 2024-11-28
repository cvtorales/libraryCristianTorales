/* Funciones que se encuentran en este archivo:

  function getFolderIdWithName(folders, name)
          Función que busca una carpeta por nombre y devuelve su Id.

  function crearCarpetaSiNoExiste(folder, name)
          Función que busca una carpeta por nombre, si no existe, la genera:
          Si existe la carpeta, devuelve la carpeta buscada.
          Si no existe la carpeta, la genera y devuelve la que generó.
          NO DEVUELVE ID, devuelve la carpeta.

  function copyFolder(source, target2) 

*/

/********************************************************************************/
/********************************************************************************/
// Función que busca una carpeta por nombre y devuelve su Id.

function getFolderIdWithName(folders, name){
  var folderId = 1;
  while (folders.hasNext()){
    
    var subFolders = folders.next();
    var foundFolderName = subFolders.getName();
    Logger.log(foundFolderName);
    Logger.log(name);
    if (foundFolderName == name){
      return subFolders.getId();
    };
  };
  return folderId;
}

/********************************************************************************/
/********************************************************************************/
// Esta función crea una carpeta si no existe, si existe no hace nada.

function crearCarpetaSiNoExiste(folder, name){

    var folders = folder.getFolders();
    var fileId = getFolderIdWithName(folders,name);

    if(fileId == 1){ fileId =  folder.createFolder(name).getId(); }
    
    var currentFolder =  DriveApp.getFolderById(fileId);
    return currentFolder;

}
/********************************************************************************/
/********************************************************************************/
function copyFolder(source, target2) {
  
  // Toma las subcarpetas del source.
  var folders = source.getFolders();
  
  // Recorre las subcarpetas del source, mientras haya una siguiente.
  while(folders.hasNext()) {
    // Toma una carpeta y busca su nombre.
    var nextFolder = folders.next();
    var folderName = nextFolder.getName();
    
    // Crea una nueva carpeta con el nombre que se obtuvo.
    // target2 inicialmente es una carpeta vacía, se van creando nuevas subcarpetas para agregar dentro de ésta.
  //  var targetFolder = target2.createFolder(folderName);
    var targetFolder = crearCarpetaSiNoExiste(target2, folderName);
    
    copyFolder(nextFolder, targetFolder); // targetFolder es una subcarpeta de target2, nextFolder es la actual carpeta analizada.
  }
};

/********************************************************************************/
/********************************************************************************/

/********************************************************************************/
/* Funcion para crear un acceso directo dentro de una carpeta.
idFolderWherePaste  ---> Es el id de la carpeta en donde queremos que se pegue el acceso directo (receptor).
idFolderToPaste     ---> Es el id de la carpeta de donde se copia el acceso directo (emisor).
folderNameToPaste   ---> Es el nomnbre de la carpeta de la cual se genera el acceso directo (la que "se copia"). 
*/
function crearAccesoDirectoACarpeta(idFolderWherePaste, idFolderToPaste, folderNameToPaste){
    var folders = DriveApp.getFolderById(idFolderWherePaste).getFolders();
    var fileId = getFolderIdWithName(folders, folderNameToPaste);
    Logger.log(fileId);
    if(fileId == 1){ 
      DriveApp.getFolderById(idFolderWherePaste).createShortcut(idFolderToPaste);
    }
}
/********************************************************************************/
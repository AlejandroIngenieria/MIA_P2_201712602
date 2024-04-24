package functions_test

import (
	"P2/Structs"
	"P2/Utilities"
	"os"
	"strings"
)
//? --------------------------------------------------------------------------
//?               FUNCION PARA ENVIAR LAS PARTICIONES DE UN DISCO             
//? --------------------------------------------------------------------------
func GetPartitions(driveletter string) ([]string, error) {
	var particiones []string
	/* -------------------------------------------------------------------------- */
	/*                              CARGAMOS EL DISCO                             */
	/* -------------------------------------------------------------------------- */
	rutaDisco := "./Disks/" + driveletter + ".dsk"
	file, err := os.Open(rutaDisco)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	/* -------------------------------------------------------------------------- */
	/*                               CARGAMOS EL MBR                              */
	/* -------------------------------------------------------------------------- */

	var TempMBR structs_test.MBR
	// Read object from bin file
	if err := utilities_test.ReadObject(file, &TempMBR, 0); err != nil {
		return nil, err
	}

	/* -------------------------------------------------------------------------- */
	/*                         RECORREMOS LAS PARTICIONES                         */
	/* -------------------------------------------------------------------------- */
	for _, partition := range TempMBR.Mbr_particion {
		partNameClean := strings.Trim(string(partition.Part_name[:]), "\x00")
		
		particiones = append(particiones, partNameClean)
	}

	return particiones, nil
}


//? --------------------------------------------------------------------------
//?                FUNCION PARA RETORNAR EL RESULTADO DEL LOGIN               
//? --------------------------------------------------------------------------
func Session(driveletter string, name string) bool {
	/* -------------------------------------------------------------------------- */
	/*                              CARGAMOS EL DISCO                             */
	/* -------------------------------------------------------------------------- */
	rutaDisco := "./Disks/" + driveletter + ".dsk"
	file, err := os.Open(rutaDisco)
	if err != nil {
		return false
	}
	defer file.Close()

	/* -------------------------------------------------------------------------- */
	/*                               CARGAMOS EL MBR                              */
	/* -------------------------------------------------------------------------- */

	var TempMBR structs_test.MBR
	// Read object from bin file
	if err := utilities_test.ReadObject(file, &TempMBR, 0); err != nil {
		return false
	}

	/* -------------------------------------------------------------------------- */
	/*                         RECORREMOS LAS PARTICIONES                         */
	/* -------------------------------------------------------------------------- */
	index := -1
	for i := 0; i < 4; i++ {
		partNameClean := strings.Trim(string(TempMBR.Mbr_particion[i].Part_name[:]), "\x00")
		if TempMBR.Mbr_particion[i].Part_size != 0 && partNameClean == name {
			ID = string(TempMBR.Mbr_particion[i].Part_id[:])
			index = i
			break
		}
	}
	if index == -1 {
		return false
	}

	/* -------------------------------------------------------------------------- */
	/*                           VERIFICAMOS EL USUARIO                           */
	/* -------------------------------------------------------------------------- */
	
	return false
}


//?--------------------------------------------------------------------------
//?             FUNCION PARA RETORNAR EL CONTENIDO DE UNA CARPETA            
//?--------------------------------------------------------------------------
func FolderContent(ruta string) []string {
	var content []string
	return content
}
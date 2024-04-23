package main

import (
	"P2/Analyzer"
	"P2/Utilities"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
	"os"
	"path/filepath"
	"strings"
)

var arranque = true

func EmptyFolder(carpeta string) {
	archivos, err := filepath.Glob(filepath.Join(carpeta, "*"))
	if err != nil {
		fmt.Println("Error al obtener la lista de archivos:", err)
		return
	}

	for _, archivo := range archivos {
		err := os.Remove(archivo)
		if err != nil {
			fmt.Printf("Error al eliminar el archivo %s: %s\n", archivo, err)
		}
	}

	archivos, err = filepath.Glob(filepath.Join(carpeta, "*"))
	if err != nil {
		fmt.Println("Error al obtener la lista de archivos:", err)
		return
	}

	if len(archivos) != 0 {
		fmt.Println("La carpeta no pudo ser vaciada completamente.")
	}
}

func FolderInfo(carpeta string) ([]string, error) {
	var nombres []string
	archivos, err := os.ReadDir(carpeta) // Cambiado de ioutil.ReadDir a os.ReadDir
	if err != nil {
		return nil, err
	}
	for _, archivo := range archivos {
		if !archivo.IsDir() {
			info, err := archivo.Info() // Accede a la información del archivo
			if err != nil {
				return nil, err
			}
			nombres = append(nombres, info.Name())
		}
	}
	return nombres, nil
}

func main() {

	app := fiber.New()
	// Solucion a CORS
	app.Use(cors.New())

	/* -------------------------------------------------------------------------- */
	/*                               MENSAJE INICIAL                              */
	/* -------------------------------------------------------------------------- */
	app.Get("/", func(c *fiber.Ctx) error {
		if arranque {
			//Vaciamos las carpetas
			EmptyFolder("./Disks")
			EmptyFolder("./Reports")
			arranque = false
		}
		return c.SendString("Ingresa un comando")
	})

	/* -------------------------------------------------------------------------- */
	/*                            COMANDOS INDIVIDUALES                           */
	/* -------------------------------------------------------------------------- */
	app.Post("/command", func(c *fiber.Ctx) error {
		// Obtener el texto enviado en el cuerpo de la solicitud
		text := c.FormValue("texto")
		//fmt.Println(text)
		analyzer_test.Command(text)
		// Enviar respuesta de éxito al cliente
		return c.SendString(utilities_test.Resultados.String())
	})

	/* -------------------------------------------------------------------------- */
	/*                             MANEJO DE ARCHIVOS                             */
	/* -------------------------------------------------------------------------- */
	app.Post("/upload", func(c *fiber.Ctx) error {
		// Recibe el contenido como texto
		body := c.FormValue("fileContent")

		// Divide el texto en líneas
		lines := strings.Split(body, "\n")

		// Procesa cada línea con la función analizar
		for _, line := range lines {
			analyzer_test.Command(line)
		}

		return c.SendString(utilities_test.Resultados.String())
	})

	/* -------------------------------------------------------------------------- */
	/*                         ENVIO DE DISCOS EXISTENTES                         */
	/* -------------------------------------------------------------------------- */
	app.Get("/disks", func(c *fiber.Ctx) error {
		carpeta := "./Disks" // Asegúrate de cambiar esto por la ruta correcta
		archivos, err := FolderInfo(carpeta)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
		}
		return c.JSON(archivos) // Envía la lista de archivos como JSON
	})

	/* -------------------------------------------------------------------------- */
	/*                              ENVIO DE REPORTES                             */
	/* -------------------------------------------------------------------------- */
	app.Get("/reports", func(c *fiber.Ctx) error {
		carpeta := "./Reports" // Asegúrate de cambiar esto por la ruta correcta
		archivos, err := FolderInfo(carpeta)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
		}

		// Filtrar archivos, quitando los que terminan en '.dot'
		filtrados := []string{}
		for _, archivo := range archivos {
			if !strings.HasSuffix(archivo, ".dot") {
				filtrados = append(filtrados, archivo)
			}
		}

		return c.JSON(filtrados) // Envía la lista filtrada de archivos como JSON
	})
	
	log.Fatal(app.Listen(":4000"))
}

package main

import (
	"P2/Analyzer"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
	"P2/Utilities"
	"strings"
	"path/filepath"
	"fmt"
	"os"
)

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


func main() {

	app := fiber.New()
	// Solucion a CORS
	app.Use(cors.New())

	// Retorna que el servidor esta funcionando
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Ingresa un comando")
	})

	// Ruta para manejar la solicitud POST y guardar el texto
	app.Post("/command", func(c *fiber.Ctx) error {
		// Obtener el texto enviado en el cuerpo de la solicitud
		text := c.FormValue("texto")
		//fmt.Println(text)
		analyzer_test.Command(text)
		// Enviar respuesta de éxito al cliente
		return c.SendString(utilities_test.Resultados.String())
	})

	// Ruta para recibir el contenido del archivo
	app.Post("/upload", func(c *fiber.Ctx) error {
		//Vaciamos las carpetas
		EmptyFolder("./Disks")
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

	// // Ingresa un objeto al array
	// app.Post("/code", func(c *fiber.Ctx) error {
	// 	todo := &Todo{}
	// 	if err := c.BodyParser(todo); err != nil {
	// 		return err
	// 	}

	// 	todo.ID = len(todos) +1
	// 	todos = append(todos, *todo)

	// 	return c.JSON(todos)

	// })

	// // Modificamos un atributo de los objetos
	// app.Patch("/code/:id", func(c *fiber.Ctx) error {
	// 	id, err := c.ParamsInt("id")

	// 	if err != nil{
	// 		return c.Status(401).SendString("Invalid id")
	// 	}

	// 	for i,t := range todos {
	// 		if t.ID == id{
	// 			todos[i].Done = true
	// 			break
	// 		}
	// 	}

	// 	return c.JSON(todos)

	// })

	// // Obtenemos todos los elementos dentro del arreglo
	// app.Get("/code/todos", func(c *fiber.Ctx) error {
	// 	return c.JSON(todos)
	// })

	log.Fatal(app.Listen(":4000"))
}

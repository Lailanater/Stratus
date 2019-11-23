package main

import (
	"fmt"
	"log"
	"net/http"
)

func createMenuHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		panic(err)
	}

	fmt.Println("There was a request!")
	form := r.Form
	fmt.Println("form", form.Encode())
	menuName := form.Get("menuName")
	defaultRouteTo := form.Get("defaultRouteTo")
	dtmfOptions := form.Get("dtmfOptions[]")
	projectPath := form.Get("projectPath")
	test := form.Get("test")

	fmt.Println("menuName:", menuName)
	fmt.Println("defaultRouteTo:", defaultRouteTo)
	fmt.Println("dtmfOptions:",dtmfOptions)
	fmt.Println("projectPath:", projectPath)
	fmt.Println("test:", test)
}

func main() {
	http.HandleFunc("/api/createMenu", createMenuHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
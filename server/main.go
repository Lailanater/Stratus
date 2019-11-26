package main

import (
	"fmt"
	"log"
	"net/http"
	"reflect"
	"strconv"
)

func createMenuHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		panic(err)
	}

	var dtmfOptions []string
	fmt.Println("There was a request!")
	for key, values := range r.PostForm {
		if key == "dtmfOptions" {
			dtmfOptions = values
		}
	}

	menuName := r.PostFormValue("menuName")
	defaultRouteTo := r.PostFormValue("defaultRouteTo")
	projectPath := r.PostFormValue("projectPath")

	fmt.Println("Menu Name:\t\t\t", menuName)
	fmt.Println("Default Route To:\t", defaultRouteTo)
	fmt.Println("Project Path:\t\t", projectPath)
	for i, v := range dtmfOptions {
		fmt.Printf("Option " + strconv.Itoa(i + 1) + " Goes To:\t", v)
	}

	fmt.Println("menuName type:", reflect.TypeOf(menuName).String())
	fmt.Println("defaultRouteTo type:", reflect.TypeOf(defaultRouteTo).String())
	fmt.Println("projectPath type:", reflect.TypeOf(projectPath).String())
	fmt.Println("dtmfOptions type:", reflect.TypeOf(dtmfOptions).String())

	status := CreateMenu(menuName, defaultRouteTo, projectPath, dtmfOptions)

	if status {
		fmt.Println("Request successfully completed!")
	} else {
		fmt.Println("Request FAILED!")
	}
}

func main() {
	fmt.Println("Listening...")
	http.HandleFunc("/api/createMenu", createMenuHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
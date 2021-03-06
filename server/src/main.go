package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
)

func createMenuHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

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
	shouldOverwriteString := r.PostFormValue("shouldOverwrite")
	needsRepeatString := r.PostFormValue("needsRepeat")
	needsRepeat, _ := strconv.ParseBool(needsRepeatString)
	shouldOverwrite, _ := strconv.ParseBool(shouldOverwriteString)

	fmt.Println("Menu Name:\t\t\t", menuName)
	fmt.Println("Default Route To:\t", defaultRouteTo)
	fmt.Println("Project Path:\t\t", projectPath)
	fmt.Println("Needs Repeat:\t\t", needsRepeat)
	fmt.Println("Should Overwrite:\t", shouldOverwrite)
	for i, v := range dtmfOptions {
		fmt.Println("Option "+strconv.Itoa(i+1)+" Goes To:\t", v)
	}

	fileCreated, fileExists := CreateMenu(menuName, defaultRouteTo, projectPath, dtmfOptions, needsRepeat, shouldOverwrite)

	if fileCreated {
		fmt.Println("Menu was created!")
	} else {
		fmt.Println("Menu was NOT created.")
	}

	SendJsonReply(w, fileCreated, fileExists, shouldOverwrite)
}

func createGrammarHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

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
	mode := r.PostFormValue("mode")
	projectPath := r.PostFormValue("projectPath")
	needsRepeat, _ := strconv.ParseBool(r.PostFormValue("needsRepeat"))
	shouldOverwriteString := r.PostFormValue("shouldOverwrite")
	shouldOverwrite, _ := strconv.ParseBool(shouldOverwriteString)
	fmt.Println("Should Overwrite:\t", shouldOverwrite)

	fmt.Println("Menu Name:\t\t\t", menuName)
	fmt.Println("Mode:\t\t\t\t", mode)
	fmt.Println("Project Path:\t\t", projectPath)
	fmt.Println("Needs Repeat:\t\t", needsRepeat)
	for i, v := range dtmfOptions {
		fmt.Println("Option "+strconv.Itoa(i+1)+" Goes To:\t", v)
	}

	fileCreated, fileExists := CreateGrammar(menuName, mode, projectPath, needsRepeat, dtmfOptions, shouldOverwrite)

	if fileCreated {
		fmt.Println("Request successfully completed!")
	} else {
		fmt.Println("Request FAILED!")
	}

	SendJsonReply(w, fileCreated, fileExists, shouldOverwrite)
}

func main() {
	fmt.Println("Listening...")
	http.HandleFunc("/api/createMenu", createMenuHandler)
	http.HandleFunc("/api/createGrammar", createGrammarHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
}

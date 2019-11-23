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
	test := r.Form.Get("menuName")
	fmt.Println(test)
}

func main() {
	http.HandleFunc("/api/createMenu", createMenuHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
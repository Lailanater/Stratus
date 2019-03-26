package main

import (
	"fmt"
	"strings"
)

var choice string
const LANG_OPTIONS string = "language options"
const FILE_PATH_OPTIONS string = "file path options"

func main() {
	loadProperties()
	initMain()
}

func initMain() {
	printMainMenu()
	getChoice()
	handleMainMenu()
}

func getChoice()  {
	fmt.Print("Enter your choice: ")
	fmt.Scanln(&choice)
}

func returnToMain(currentMenu string) {
	fmt.Println("Are you sure that you want to return to the main menu?")
	getChoice()
	lowercaseOption := strings.ToLower(choice)
	if lowercaseOption == "y" || lowercaseOption == "yes" {
		initMain()
	} else {
		switch (currentMenu) {
		case LANG_OPTIONS:
			initLanguageOptions()
		case FILE_PATH_OPTIONS:
			initMainMenu()
		default:
			initMain()
		}
	}
}
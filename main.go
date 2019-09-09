package main

import (
	"fmt"
	"os"
	"strings"
)

var choice string

const LANG_OPTIONS string = "language options"
const FILE_PATH_OPTIONS string = "file path options"
const MAIN_MENU string = "main menu"
const GENERATE_MENU string = "generate menu"

func main() {
	loadProperties()
	initMain()
}

func initMain() {
	printMainMenu()
	getChoice()
	handleMainMenu()
}

func getChoice() {
	fmt.Print("Enter your choice: ")
	fmt.Scanln(&choice)
}

func returnToMain(currentMenu string) {
	fmt.Println("Are you sure that you want to return to the previous menu?")
	getChoice()
	lowercaseOption := strings.ToLower(choice)
	if lowercaseOption == "y" || lowercaseOption == "yes" {
		initMain()
	} else {
		switch (currentMenu) {
		case LANG_OPTIONS:
			initLanguageOptions()
		case FILE_PATH_OPTIONS:
			initFilePathOptions()
		default:
			initMain()
		}
	}
}

func exitGenerator() {
	writeProperties()
	os.Exit(0)
}

func badInputMessage(menu string) {
	fmt.Println("")
	fmt.Println("You have entered an invalid option. Please try again.")
	fmt.Println("")
	switch menu {
	case FILE_PATH_OPTIONS:
		initFilePathOptions()
	case LANG_OPTIONS:
		initLanguageOptions()
	default:
		initMain()
	}
}

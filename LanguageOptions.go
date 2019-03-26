package main

import (
	"fmt"
	"os"
	"strings"
)

func initLanguageOptions() {
	printLanguageOptions()
	getChoice()
	handleLanguageOptions()
}

func printLanguageOptions() {
	fmt.Println("------------------------------------FILE PATH OPTIONS-------------------------------------\n",
		"|                           What would you like to do?                               |\n",
		"|                                Enter 0 to exit.                                    |\n",
		"|                                                                                    |\n",
		"| 1) View a list of supported languages.                                             |\n",
		"| 2) Change your language.                                                           |\n,",
		"| 2) Display the current language.                                                   |\n,",
		"--------------------------------------------------------------------------------------")
}

func handleLanguageOptions() {
	switch(strings.ToLower(choice)) {
	case "0":
		os.Exit(0)
	case "p":
		returnToMain(LANG_OPTIONS)
	case "1":
		fmt.Println("A")
	case "2":
		fmt.Println("B")
	case "3":
		fmt.Println("The current language is set to ", settings["language"])
	default:
		initLanguageOptions()
	}
}
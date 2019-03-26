package main

import (
	"fmt"
	"os"
)

func initFilePathOptions() {
	printFilePathOptions()
	getChoice()
	handleFilePathOptions()
}

func printFilePathOptions() {
	fmt.Println("------------------------------------FILE PATH OPTIONS-------------------------------------\n",
		"|                           What would you like to do?                               |\n",
		"|                                Enter 0 to exit.                                    |\n",
		"|                                                                                    |\n",
		"| 1) Change the file path location.                                                  |\n",
		"| 2) Display the current file path location.                                         |\n," +
		"--------------------------------------------------------------------------------------")
}

func handleFilePathOptions() {
	switch(choice) {
	case "0":
		os.Exit(0)
	case "p":
		returnToMain(FILE_PATH_OPTIONS)
	case "1":
		fmt.Println("A")
	case "2":
		fmt.Println("B")
	default:
		initFilePathOptions()
	}
}
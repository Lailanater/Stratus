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
	fmt.Println()
	fmt.Println("------------------------------------FILE PATH OPTIONS-------------------------------------\n",
		"|                               What would you like to do?                               |\n",
		"|                                    Enter 0 to exit.                                    |\n",
		"|                                                                                        |\n",
		"| 1) Change the file path location.                                                      |\n",
		"| 2) Display the current file path location.                                             |\n",
		"------------------------------------------------------------------------------------------")
}

func handleFilePathOptions() {
	switch (choice) {
	case "0":
		exitGenerator()
	case "p":
		returnToMain(FILE_PATH_OPTIONS)
	case "1":
		changeFilePath()
	case "2":
		displayFilePath()
	default:
		badInputMessage(FILE_PATH_OPTIONS)
	}
}

func changeFilePath() {
	fmt.Println("Where do you want the files to be stored?")
	fmt.Println("Press p to return to the file path options menu")
	var temp string
	fmt.Scanln(&temp)
	if temp == "p" {
		initFilePathOptions()
	} else if _, err := os.Stat(temp); err == nil {
		settings[DIR] = temp
		fmt.Println("Path changed successfully!")
		initFilePathOptions()
	} else if os.IsNotExist(err) {
		fmt.Println("That is not a valid path. Try again.")
		fmt.Println("Make sure the path you have chosen has already been created.")
		fmt.Println("")
		changeFilePath()
	}
}

func displayFilePath() {
	fmt.Println(settings[DIR])
	fmt.Println("")
	initFilePathOptions()
}
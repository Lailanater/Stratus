package main

import (
	"fmt"
	"os"
	"strings"
)

var isCalltype []bool

func initMainMenu() {
	printMainMenu()
	getChoice()
	handleMainMenu()
}

func printMainMenu() {
	fmt.Println("----------------------------------------MAIN MENU-----------------------------------------\n",
		"|                               What would you like to do?                               |\n",
		"|                                    Enter 0 to exit.                                    |\n",
		"|                                                                                        |\n",
		"| 1) Create a new DTMF Menu and its corresponding grammar file.                          |\n",
		"| 2) View/Change the file path where the files are saved.                                |\n,",
		"| 3) View/Change supported language(s).                                                  |\n,",
		"------------------------------------------------------------------------------------------")
}

func handleMainMenu() {
	switch(choice) {
	case "0":
		writeProperties()
		os.Exit(0)
	case "1":
		createDTMFMenu()
	case "2":
		initMainMenu()
	case "3":
		initLanguageOptions()
	default:
		initMain()
	}
}

func createDTMFMenu() {
	fmt.Println("What would you like to name the new Menu? (DO NOT ADD .VXML TO THE END)")
	fmt.Println("Enter p to return to the main menu.")
	menuName := getMenuName() + ".vxml"
	fmt.Println(menuName)	// TODO: Remove
	repeatOption := getRepeatOption()
	fmt.Println(repeatOption)
	numOfOptions := getNumOfOptions()
	for i := 0; i < numOfOptions; i++ {
		fmt.Print("Is DTMF option ", i+1, " a calltype? (y/n): ")
		var temp string;
		fmt.Scanln(&temp)
		temp = strings.ToLower(temp)
		if temp == "y" || temp == "yes" {
			isCalltype = append(isCalltype, true)
		} else if temp == "n" || temp == "no" {
			isCalltype = append(isCalltype, false)
		} else {
			fmt.Println("You have entered an invalid repeat option. Please try again and type only y or n")
			initMain()
		}
	}
	buildMenu(menuName, repeatOption, numOfOptions)
}

func getMenuName() string {
	fmt.Print("Type your menu name: ")
	var temp string
	fmt.Scanln(&temp)
	return temp
}
package main

import (
	"strings"
	"fmt"
	"os"
)

func initGenerateMenu() {
	printGenerateMenu()
	getChoice()
	handleGenerateMenu()
}

func printGenerateMenu() {
	fmt.Println()
	fmt.Println("--------------------------------------GENERATE MENU---------------------------------------\n",
		"|                               What would you like to do?                               |\n",
		"|                                    Enter 0 to exit.                                    |\n",
		"|                                                                                        |\n",
		"| 1) Create a new DTMF Menu and its corresponding grammar file.                          |\n",
		"| 2) Create a new grammar file                                                           |\n",
		"------------------------------------------------------------------------------------------")
}

func createDTMFMenu() {
	fmt.Println("")
	fmt.Println("What would you like to name the new Menu? (DO NOT ADD .VXML TO THE END)")
	fmt.Println("Enter p to return to the main menu.")
	fmt.Println("")
	menuName := getMenuName()
	menuNameWithExtension = menuName + ".vxml"
	menuPath := settings[DIR] + "/WebContent/" + menuNameWithExtension
	if menuName == "p" {
		returnToMain("")
	} else if _, err := os.Stat(menuPath); err == nil {
		fmt.Print(menuNameWithExtension, " already exists. Would you like to overwrite it? (y/n): ")
		var temp string
		fmt.Scanln(&temp)
		if temp == "y" || temp == "yes" {
			os.Remove(menuPath)
		} else if temp == "n" || temp == "no" {
			initMain()
		} else {
			badInputMessage(MAIN_MENU)
		}
	}
	numOfOptions := getNumOfOptions()
	if numOfOptions > 9 {
		badInputMessage(MAIN_MENU)
	}
	repeatOption := false
	if numOfOptions > 0 {
		repeatOption = getRepeatOption()
	}
	for i := 0; i < numOfOptions; i++ {
		fmt.Print("Is DTMF option ", i+1, " a calltype? (y/n): ")
		var temp string;
		fmt.Scanln(&temp)
		temp = strings.ToLower(temp)
		if (temp == "y" || temp == "yes") {
			isCalltype = append(isCalltype, true)
		} else if (temp == "n" || temp == "no") {
			isCalltype = append(isCalltype, false)
		} else {
			badInputMessage(MAIN_MENU)
		}
	}
	defaultRoute := getDefaultRouteType()
	buildMenu(menuName, repeatOption, numOfOptions, defaultRoute)
}

func getDefaultRouteType() string {
	fmt.Println("When you default route, do you want to go to: ")
	fmt.Println("1 | Calltype")
	fmt.Println("2 | Menu")
	fmt.Print("Enter your choice: ")
	var temp string;
	fmt.Scanln(&temp)
	if (temp == "1" || strings.ToLower(temp) == "calltype") {
		return "calltype"
	} else if (temp == "2" || strings.ToLower(temp) == "menu") {
		return "menu"
	} else {
		badInputMessage("Please enter 1 or 2.")
		return ""
	}
}

func getMenuName() string {
	fmt.Print("Type your menu name: ")
	var temp string;
	fmt.Scanln(&temp)
	return temp
}

func getRepeatOption() bool {
	fmt.Print("Are you going to need a repeat option? (y/n): ")
	var temp string;
	fmt.Scanln(&temp)
	temp = strings.ToLower(temp)
	if (temp == "y" || temp == "yes") {
		return true;
	} else if (temp == "n" || temp == "no") {
		return false;
	} else {
		badInputMessage(MAIN_MENU)
		return false;
	}
}

func getNumOfOptions() int {
	fmt.Print("How many DTMF options are you going to need? (ONY TYPE THE HIGHEST NUMBER YOU NEED): ")
	var temp int;
	fmt.Scanln(&temp)
	return temp
}

func createGrammarFile() {
	fmt.Println("")
	fmt.Println("What would you like to name the new grammar file? (DO NOT ADD _**MENUTYPE** TO THE END)")
	fmt.Println("Enter p to return to the main menu.")
	fmt.Println("")
	grammarName := getGrammarName()
	grammarType := getGrammarType()
	numOfOptions := getNumOfOptions()
	//repeatOption := getRepeatOption()
	if grammarType != "both" {
		buildGrammar(grammarName, grammarType, false, numOfOptions)
	} else {
		buildGrammar(grammarName, DTMF, false, numOfOptions)
		buildGrammar(grammarName, VOICE, false, numOfOptions)
	}
}

func getGrammarName() string {
	fmt.Print("Type your grammar filename: ")
	var temp string;
	fmt.Scanln(&temp)
	if temp == "p" {
		returnToMain(GENERATE_MENU)
	}
	return temp
}

func getGrammarType() string {
	fmt.Println("Which grammar type are you going to need?")
	fmt.Println("1 | DTMF")
	fmt.Println("2 | VOICE")
	fmt.Println("3 | Both")
	getChoice()
	switch choice {
	case "1":
		return DTMF
	case "2":
		return VOICE
	case "3":
		return "both"
	default:
		badInputMessage("Please enter 1, 2, or 3 next time.")
		return ""
	}
}

func handleGenerateMenu() {
	switch choice {
	case "1":
		createDTMFMenu()
	case "2":
		createGrammarFile()
	}
}

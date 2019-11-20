package server

import (
	"fmt"
)

var isCalltype []bool

func printMainMenu() {
	fmt.Println()
	fmt.Println("----------------------------------------MAIN MENU-----------------------------------------\n",
		"|                               What would you like to do?                               |\n",
		"|                                    Enter 0 to exit.                                    |\n",
		"|                                                                                        |\n",
		"| 1) Generate menus and/or grammars                                                      |\n",
		"| 2) View/Change the file path where the files are saved.                                |\n",
		"| 3) View/Change supported language(s).                                                  |\n",
		"------------------------------------------------------------------------------------------")
}

func handleMainMenu() {
	switch (choice) {
	case "0":
		exitGenerator()
	case "1":
		initGenerateMenu()
	case "2":
		initFilePathOptions()
	case "3":
		initLanguageOptions()
	default:
		badInputMessage(MAIN_MENU)
	}
}

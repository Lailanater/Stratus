package oldCode

import (
	"fmt"
	"strings"
)

var supportedLangs map[string]struct{} = make(map[string]struct{}, 2)

func initLanguageOptions() {
	initSupportedLangs()
	printLanguageOptions()
	getChoice()
	handleLanguageOptions()
}

func printLanguageOptions() {
	fmt.Println()
	fmt.Println("-------------------------------------LANGUAGE OPTIONS-------------------------------------\n",
		"|                               What would you like to do?                               |\n",
		"|                                    Enter 0 to exit.                                    |\n",
		"|                                                                                        |\n",
		"| 1) View a list of supported languages.                                                 |\n",
		"| 2) Change your language.                                                               |\n",
		"| 3) Display the current language.                                                       |\n",
		"------------------------------------------------------------------------------------------")
}

func handleLanguageOptions() {
	switch (strings.ToLower(choice)) {
	case "0":
		exitGenerator()
	case "p":
		returnToMain(LANG_OPTIONS)
	case "1":
		fmt.Println("This program supports the following languages:")
		for lan, _ := range supportedLangs {
			fmt.Println(lan)
		}
		fmt.Println("")
		initLanguageOptions()
	case "2":
		fmt.Print("What would you like to change your language to? ")
		var temp string
		fmt.Scanln(&temp)
		_, ok := supportedLangs[temp]
		if ok {
			settings[LANG] = temp
			fmt.Println("Your language has been updated to", settings[LANG])
		} else {
			fmt.Println("Language was not update to", temp + ".", "It is either an unsupported language or possibly a typo.")
		}
		fmt.Println("")
		initLanguageOptions()
	case "3":
		fmt.Println("The current language is set to", settings[LANG])
		initLanguageOptions()
	default:
		badInputMessage(LANG_OPTIONS)
	}
}

func initSupportedLangs() {
	if len(supportedLangs) == 0 {
		supportedLangs["english"] = struct{}{}
		supportedLangs["spanish"] = struct{}{}
	}
}

package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"strings"
)

var settings map[string]string
var propPath string

const GRAMMAR_DIR = "grammar_dir"
const LANG = "language"
const DIR = "directory"
const PROP_NAME = "VXMLGenerator.properties"

func loadProperties() {
	hd, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}
	propPath = path.Dir(hd + "/VXMLGenerator_XP/")
	os.Mkdir(propPath, 0777)
	os.Chdir(propPath)
	if _, err := os.Stat(PROP_NAME); err == nil {
		fmt.Println("Settings were loaded.")
		readProperties()
	} else if os.IsNotExist(err) {
		fmt.Println("Settings were created.")
		createProperties()
		fmt.Println("Since you didn't have a settings file; I went ahead and set the working directory to the ScrumF_TestApplication")
	}
}

func readProperties() {
	settings = make(map[string]string)
	prop, err := ioutil.ReadFile(PROP_NAME)
	if err != nil {
		panic(err)
	}
	str := string(prop)
	strSlice := strings.Split(str, "\n")
	for _, a := range strSlice {
		s := strings.Split(a, "=")
		if len(s) > 1 {
			settings[s[0]] = s[1]
		}
	}
}

func createProperties() {
	hd, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}
	settings = make(map[string]string)
	settings[LANG] = "english"
	settings[GRAMMAR_DIR] = "/grammar/english/"
	settings[DIR] = hd + "/Documents/GitHub/ScrumF_TestApplication"
}

func writeProperties() {
	var prop string
	for key, value := range settings {
		prop += (key + "=" + value + "\n")
	}
	ioutil.WriteFile(PROP_NAME, []byte(prop), 0777)
}
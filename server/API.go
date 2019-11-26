package main

import (
	"log"
	"os"
	"strings"
	"text/template"
)

type GrammarData struct {
	MenuName string
	Mode string
	ProjectPath string
	NeedsRepeat bool
	DtmfOptions []string
}

type MenuData struct {
	MenuName string
	DtmfOptions []string
	DefaultRouteTo string
}

func CreateGrammar(menuName, mode, projectPath string, needsRepeat bool, dtmfOptions []string) {
	funcMap := template.FuncMap{
		"inc": func(i int) int {
			return i+1
		},
	}

	wd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	tmpl := template.Must(template.New("grammarTemplate.gogrxml").Funcs(funcMap).ParseFiles( wd + "\\server\\templates\\grammarTemplate.gogrxml"))
	data := GrammarData {
		MenuName:	menuName,
		Mode:        mode,
		ProjectPath:projectPath,
		NeedsRepeat: needsRepeat,
		DtmfOptions: dtmfOptions,
	}

	f, err := os.Create(projectPath + "/WebContent/grammar/english/" + menuName + "_" + strings.ToUpper(mode) + ".grxml")
	_ = tmpl.Execute(f, data)
}

func CreateMenu(menuName, defaultRouteTo, projectPath string, dtmfOptions []string) bool {
	funcMap := template.FuncMap{
		"inc": func(i int) int {
			return i+1
		},
	}

	wd, err := os.Getwd()
	if err != nil {
		log.Println(err)
		return false
	}

	tmpl := template.Must(template.New("menuTemplate.govxml").Funcs(funcMap).ParseFiles( wd + "/server/templates/menuTemplate.govxml"))
	data := MenuData {
		MenuName: menuName,
		DtmfOptions: dtmfOptions,
		DefaultRouteTo: defaultRouteTo,
	}

	permissions := os.FileMode(777)
	err = os.MkdirAll(projectPath+"/WebContent/", permissions)
	if err != nil {
		log.Println("os.MkdirAll")
		log.Println(err)
		return false
	}
	f, err := os.Create(projectPath + "/WebContent/" + menuName + ".vxml")
	if err != nil {
		log.Println("os.Create")
		log.Println(err)
		return false
	}
	err = tmpl.Execute(f, data)
	if err != nil {
		log.Println(err)
		return false
	}
	return true
}
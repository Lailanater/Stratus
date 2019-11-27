package main

import (
	"log"
	"os"
	"text/template"
)

type GrammarData struct {
	MenuName    string
	Mode        string
	ProjectPath string
	NeedsRepeat bool
	DtmfOptions []string
}

type MenuData struct {
	MenuName       string
	DtmfOptions    []string
	DefaultRouteTo string
}

func CreateGrammar(menuName, mode, projectPath string, needsRepeat bool, dtmfOptions []string) bool {
	funcMap := template.FuncMap{
		"inc": func(i int) int {
			return i + 1
		},
	}

	wd, err := os.Getwd()
	if err != nil {
		log.Println("os.Getwd")
		log.Println(err)
		return false
	}

	var tmpl *template.Template
	if mode == "dtmf" {
		tmpl = template.Must(template.New("dtmfGrammarTemplate.gogrxml").Funcs(funcMap).ParseFiles(wd + "\\server\\templates\\dtmfGrammarTemplate.gogrxml"))
		mode = "DTMF"
	} else if mode == "voice" {
		tmpl = template.Must(template.New("dtmfGrammarTemplate.gogrxml").Funcs(funcMap).ParseFiles(wd + "\\server\\templates\\dtmfGrammarTemplate.gogrxml"))
		mode = "Voice"
	}


	data := GrammarData{
		MenuName:    menuName,
		Mode:        mode,
		ProjectPath: projectPath,
		NeedsRepeat: needsRepeat,
		DtmfOptions: dtmfOptions,
	}

	permissions := os.FileMode(777)
	err = os.MkdirAll(projectPath+"/WebContent/grammar/english/", permissions)
	if err != nil {
		log.Println("os.MkdirAll")
		log.Println(err)
		return false
	}

	f, err := os.Create(projectPath + "/WebContent/grammar/english/" + menuName + "_" + mode + ".grxml")
	if err != nil {
		log.Println("os.Create")
		log.Println(err)
		return false
	}

	err = tmpl.Execute(f, data)
	defer f.Close()
	if err != nil {
		log.Println("tmpl.Execute")
		log.Println(err)
		return false
	}
	return true
}

func CreateMenu(menuName, defaultRouteTo, projectPath string, dtmfOptions []string) bool {
	funcMap := template.FuncMap{
		"inc": func(i int) int {
			return i + 1
		},
	}

	wd, err := os.Getwd()
	if err != nil {
		log.Println("os.Getwd")
		log.Println(err)
		return false
	}

	tmpl := template.Must(template.New("menuTemplate.govxml").Funcs(funcMap).ParseFiles(wd + "/server/templates/menuTemplate.govxml"))
	data := MenuData{
		MenuName:       menuName,
		DtmfOptions:    dtmfOptions,
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
	defer f.Close()
	if err != nil {
		log.Println("tmpl.Execute")
		log.Println(err)
		return false
	}

	return true
}

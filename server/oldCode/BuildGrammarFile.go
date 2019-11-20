package oldCode

/*
 *	This file uses code from https://siongui.github.io/2018/01/10/go-convert-number-to-word-from-1-to-1000/ in order to translate numbers to words.
 */

import (
	"os"
	"strconv"
	"strings"
)

var xmlLang map[string]string = make(map[string]string, 2)
var grammarSb strings.Builder
var grammarFileName string
var NumberToWord = map[int]string{
	1:  "one",
	2:  "two",
	3:  "three",
	4:  "four",
	5:  "five",
	6:  "six",
	7:  "seven",
	8:  "eight",
	9:  "nine",
	10: "ten",
	11: "eleven",
	12: "twelve",
	13: "thirteen",
	14: "fourteen",
	15: "fifteen",
	16: "sixteen",
	17: "seventeen",
	18: "eighteen",
	19: "nineteen",
	20: "twenty",
	30: "thirty",
	40: "forty",
	50: "fifty",
	60: "sixty",
	70: "seventy",
	80: "eighty",
	90: "ninety",
}

const DTMF  = "dtmf"
const VOICE = "voice"

func initXmlLang() {
	if len(xmlLang) == 0 {
		xmlLang["english"] = "en-US"
		xmlLang["spanish"] = "es-US"
	}
}

func buildGrammar({{ .MenuName }} string, mode string, repeat bool, numOfOptions int) {
	grammarSb.Reset()
	if mode == DTMF {
		grammarFileName = {{ .MenuName }} + "_" + strings.ToUpper(mode) + ".grxml"
	} else if mode == VOICE {
		grammarFileName = {{ .MenuName }} + "_Voice" + ".grxml"
	}
	pathToGrammarFile := settings[DIR] + "/WebContent/" + settings[GRAMMAR_DIR] + grammarFileName
	if _, err := os.Stat(pathToGrammarFile); err == nil {
		_ = os.Remove(pathToGrammarFile)
	}
	initXmlLang()
	generateGrammarHeader(mode)
	generateRules(mode, repeat, numOfOptions)
	writeGrammar(mode)
}

func generateGrammarHeader(mode string) {
	grammarSb.WriteString("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
	grammarSb.WriteString("<grammar version=\"1.0\"\n")
	grammarSb.WriteString("         xml:lang=\"" + xmlLang[settings[LANG]] + "\"\n")
	grammarSb.WriteString("         mode=\"" + mode + "\"\n")
	grammarSb.WriteString("         xmlns=\"http://www.w3.org/2001/06/grammar\"\n")
	grammarSb.WriteString("         xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n")
	grammarSb.WriteString("         xsi:schemaLocation=\"http://www.w3.org/2001/06/grammar http://www.w3.org/TR/speech-grammar/grammar.xsd\"\n")
	grammarSb.WriteString("         root=\"root\">\n")
	grammarSb.WriteString("\n")
	grammarSb.WriteString("<!-- This file has been auto-generated. @author Chris Lail -->\n")
	grammarSb.WriteString("\n")
}

func generateRules(mode string, repeat bool, numOfOptions int) {
	grammarSb.WriteString("\t<rule id=\"root\" scope=\"public\">\n")
	grammarSb.WriteString("\t\t<one-of>\n")
	if mode == DTMF {
		if repeat {
			grammarSb.WriteString("\t\t\t<item>#</item>\n")
		}
		for i := 1; i <= numOfOptions; i++ {
			grammarSb.WriteString("\t\t\t<item>" + strconv.Itoa(i) + "</item>\n")
		}
	} else if mode == VOICE {
		for i := 1; i <= numOfOptions; i++ {
			grammarSb.WriteString("\t\t\t<item>" + Convert1to1000(i) + "</item>\n")
		}
	}
	grammarSb.WriteString("\t\t</one-of>\n")
	grammarSb.WriteString("\t</rule>\n")
	grammarSb.WriteString("</grammar>\n")
}

func writeGrammar(mode string) {
	dir := settings[DIR]
	path := dir + "/WebContent" + settings[GRAMMAR_DIR] + "/"
	absolutePath := path + grammarFileName
	file, err := os.Create(absolutePath)
	if err != nil {
		panic(err)
	}
	_, _ = file.WriteString(grammarSb.String())
}

func convert1to99(n int) (w string) {
	if n < 20 {
		w = NumberToWord[n]
		return
	}

	r := n % 10
	if r == 0 {
		w = NumberToWord[n]
	} else {
		w = NumberToWord[n-r] + " " + NumberToWord[r]
	}
	return
}

func convert100to999(n int) (w string) {
	q := n / 100
	r := n % 100
	w = NumberToWord[q] + " " + "hundred"
	if r == 0 {
		return
	} else {
		w = w + " and " + convert1to99(r)
	}
	return
}

func Convert1to1000(n int) (w string) {
	if n > 1000 || n < 1 {
		panic("func Convert1to1000: n > 1000 or n < 1")
	}

	if n < 100 {
		w = convert1to99(n)
		return
	}
	if n == 1000 {
		w = "one thousand"
		return
	}
	w = convert100to999(n)
	return
}
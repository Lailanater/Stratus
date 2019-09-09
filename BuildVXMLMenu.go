package main

import (
	"os"
	"strconv"
	"strings"
)

var tagStack Stack
var menuNameWithExtension string
var menuName string
var tabs int = 0;

var menuSb strings.Builder

const XML_VERSION = "1.0"
const ENCODING = "UTF-8"
const VXML_VERSION = "2.1"

const VXML = "vxml"
const BLOCK = "block"
const FORM = "form"
const SCRIPT = "script"
const PROMPT = "prompt"
const AUDIO = "audio"
const FIELD = "field"
const FILLED = "filled"
const IF = "if"
const NOMATCH = "nomatch"
const NOINPUT = "noinput"
const CATCH = "catch"

func buildMenu(name string, repeatOption bool, numOfOptions int, defaultRoute string) {
	menuSb.Reset()
	menuNameWithExtension = name + ".vxml"
	menuName = name
	generateStandardVXMLHeading()
	if numOfOptions > 0 {
		generateInitForm("Prompt")
		stringBuilderNewLine()
		generatePromptForm()
		buildGrammar(menuName, DTMF, repeatOption, numOfOptions)
	} else {
		generateInitForm("Logic")
	}
	stringBuilderNewLine()
	generateLogicForm(repeatOption, numOfOptions)
	stringBuilderNewLine()
	generateErrorForm(defaultRoute)
	stringBuilderNewLine()
	generateNextPageForm()
	writeToFile()
	initMain()
}

func generateInitForm(next string) {
	generateFormTag(menuName)
	generateBlockTagWithComment("pageDefinitionsBlock", "Put page specific things here")
	generateAssignTag("stateName", "'"+menuName+"'")
	generateAssignTag("currentPage", "stateName + '.vxml'")
	generateComment("nextPage defined by " + menuName + "LogicForm")
	generateScriptTag("resetPageCounters();")
	popTagsUntil(BLOCK)
	stringBuilderNewLine()
	generateBlockTagWithComment("pageReportingBlock", "Put reporting things here")
	generateSetCallEndStateTag()
	generateScriptTag("setAppNav(stateName, 'Start Date &amp; Time = ' + getTime().normal);")
	generateEnteredLogTag()
	generateGoToFormTag(menuName + next)
	popTagsUntil(FORM)
}

func generatePromptForm() {
	generateFormTag(menuName + "Prompt")
	generateBlockTag()
	generatePromptTag("true")
	generateAudioTagWithTTS("", "Welcome to the "+menuName)
	popTagsUntil(PROMPT)
	generateGoToFormTag(menuName + "Logic")
	popTagsUntil(FORM)
}

func generateLogicForm(repeatOption bool, numOfOptions int) {
	generateFormTag(menuName + "Logic")
	if numOfOptions > 0 {
		generateFieldTag("option")
		generateGrammarTag(DTMF)
		popTagsUntil(FIELD)
		stringBuilderNewLine()
		generateFilledTag()
		generateVar("input_mode", "option$.inputmode")
		generateIf("input_mode == 'voice'")
		generateVariableLogTag("Recognized utterance", "option$.utterance")
		generateScriptTag("setAppNav(stateName, 'Utterance = \"' + option$.utterance + '\"');")
		popTagsUntil(IF)
		generateVar("confidence_rounded", "roundOff(option$.confidence)")
		generateVar("confidence_percent", "confidence_rounded * 100")
		generateVar("confidence_level", "getConfidenceLevel(confidence_rounded)")
		appendToStringBuilderWithTabsAndNewLine("<log expr=\"applicationName + ': ' + currentPage + ': input_mode=' + input_mode + ' | confidence_level='")
		appendToStringBuilderWithTabsAndNewLine("\t+ confidence_level + ' | confidence=' + confidence_percent + '%'\" />")
		generateScriptTag("setAppNav(stateName, 'Confidence = ' + confidence_percent + '% - ' + input_mode);")
		generateVariableLogTag("option", "option")
		generateScriptTag("setAppNav(stateName, 'Option =  ' + option);")
		stringBuilderNewLine()
		for i := 1; i <= numOfOptions; i++ {
			if i == 1 {
				generateIf("option == '" + strconv.Itoa(i) + "'")
			} else {
				generateElseIf("option == '" + strconv.Itoa(i) + "'")
			}
			generateTODOComment()
			if isCalltype[i-1] {
				generateAssignTag("txr_reason", "''")
				generateAssignTag("calltype", "''")
				generateVariableLogTag("Routing to", "calltype")
				generateScriptTag("setAppNav(stateName, 'Routing to ' + calltype);")
				generateAssignTag("nextPage", "'DataCalltypeRoute.vxml'")
			} else {
				generateAssignTag("nextPage", "''")
			}
		}

		if repeatOption {
			generateElseIf("option == '#'")
			generateScriptTag("repeatLimitReached = isRepeatLimitReached();")
			appendToStringBuilderWithTabsAndNewLine("<log expr=\"applicationName + ': ' + currentPage + ': REPEAT: ' + repeatCounter + ': repeatLimitReached: ' + repeatLimitReached\" />")
			generateIf("repeatLimitReached")
			generateLogTag("Repeat limit has been reached throwing state.repeat.limit")
			generateThrowTag("state.repeat.limit")
			generateElseTag()
			generateGoToFormTag(menuName + "Prompt")
			popTagsUntil(IF)
		}
		popTagsUntil(IF)
		generateGoToFormTag("NextPage")
		popTagsUntil(FILLED)
	} else {
		generateBlockTag()
		popTagsUntil(BLOCK)
	}
	stringBuilderNewLine()

	generateNoMatches()
	generateNoInputs()

	popTagsUntil(FORM)
}

func generateVariableLogTagExtra(text string, variable string, descr string) {
	appendToStringBuilderWithTabsAndNewLine("<log expr=\"applicationName + ': ' + currentPage + ': " + text + ": ' + " + variable + " + ': " + descr + "'\" />")
}

func generateTODOComment() {
	appendToStringBuilderWithTabsAndNewLine("<!-- TODO: Update assign(s) with correct information -->")
}

func generateAssignTagWithComment(name string, expr string, comment string) {
	appendToStringBuilderWithTabsAndNewLine("<assign name=\"" + name + "\" expr=\"" + expr + "\" />\t<!-- " + comment + " -->")
}

func generateLogTag(text string) {
	appendToStringBuilderWithTabsAndNewLine("<log expr=\"applicationName + ': ' + currentPage + ': " + text + "'\" />")
}

func generateErrorForm(defaultRoute string) {
	generateFormTag("Error")
	generateBlockTag()
	generatePromptTag("true")
	generateAudioTagWithTTS("max_error_INI.wav", "We are sorry you are having difficulties. Please try"+
		" your call at another time.")
	popTagsUntil(PROMPT)
	stringBuilderNewLine()
	generateTODOComment()
	if defaultRoute == "calltype" {
		generateAssignTag("txr_reason", "'xfer'")
		generateAssignTag("calltype", "'example_calltype'")
		generateScriptTag("setAppNav(stateName, 'Default routing to ' + calltype);")
		generateVariableLogTag("Default routing to", "calltype")
	} else if defaultRoute == "menu" {
		generateAssignTag("nextPage", "'EndCall.vxml'")
		generateScriptTag("setAppNav(stateName, 'Default routing to ' + nextPage);")
		generateVariableLogTag("Default routing to", "nextPage")
	}
	generateGoToFormTag("NextPage")
	popTagsUntil(FORM)
}

func generateNextPageForm() {
	generateFormTag("NextPage")
	generateBlockTag()
	generateAssignTag("previousPage", "currentPage")
	generateGoToVariableTag("nextPage")
	popTagsUntil(VXML)
}

func generateGoToVariableTag(variable string) {
	appendToStringBuilderWithTabsAndNewLine("<goto expr=\"" + variable + "\" />")
}

func generateThrowTag(event string) {
	appendToStringBuilderWithTabsAndNewLine("<throw event=\"" + event + "\" />")
}

func generateNoMatches() {
	for i := 1; i <= 3; i++ {
		generateNoMatch(i)
		stringBuilderNewLine()
	}
}

func generateNoMatch(count int) {
	_generateNoHelper(NOMATCH, count)
}

func _generateNoHelper(name string, count int) {
	appendToStringBuilderWithTabsAndNewLine("<" + name + " count=\"" + strconv.Itoa(count) + "\">")
	tagStack.Push(name)
	tabIn()
	generateScriptTag("errorLimitReached = isErrorLimitReached();")
	generateVariableLogTag( strings.ToUpper(name) + " " + strconv.Itoa(count) + ": errorLimitReached", "errorLimitReached")
	generateIf("errorLimitReached")
	generateScriptTag("setAppNav(stateName, '" + strings.ToUpper(name) + " " + strconv.Itoa(count) + " - MAX ERROR');")
	generateThrowTag("state.error.limit")
	generateElseTag()
	generateScriptTag("setAppNav(stateName, '" + strings.ToUpper(name) + " " + strconv.Itoa(count) + "');")
	if count != 3 {
		generatePromptTag("true")
		generateAudioTagWithTTS("", "You have triggered " + name + " " + strconv.Itoa(count))
	}
	popTagsUntil(name)
}

func generateNoInputs() {
	for i := 1; i <= 3; i++ {
		generateNoInput(i)
		if i != 3 {
			stringBuilderNewLine()
		}
	}
}

func generateNoInput(count int) {
	_generateNoHelper(NOINPUT, count)
}

func generateCatchTag(event string) {
	appendToStringBuilderWithTabsAndNewLine("<catch event=\"" + event + "\">")
	tabIn()
	tagStack.Push(CATCH)
}

func generateElseTag() {
	tabOut()
	appendToStringBuilderWithTabsAndNewLine("<else />")
	tabIn()
}

func generateGrammarTag(mode string) {
	appendToStringBuilderWithTabsAndNewLine("<grammar srcexpr=\"grammarDirectoryWithLang + '" + menuName + "_" + strings.ToUpper(mode) + ".grxml'\"")
	appendToStringBuilderWithTabsAndNewLine("            mode=\"" + mode + "\"")
	appendToStringBuilderWithTabsAndNewLine("            type=\"application/srg+xml\" />")
}

func generateElseIf(cond string) {
	tabOut()
	appendToStringBuilderWithTabsAndNewLine("<elseif cond=\"" + cond + "\" />")
	tabIn()
}

func generateFilledTag() {
	appendToStringBuilderWithTabsAndNewLine("<filled>")
	tabIn()
	tagStack.Push(FILLED)
}

func generateVar(name string, expr string) {
	appendToStringBuilderWithTabsAndNewLine("<var name=\"" + name + "\" expr=\"" + expr + "\" />")
}

func generateIf(cond string) {
	appendToStringBuilderWithTabsAndNewLine("<if cond=\"" + cond + "\">")
	tabIn()
	tagStack.Push(IF)
}

func generateVariableLogTag(text string, variable string) {
	appendToStringBuilderWithTabsAndNewLine("<log expr=\"applicationName + ': ' + currentPage + ': " + text + ": ' + " + variable + "\" />")
}

func generateFieldTag(name string) {
	appendToStringBuilderWithTabsAndNewLine("<field name=\"" + name + "\">")
	tabIn()
	tagStack.Push(FIELD)
}

func generatePromptTag(bargein string) {
	appendToStringBuilderWithTabsAndNewLine("<prompt bargein=\"" + bargein + "\">")
	tabIn()
	tagStack.Push(PROMPT)
}

func generateAudioTagWithTTS(expr string, TTS string) {
	if expr != "" {
		appendToStringBuilderWithTabsAndNewLine("<audio expr=\"audioDirectoryWithLang + '" + expr + "'\">")
	} else {
		appendToStringBuilderWithTabsAndNewLine("<audio expr=\"audioDirectoryWithLang + '" + expr + "'\">\t" +
			"<!-- TODO: Add your audio file here and TTS inside of the audio tags -->")
	}
	tabIn()
	appendToStringBuilderWithTabsAndNewLine(TTS)
	tagStack.Push(AUDIO)
}

func generateGoToFormTag(formName string) {
	appendToStringBuilderWithTabsAndNewLine("<goto next=\"#" + formName + "Form\" />")
}

func generateEnteredLogTag() {
	appendToStringBuilderWithTabsAndNewLine("<log expr=\"applicationName + ': Entered ' + currentPage\" />")
}

func generateScriptTag(javascript string) {
	appendToStringBuilderWithTabsAndNewLine("<script>" + javascript + "</script>")
}

func generateSetCallEndStateTag() {
	generateScriptTag("setCallEndState(stateName);")
}

func generateFormTag(id string) {
	appendToStringBuilderWithTabsAndNewLine("<form id=\"" + id + "Form\">")
	tagStack.Push(FORM)
	tabIn()
}

func generateBlockTagWithComment(name string, comment string) {
	appendToStringBuilderWithTabsAndNewLine("<block name=\"" + name + "\">\t<!-- " + comment + " -->")
	tagStack.Push(BLOCK)
	tabIn()
}

func generateBlockTag() {
	appendToStringBuilderWithTabsAndNewLine("<block>")
	tagStack.Push(BLOCK)
	tabIn()
}

func generateAssignTag(name string, expr string) {
	appendToStringBuilderWithTabsAndNewLine("<assign name=\"" + name + "\" expr=\"" + expr + "\" />")
}

func generateComment(comment string) {
	appendToStringBuilderWithTabsAndNewLine("<!-- " + comment + " -->")
}

func popTagsUntil(endTag string) {
	for !tagStack.IsEmpty() && endTag != tagStack.Peek() {
		tabOut()
		appendToStringBuilderWithTabsAndNewLine("</" + tagStack.Pop().(string) + ">")
	}
	if !tagStack.IsEmpty() {
		tabOut()
		appendToStringBuilderWithTabsAndNewLine("</" + tagStack.Pop().(string) + ">")
	}
}

func appendToStringBuilderWithTabsAndNewLine(text string) {
	for i := 0; i < tabs; i++ {
		menuSb.WriteString("\t")
	}
	menuSb.WriteString(text)
	menuSb.WriteString("\n")
}

func stringBuilderNewLine() {
	menuSb.WriteString("\n")
}

func tabIn() {
	tabs++
}

func tabOut() {
	tabs--
}

func generateStandardVXMLHeading() {
	appendToStringBuilderWithTabsAndNewLine("<?xml version=\"" + XML_VERSION + "\" encoding=\"" + ENCODING + "\"?>")
	appendToStringBuilderWithTabsAndNewLine("<!DOCTYPE vxml PUBLIC \"-//W3C//DTD VOICEXML " + VXML_VERSION + "//EN\" \"http://www.w3.org/TR/voicexml21/vxml.dtd\">")
	appendToStringBuilderWithTabsAndNewLine("<vxml version=\"" + VXML_VERSION + "\" xmlns=\"http://www.w3.org/2001/vxml\" application=\"approot.vxml\">")
	stringBuilderNewLine()
	tabIn()
	appendToStringBuilderWithTabsAndNewLine("<!-- This file has been auto-generated. @author Chris Lail -->")
	stringBuilderNewLine()
	tagStack.Push(VXML)
}

func writeToFile() {
	dir := settings[DIR]
	path := dir + "/WebContent/"
	absolutePath := path + menuNameWithExtension
	file, err := os.Create(absolutePath)
	if err != nil {
		panic(err)
	}
	file.WriteString(menuSb.String())
}

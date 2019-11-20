package main

import (
	"os"
	"text/template"
)

const grammarTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<grammar version="1.0"
         xml:lang="en-US"
         mode=""
         xmlns="http://www.w3.org/2001/06/grammar"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.w3.org/2001/06/grammar http://www.w3.org/TR/speech-grammar/grammar.xsd"
         root="root">

    <!-- This file has been auto-generated. @author Chris Lail -->

    <rule id="root" scope="public">
        <one-of>

            <item>#</item>


            <item></item>

        </one-of>
    </rule>
</grammar>`

const menuTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE vxml PUBLIC "-//W3C//DTD VOICEXML 2.1//EN" "http://www.w3.org/TR/voicexml21/vxml.dtd">
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml" application="approot.vxml">

   <!-- This file has been auto-generated. @author Chris Lail -->

   <form id="{{ .MenuName }}Form">
      <block name="pageDefinitionsBlock">    <!-- Put page specific things here -->
         <script>initPageVariables("{{ .MenuName }}");</script>
         <!-- nextPage defined by {{ .MenuName }}LogicForm -->
      </block>

      <block name="pageReportingBlock">  <!-- Put reporting things here -->
         <script>setCallEndState(stateName);</script>
         <script>logToProd('Start Date &amp; Time = ' + getTime().normal);</script>
         <log expr="applicationName + ': Entered ' + currentPage" />
         <goto next="#{{ .MenuName }}PromptForm" />
      </block>
   </form>

   <form id="{{ .MenuName }}PromptForm">
      <block>
         <prompt bargein="true">
            <audio expr="audioDirectoryWithLang + ''"> <!-- TODO: Add your audio file here and TTS inside of the audio tags -->
               Welcome to the {{ .MenuName }}
            </audio>
         </prompt>
         <goto next="#{{ .MenuName }}LogicForm" />
      </block>
   </form>

   <form id="{{ .MenuName }}LogicForm">
      <field name="option">
         <grammar srcexpr="grammarDirectoryWithLang + '{{ .MenuName }}_DTMF.grxml'"
                     mode="dtmf"
                     type="application/srg+xml" />
      </field>

      <filled>
         <var name="input_mode" expr="option$.inputmode" />
         <if cond="input_mode == 'voice'">
            <log expr="applicationName + ': ' + currentPage + ': Recognized utterance: ' + option$.utterance" />
            <script>logToProd('Utterance = "' + option$.utterance + '"');</script>
         </if>
         <var name="confidence_rounded" expr="roundOff(option$.confidence)" />
         <var name="confidence_percent" expr="confidence_rounded * 100" />
         <var name="confidence_level" expr="getConfidenceLevel(confidence_rounded)" />
         <log expr="applicationName + ': ' + currentPage + ': input_mode=' + input_mode + ' | confidence_level='
           + confidence_level + ' | confidence=' + confidence_percent + '%'" />
         <script>logToProd('Confidence = ' + confidence_percent + '% - ' + input_mode);</script>
         <log expr="applicationName + ': ' + currentPage + ': option: ' + option" />
         <script>logToProd('Option =  ' + option);</script>

         <if cond="option == '1'">
            <!-- TODO: Update assign(s) with correct information -->
            <assign name="txr_reason" expr="''" />
            <assign name="calltype" expr="''" />
            <log expr="applicationName + ': ' + currentPage + ': Routing to: ' + calltype" />
            <script>logToProd('Routing to ' + calltype);</script>
            <assign name="nextPage" expr="'DataCalltypeRoute.vxml'" />
         <elseif cond="option == '2'" />
            <!-- TODO: Update assign(s) with correct information -->
            <assign name="nextPage" expr="''" />
         </if>
         <goto next="#NextPageForm" />
      </filled>

      <nomatch count="1">
         <script>errorLimitReached = isErrorLimitReached();</script>
         <log expr="applicationName + ': ' + currentPage + ': NOMATCH 1: errorLimitReached: ' + errorLimitReached" />
         <if cond="errorLimitReached">
            <script>logToProd('NOMATCH 1 - MAX ERROR');</script>
            <throw event="state.error.limit" />
         <else />
            <script>logToProd('NOMATCH 1');</script>
            <prompt bargein="true">
               <audio expr="audioDirectoryWithLang + ''"> <!-- TODO: Add your audio file here and TTS inside of the audio tags -->
                  You have triggered nomatch 1
               </audio>
            </prompt>
         </if>
      </nomatch>

      <nomatch count="2">
         <script>errorLimitReached = isErrorLimitReached();</script>
         <log expr="applicationName + ': ' + currentPage + ': NOMATCH 2: errorLimitReached: ' + errorLimitReached" />
         <if cond="errorLimitReached">
            <script>logToProd('NOMATCH 2 - MAX ERROR');</script>
            <throw event="state.error.limit" />
         <else />
            <script>logToProd('NOMATCH 2');</script>
            <prompt bargein="true">
               <audio expr="audioDirectoryWithLang + ''"> <!-- TODO: Add your audio file here and TTS inside of the audio tags -->
                  You have triggered nomatch 2
               </audio>
            </prompt>
         </if>
      </nomatch>

      <nomatch count="3">
         <script>errorLimitReached = isErrorLimitReached();</script>
         <log expr="applicationName + ': ' + currentPage + ': NOMATCH 3: errorLimitReached: ' + errorLimitReached" />
         <if cond="errorLimitReached">
            <script>logToProd('NOMATCH 3 - MAX ERROR');</script>
            <throw event="state.error.limit" />
         <else />
            <script>logToProd('NOMATCH 3');</script>
         </if>
      </nomatch>

      <noinput count="1">
         <script>errorLimitReached = isErrorLimitReached();</script>
         <log expr="applicationName + ': ' + currentPage + ': NOINPUT 1: errorLimitReached: ' + errorLimitReached" />
         <if cond="errorLimitReached">
            <script>logToProd('NOINPUT 1 - MAX ERROR');</script>
            <throw event="state.error.limit" />
         <else />
            <script>logToProd('NOINPUT 1');</script>
            <prompt bargein="true">
               <audio expr="audioDirectoryWithLang + ''"> <!-- TODO: Add your audio file here and TTS inside of the audio tags -->
                  You have triggered noinput 1
               </audio>
            </prompt>
         </if>
      </noinput>

      <noinput count="2">
         <script>errorLimitReached = isErrorLimitReached();</script>
         <log expr="applicationName + ': ' + currentPage + ': NOINPUT 2: errorLimitReached: ' + errorLimitReached" />
         <if cond="errorLimitReached">
            <script>logToProd('NOINPUT 2 - MAX ERROR');</script>
            <throw event="state.error.limit" />
         <else />
            <script>logToProd('NOINPUT 2');</script>
            <prompt bargein="true">
               <audio expr="audioDirectoryWithLang + ''"> <!-- TODO: Add your audio file here and TTS inside of the audio tags -->
                  You have triggered noinput 2
               </audio>
            </prompt>
         </if>
      </noinput>

      <noinput count="3">
         <script>errorLimitReached = isErrorLimitReached();</script>
         <log expr="applicationName + ': ' + currentPage + ': NOINPUT 3: errorLimitReached: ' + errorLimitReached" />
         <if cond="errorLimitReached">
            <script>logToProd('NOINPUT 3 - MAX ERROR');</script>
            <throw event="state.error.limit" />
         <else />
            <script>logToProd('NOINPUT 3');</script>
         </if>
      </noinput>
   </form>

   <form id="ErrorForm">
      <block>
         <prompt bargein="true">
            <audio expr="audioDirectoryWithLang + 'max_error_INI.wav'">
               We are sorry you are having difficulties. Please try your call at another time.
            </audio>
         </prompt>

         <!-- TODO: Update assign(s) with correct information -->
         <assign name="nextPage" expr="'EndCall.vxml'" />
         <script>logToProd('Default routing to ' + nextPage);</script>
         <log expr="applicationName + ': ' + currentPage + ': Default routing to: ' + nextPage" />
         <goto next="#NextPageForm" />
      </block>
   </form>

   <form id="NextPageForm">
      <block>
         <assign name="previousPage" expr="currentPage" />
         <goto expr="nextPage" />
     </block>
   </form>
</vxml>`

func main() {
	createMenu("TestNAME")
	createGrammar()
}

func createGrammar() {
	tmpl := template.Must(template.New("grammar").Parse(grammarTemplate))
	tmpl.Execute(os.Stdout, "hey")
}

func createMenu(menuName string) {
	tmpl := template.Must(template.New("menu").Parse(menuTemplate))
	data := map[string]string {
		"MenuName": menuName,
	}
	tmpl.Execute(os.Stdout, data)
}
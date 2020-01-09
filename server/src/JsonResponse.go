package main

import (
	"encoding/json"
	"net/http"
)

type JsonReply struct {
	FileCreated     bool
	FileExists      bool
	ShouldOverwrite bool
}

func SendJsonReply(w http.ResponseWriter, fileCreated, fileExists, shouldOverwrite bool) {
	jsonReply := JsonReply{fileCreated, fileExists, shouldOverwrite}

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(jsonReply)
	if err != nil {
		panic(err)
	}
}

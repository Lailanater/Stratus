import axios from "axios";

const querystring = require("querystring");

export default {
    createMenu: function (menuName, defaultRouteTo, projectPath, dtmfOptions, shouldOverwrite) {
        const data = {
            menuName,
            defaultRouteTo,
            projectPath,
            dtmfOptions,
            shouldOverwrite
        };

        return axios.post('http://localhost:8080/api/createMenu', querystring.stringify(data));
    },

    createGrammar: function (menuName, mode, projectPath, needsRepeat, dtmfOptions, shouldOverwrite) {
        const data = {
            menuName,
            mode,
            projectPath,
            needsRepeat,
            dtmfOptions,
            shouldOverwrite
        };

        return axios.post('http://localhost:8080/api/createGrammar', querystring.stringify(data));
    }
};
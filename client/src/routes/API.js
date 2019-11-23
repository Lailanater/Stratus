import axios from "axios";
const querystring = require("querystring");

export default {
    createMenu: function (menuName, defaultRouteTo, projectPath, dtmfOptions) {
        console.log(menuName, defaultRouteTo, projectPath, dtmfOptions)

        return axios.post('http://localhost:8080/api/createMenu',
            querystring.stringify({
                menuName,
                defaultRouteTo,
                projectPath,
                dtmfOptions
            })
        )
    },

    createGrammar: function (menuName, mode, projectPath, needsRepeat, dtmfOptions) {
        return axios.post('http://localhost:8080/api/createGrammar',
            querystring.stringify({
                menuName,
                mode,
                projectPath,
                needsRepeat,
                dtmfOptions
            })
        )
    }
}
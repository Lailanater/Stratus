import axios from "axios";

const querystring = require("querystring");

export default {
    createMenu: function (menuName, defaultRouteTo, projectPath, dtmfOptions) {
        console.log(menuName, defaultRouteTo, projectPath, dtmfOptions)

        const data = {
            menuName,
            defaultRouteTo,
            projectPath,
            dtmfOptions
        }

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        return axios.post('http://localhost:8080/api/createMenu', querystring.stringify(data), config)
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
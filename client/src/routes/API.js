import axios from "axios";

export default {
    createMenu: function (menuName, defaultRouteTo, projectPath, dtmfOptions) {
        return axios.post('http://localhost:8080/api/createMenu', {
            menuName,
            defaultRouteTo,
            projectPath,
            dtmfOptions
        })
    },

    createGrammar: function (menuName, mode, projectPath, needsRepeat, dtmfOptions) {
        return axios.post('http://localhost:8080/api/createGrammar', {
            menuName,
            mode,
            projectPath,
            needsRepeat,
            dtmfOptions
        })
    }
}
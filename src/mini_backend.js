let jsonFromServer = {};
let BASE_SERVER_URL;
let isLoadedFromServer = false;

export const backend = {
    setItem: function(key, item) {
        if (!isLoadedFromServer) {
            return Promise.reject('database.json not loaded yet - refusing to save');
        }
        jsonFromServer[key] = item;
        return saveJSONToServer();
    },
    getItem: function(key) {
        if (!jsonFromServer[key]) {
            return null;
        }
        return jsonFromServer[key];
    },
    deleteItem: function(key) {
        if (!isLoadedFromServer) {
            return Promise.reject('database.json not loaded yet - refusing to save');
        }
        delete jsonFromServer[key];
        return saveJSONToServer();
    }
};

export async function downloadFromServer() {
    let result = await loadJSONFromServer();
    try {
        jsonFromServer = JSON.parse(result);
    } catch (e) {
        throw new Error('Backend lieferte kein JSON (falsche REACT_APP_BACKEND_URL?): ' + BASE_SERVER_URL);
    }
    isLoadedFromServer = true;
}

export function setURL(url) {
    BASE_SERVER_URL = url;
}

/**
 * Loads a JSON or JSON Array to the Server
 * payload {JSON | Array} - The payload you want to store
 */

async function loadJSONFromServer() {
    let response = await fetch(BASE_SERVER_URL + '/nocors.php?json=database&noache=' + (new Date().getTime()));
    if (!response.ok) {
        throw new Error('Backend nicht erreichbar: ' + response.status + ' ' + response.statusText);
    }
    return await response.text();
}

/**
 * Saves a JSON or JSON Array to the Server
 */
function saveJSONToServer() {
    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = determineProxySettings();
        let serverURL = proxy + BASE_SERVER_URL + '/save_json.php';
        xhttp.open('POST', serverURL);

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(jsonFromServer));

    });
}


function determineProxySettings() {
    return '';
}

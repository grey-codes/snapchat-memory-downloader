const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const request = require('request');

function downloadMemories(url, name) {
	const parts = url.split("?");

    const baseURL = parts[0];

    const params = parts[1];
    const form = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    
    const options = {
        uri: baseURL,
        method: 'POST',
        headers: {
        },
        form: form
    };
    
    request.post(options, function(err, res, success){
        if (!success) {
            console.log(err);
            return;
        }
        var fetch = request(success);
        fetch.on('response',  function (res) {
            const queryIndex = success.indexOf('?');
            const dotIndex = success.lastIndexOf('.',queryIndex);
            const ext = success.substring(dotIndex, queryIndex);
            res.pipe(fs.createWriteStream('./' + name + ext));
        });
    });
}

const domProm = JSDOM.fromFile('memories_history.html', {
    resources: "usable",
    runScripts: "dangerously"
});
domProm.then((dom) => {
    const tags = dom.window.document.getElementsByTagName('tr');
    const tableRows = [];
    for (let i=0; i<tags.length; i++) {
        const row = tags[i];
        if (row.getElementsByTagName('a').length>0)
            tableRows.push(row);
    }
    const memories = [];
    tableRows.forEach(row => {
        const cols = row.getElementsByTagName('td');
        let date = new Date();
        for (let i=0; i<cols.length; i++) {
            const col = cols[i];
            if (col.innerHTML.indexOf('UTC')>=0)
                date = new Date(col.innerHTML);
        }
        const links = row.getElementsByTagName('a');
        const url = links[0].href;
        memories.push({
            url,
            date: 
                '' 
                + date.getFullYear()
                + '.' + date.getMonth()
                + '.' + date.getDay()
                + ' - ' + date.toLocaleTimeString().replaceAll(':','.')
            });
    });
    for (let i=0; i<5; i++) {
        const memory = memories[i];
        const url = memory.url
                          .replace('javascript:downloadMemories(\'', '')
                          .replace('\');','');
        setTimeout(() => downloadMemories(url,'output/' + memory.date), i*250);
    }
});
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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
    console.log(memories);
});
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
    console.log(tableRows);
});
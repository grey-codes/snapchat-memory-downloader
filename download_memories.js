const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const domProm = JSDOM.fromFile('memories_history.html', {
    resources: "usable",
    runScripts: "dangerously"
});
domProm.then((dom) => {
    const tags = dom.window.document.getElementsByTagName('tr');
    console.log(tags);
});
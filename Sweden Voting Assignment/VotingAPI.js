const request = new XMLHttpRequest();
request.open('POST', 'http://api.scb.se/OV0104/v1/doris/sv/ssd/ME/ME0104/ME0104D/ME0104T4', true);
request.onload = function () {
    const data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400)
        console.log(data);
    else console.log('error');
}
request.send({
    "query": [{"code":"Region",
     "selection":{"filter":"all", "values":["*"]}},
     {"code":"ContentsCode",
     "selection":{"filter":"all","values":["*"]}},
     {"code":"Tid",
     "selection":{ "filter":"all", "values":["*"]}}],
    "response": {"format":"json"}
    });
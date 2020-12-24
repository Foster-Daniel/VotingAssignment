

function retrieveData(year) {
    // The link to be connected to.
    const link = 'http://api.scb.se/OV0104/v1/doris/sv/ssd/ME/ME0104/ME0104D/ME0104T4';

    // THe names of the places in Sweden where the API has data for. It seemed like an easier choice to make this array to save the website from doubling the calls to the API.
    const names = ["Riket","Upplands Väsby","Vallentuna","Österåker","Värmdö","Järfälla","Ekerö","Huddinge","Botkyrka","Salem","Haninge","Tyresö","Upplands-Bro","Nykvarn","Täby","Danderyd","Sollentuna","Stockholm","Södertälje","Nacka","Sundbyberg","Solna","Lidingö","Vaxholm","Norrtälje","Sigtuna","Nynäshamn","Håbo","Älvkarleby","Knivsta","Heby","Tierp","Uppsala","Enköping","Östhammar","Vingåker","Gnesta","Nyköping","Oxelösund","Flen","Katrineholm","Eskilstuna","Strängnäs","Trosa","Ödeshög","Ydre","Kinda","Boxholm","Åtvidaberg","Finspång","Valdemarsvik","Linköping","Norrköping","Söderköping","Motala","Vadstena","Mjölby","Aneby","Gnosjö","Mullsjö","Habo","Gislaved","Vaggeryd","Jönköping","Nässjö","Värnamo","Sävsjö","Vetlanda","Eksjö","Tranås","Uppvidinge","Lessebo","Tingsryd","Alvesta","Älmhult","Markaryd","Växjö","Ljungby","Högsby","Torsås","Mörbylånga","Hultsfred","Mönsterås","Emmaboda","Kalmar","Nybro","Oskarshamn","Västervik","Vimmerby","Borgholm","Gotland","Olofström","Karlskrona","Ronneby","Karlshamn","Sölvesborg","Svalöv","Bara","Staffanstorp","Burlöv","Vellinge","Östra Göinge","Örkelljunga","Bjuv","Kävlinge","Lomma","Svedala","Skurup","Sjöbo","Hörby","Höör","Tomelilla","Bromölla","Osby","Perstorp","Klippan","Åstorp","Båstad","Malmö","Lund","Landskrona","Helsingborg","Höganäs","Eslöv","Ystad","Trelleborg","Kristianstad","Simrishamn","Ängelholm","Hässleholm","Hylte","Halmstad","Laholm","Falkenberg","Varberg","Kungsbacka","Härryda","Partille","Öckerö","Stenungsund","Tjörn","Orust","Sotenäs","Munkedal","Tanum","Dals-Ed","Färgelanda","Ale","Lerum","Vårgårda","Bollebygd","Grästorp","Essunga","Karlsborg","Gullspång","Tranemo","Bengtsfors","Mellerud","Lilla Edet","Mark","Svenljunga","Herrljunga","Vara","Götene","Tibro","Töreboda","Göteborg","Mölndal","Kungälv","Lysekil","Uddevalla","Strömstad","Vänersborg","Trollhättan","Alingsås","Borås","Ulricehamn","Åmål","Mariestad","Lidköping","Skara","Skövde","Hjo","Tidaholm","Falköping","Kil","Eda","Torsby","Storfors","Hammarö","Munkfors","Forshaga","Grums","Årjäng","Sunne","Karlstad","Kristinehamn","Filipstad","Hagfors","Arvika","Säffle","Lekeberg","Laxå","Hallsberg","Degerfors","Hällefors","Ljusnarsberg","Örebro","Kumla","Askersund","Karlskoga","Nora","Lindesberg","Skinnskatteberg","Surahammar","Kungsör","Hallstahammar","Norberg","Västerås","Sala","Fagersta","Köping","Arboga","Vansbro","Malung-Sälen","Gagnef","Leksand","Rättvik","Orsa","Älvdalen","Smedjebacken","Mora","Falun","Borlänge","Säter","Hedemora","Avesta","Ludvika","Ockelbo","Hofors","Ovanåker","Nordanstig","Ljusdal","Gävle","Sandviken","Söderhamn","Bollnäs","Hudiksvall","Ånge","Timrå","Härnösand","Sundsvall","Kramfors","Sollefteå","Örnsköldsvik","Ragunda","Bräcke","Krokom","Strömsund","Åre","Berg","Härjedalen","Östersund","Nordmaling","Bjurholm","Vindeln","Robertsfors","Norsjö","Malå","Storuman","Sorsele","Dorotea","Vännäs","Vilhelmina","Åsele","Umeå","Lycksele","Skellefteå","Arvidsjaur","Arjeplog","Jokkmokk","Överkalix","Kalix","Övertorneå","Pajala","Gällivare","Älvsbyn","Luleå","Piteå","Boden","Haparanda","Kiruna"]
    
    const request = new XMLHttpRequest();
    // The URL I will be making the POST request to.
    request.open('POST', link, true);
    // This is what I am sending to the server to retrieve the information I want.
    const jsonData = {
        query: [
            {code: "Region", selection: {filter: "All", values: ["*"]}},
            {code: "ContentsCode", selection: {filter: "All", values: ["*"]}},
            {code: "Tid",selection: {filter: "Agg", values: [year]}},
        ],
        response: {format: "json"}
    };
    // Sending the data.
    request.send(JSON.stringify(jsonData));

    request.onload = function() {
        // Checking to see if a proper connetion was established.
        if (request.status >= 200 && request.status < 400) {

            // Parsing the data so that it can be used in Javascript.
            const result = JSON.parse(this.response)
            console.log(result);
            // Removing old results from the page to make way for new results.
            const municipalities = document.getElementsByClassName('municipality');
            for(let i = municipalities.length - 1; i >= 0; i--)
            municipalities[i].parentNode.removeChild(municipalities[i]);
            
            // Using the data to create new elements so to be displayed on the page.
            const allVotes = document.getElementById('all-votes');
            let i = 0;
            result.data.forEach(item => {
                console.log('Name: ' + names[i] + ', ID: ' + item.key[0] + ', Percent: ' + item.values[0]);
                const newItem = document.createElement('div');
                newItem.id = names[i];
                newItem.classList.add('municipality');
                newItem.setAttribute('data-name', names[i]);
                newItem.setAttribute('data-percent', item.values[0]);
                newItem.innerHTML = `
                    <h1>${names[i]}</h1>
                    <hr>
                    <h2>${item.values[0]}% of people voted</h2>
                `;
                if(item.values[0] == '..') console.warn('No Data for' + names[i]);
                else allVotes.appendChild(newItem); // Adding the newly created elements to the DOM.
                i++;
            });

            // A simple for loop to calculate the highest and lowest percentages to get the areas with the most and least turnout.
            // The relevant variables are simply compared against every other value and if one is lower/higher, it takes its value.
            let lowestPercent, highestPercent;
            lowestPercent = highestPercent = {percent: parseFloat(municipalities[0].dataset.percent), name:municipalities[0].dataset.name};
            for(let i = 0; i < municipalities.length; i++) {
                if(lowestPercent.percent > parseFloat(municipalities[i].dataset.percent) && parseFloat(municipalities[i].dataset.percent) != '..') lowestPercent = {percent: parseFloat(municipalities[i].dataset.percent), name:municipalities[i].dataset.name}
                if(highestPercent.percent < parseFloat(municipalities[i].dataset.percent) && parseFloat(municipalities[i].dataset.percent) != '..') highestPercent = {percent: parseFloat(municipalities[i].dataset.percent), name:municipalities[i].dataset.name};
            }

            // Updating the DOM with the values gathered from the for loop.
            document.getElementById('least-percent-name').innerText = lowestPercent.name;
            document.getElementById('least-percent-value').innerText = lowestPercent.percent + '%';
            document.getElementById('highest-percent-name').innerText = highestPercent.name;
            document.getElementById('highest-percent-value').innerText = highestPercent.percent + '%';

            
            // Applying already existing filtering and ordering to the new list of results.
            order();

            // We don't want to waste time applying search results if nothing has been searched.
            if(document.getElementById('search-input'.valueOf.length > 0)) search();
        }
        else console.error('Unable To Access Data');
    };
}

// The website must be populated on load. '2018' is the default position for the range input and thus is the information to be shown.
retrieveData(2018); 
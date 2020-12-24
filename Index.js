const selectElements = document.getElementsByClassName('select');
for(let i = 0; i < selectElements.length; i++)
    selectElements[i].innerHTML = `
    <option value="1973">1973</option>
    <option value="1976">1976</option>
    <option value="1979">1979</option>
    <option value="1982">1982</option>
    <option value="1985">1985</option>
    <option value="1988">1988</option>
    <option value="1991">1991</option>
    <option value="1994">1994</option>
    <option value="1998">1998</option>
    <option value="2002">2002</option>
    <option value="2006">2006</option>
    <option value="2010">2010</option>
    <option value="2014">2014</option>
    <option selected value="2018">2018</option>
    `;

function changeYear(element) {
    // Update the title at the top of the page and the information displayed above the range input to accurately display the year chosen.
    document.getElementById('heading-select').value = element.value;
    document.getElementById('footer-select').value = element.value;
    // Retrieve information to be diaplyed on the web page.
    retrieveData(element.value);
}

function search() {
    // Get the search input from the relevant input.
    // Force the text into lowercase to prevent case sensitive type issues.
    // Replace Swedish specific characters to allow for easy searching on English based keyboards.
    const search = document.getElementById('search-input').value.toLowerCase().trim().replace('å', 'a').replace('ä', 'a').replace('ö', 'o');
    
    // Get list of all viewable elements.
    const municipalities = document.getElementsByClassName('municipality');
    for(let i = 0; i < municipalities.length; i++)
        // IF SEARCH IS INCLUDED IN ELEMENT ID (MUNICIPALITY NAME) THEN DISPLAY IT, ELSE HIDE IT.
        municipalities[i].id.toLowerCase().includes(search) ? municipalities[i].style.display = 'initial': municipalities[i].style.display = 'none';
}

function order() {
    // Storing elements on the page into variables.
    const orderValue = document.getElementById('order').value;
    const allVotes = document.getElementById('all-votes');
    const municipalities = document.getElementsByClassName('municipality');
    switch(orderValue) {
        // The logic for each case is the same and is as follows:
        /*
        case "[CASE]":
            LOOP THROUGH ALL ELEMENTS AVAILABLE WHERE INFORMATION IS STORED
                IF ELEMENT IS OUT OF ORDER FOR THE SELECTED CASE THEN CONTINUE, ELSE DO NOTHING
                    CHANGE ORDER OF ELEMENTS
                    CHECK IF THE ELEMENTS BEFORE IT ARE IN THE CORRECT ORDER AFTER THE MOVE
                    IF SO REORDER THEM TO BE CORRECT
        */
        case "mostPercent":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(parseFloat(municipalities[i].dataset.percent) < parseFloat(municipalities[i + 1].dataset.percent)) {
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
                    for(let j = i; j > 0; j--)
                        if(parseFloat(municipalities[j - 1].dataset.percent) < parseFloat(municipalities[j].dataset.percent))
                            allVotes.insertBefore(municipalities[j],municipalities[j - 1]);
                }
            break;
        case "leastPercent":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(parseFloat(municipalities[i].dataset.percent) > parseFloat(municipalities[i + 1].dataset.percent)) {
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
                    for(let j = i; j > 0; j--)
                        if(parseFloat(municipalities[j - 1].dataset.percent) > parseFloat(municipalities[j].dataset.percent))
                            allVotes.insertBefore(municipalities[j],municipalities[j - 1]);
                }
            break;
        case "reverseName":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(municipalities[i].dataset.name < municipalities[i + 1].dataset.name) {
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
                    for(let j = i; j > 0; j--)
                        if((municipalities[j - 1].dataset.name) < (municipalities[j].dataset.name))
                        allVotes.insertBefore(municipalities[j],municipalities[j - 1]);
                }
            break;
        case "name":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(municipalities[i].dataset.name > municipalities[i + 1].dataset.name) {
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
                    for(let j = i; j > 0; j--)
                        if((municipalities[j - 1].dataset.name) > (municipalities[j].dataset.name))
                           allVotes.insertBefore(municipalities[j],municipalities[j - 1]);
                }
            break;
    }
}
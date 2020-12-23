function changeYear(element) {
    document.getElementById('page-title').innerHTML = `Votes in Sweden (${element.value}) <img src="https://acegif.com/wp-content/uploads/sweden-flag.gif" alt="Swedish Flag" width="45"/>`;
    document.getElementById('displayed-year').innerText = element.value;
}

function search() {
    const search = document.getElementById('search-input').value.toLowerCase().replace('å', 'a').replace('ä', 'a').replace('ö', 'o');
    const municipalities = document.getElementsByClassName('municipality');
    for(let i = 0; i < municipalities.length; i++)
        municipalities[i].id.toLowerCase().includes(search) ? municipalities[i].style.display = 'initial': municipalities[i].style.display = 'none';
}

function order() {
    const orderValue = document.getElementById('order').value;
    const allVotes = document.getElementById('all-votes');
    const municipalities = document.getElementsByClassName('municipality');
    switch(orderValue) {
        case "mostNumber":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(parseInt(municipalities[i].dataset.number) < parseInt(municipalities[i + 1].dataset.number))
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
            break;
        case "leastNumber":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(parseInt(municipalities[i].dataset.number) > parseInt(municipalities[i + 1].dataset.number))
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
            break;
        case "mostPercent":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(parseInt(municipalities[i].dataset.percent) < parseInt(municipalities[i + 1].dataset.percent))
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
            break;
        case "leastPercent":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(parseInt(municipalities[i].dataset.percent) > parseInt(municipalities[i + 1].dataset.percent))
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
            break;
        case "mostPopulation":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(parseInt(municipalities[i].dataset.population) < parseInt(municipalities[i + 1].dataset.population))
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
            break;
        case "leastPopulation":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(parseInt(municipalities[i].dataset.population) > parseInt(municipalities[i + 1].dataset.population))
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
            break;
        case "reverseName":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(municipalities[i].dataset.name < municipalities[i + 1].dataset.name)
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
            break;
        case "name":
            for(let i = 0; i < municipalities.length - 1; i++)
                if(municipalities[i].dataset.name > municipalities[i + 1].dataset.name)
                    allVotes.insertBefore(municipalities[i + 1],municipalities[i]);
            break;
    }
}
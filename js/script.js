// Function for on page load
function initPage() {
    /* Variables */
    let indica = searchingAPI("race", "indica");
    let sativa = searchingAPI("race", "sativa");
    let effects = diffSearch("effects");
    let indicaList = document.getElementsByClassName("container")[1].getElementsByClassName("row")[0];
    let sativaList = document.getElementsByClassName("container")[2].getElementsByClassName("row")[0];
    let effectsList = document.getElementsByClassName("container")[3].getElementsByClassName("row")[0];

    /* Populating the indica list */
    for (let x = 0; x < 3; x++) {
        let area = indicaList.getElementsByClassName("col-sm-3")[x];
        let randIndica = indica[Math.floor(Math.random() * indica.length)];
        let listItem = document.createElement("p");
        let a = document.createElement("a");
        a.innerHTML = randIndica.name;
        let strain = randIndica.name;
        for (let i = 0; i < strain.length; i++) {
            strain = strain.replace("'", "-");
        }
        area.setAttribute('onclick', 'foundStrain(' + "'" + strain + "'" + ");");
        a.setAttribute('onclick', 'foundStrain(' + "'" + strain + "'" + ");");
        listItem.appendChild(a);
        area.appendChild(listItem);
    }

    /* Populating the Sativa list */
    for (let x = 0; x < 3; x++) {
        let area = sativaList.getElementsByClassName("col-sm-3")[x];
        let randSativa = sativa[Math.floor(Math.random() * sativa.length)];
        let listItem = document.createElement("p");
        let a = document.createElement("a");
        a.innerHTML = randSativa.name;
        let strain = randSativa.name;
        for (let i = 0; i < strain.length; i++) {
            strain = strain.replace("'", "-");
        }
        a.setAttribute('onclick', 'foundStrain(' + "'" + strain + "'" + ");");
        area.setAttribute('onclick', 'foundStrain(' + "'" + strain + "'" + ");");
        listItem.appendChild(a);
        area.appendChild(listItem);
    }

    /* Populating the Effects list */
    for (let x = 0; x < 3; x++) {
        let area = effectsList.getElementsByClassName("col-sm-3")[x];
        let randEffect = effects[Math.floor(Math.random() * effects.length)];
        if (randEffect.type == "positive") {
            area.style.backgroundColor = "rgba(50,205,50,.7)";
        } else if (randEffect.type == "negative") {
            area.style.backgroundColor = "rgba(0,51,255,.7)";
        } else if (randEffect.type == "medical") {
            area.style.backgroundColor = "rgba(255,34,0,.7)";
        }
        let listItem = document.createElement("p");
        let a = document.createElement("a");
        a.innerHTML = randEffect.effect;
        a.setAttribute('onclick', "foundEffect(" + "'" + randEffect.effect + "'" + "," + "'" + randEffect.type + "'" + ");");
        area.setAttribute('onclick', "foundEffect(" + "'" + randEffect.effect + "'" + "," + "'" + randEffect.type + "'" + ");");
        listItem.appendChild(a);
        area.appendChild(listItem);
    }
}
// Function for calling the API the traditional Way
function searchingAPI(typeOfSearch, search) {
    /* XML Request */
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://strainapi.evanbusse.com/bEgwHTh/strains/search/" + typeOfSearch + "/" + search, false);
    xhr.send();
    let weedObject = JSON.parse(xhr.responseText);
    return weedObject;
}
// Function for additional calls
function additionalCall(typeOfSearch, search) {
    /* XML Request */
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://strainapi.evanbusse.com/bEgwHTh/strains/data" + "/" + typeOfSearch + "/" + search, false);
    xhr.send();
    let weedObject = JSON.parse(xhr.responseText);
    return weedObject;
}
// Function for calling the API the new way
function diffSearch(search) {
    /* XML Request */
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://strainapi.evanbusse.com/bEgwHTh/searchdata/" + search, false);
    xhr.send();
    let weedObject = JSON.parse(xhr.responseText);
    return weedObject;
}
// Function for getting the Search from the nav bar
function getSearch() {
    /* Variables */
    let search = document.getElementById("search").value;
    let searchTwo = document.getElementById("searchTwo").value;

    /* Checking the other search field */
    if (searchTwo != " ") {
        document.getElementById("searchTwo").value = null;
    }
    userSearch(search); // Calling the Validation function 
}
//Ben's function for creating "cards"
function idCard(weed) {
    /* Variables */

    let strain = weed.race;
    let cardBody = document.getElementById('id-card-body');
    let idName = document.getElementById('id-name');
    let idRace = document.getElementById('id-strain');

    /* Displaying the card */
    cardBody.style.display = "block";
    if (strain == "indica") {
        cardBody.style.backgroundColor = "rgba(255, 255, 0, .7)";
        idName.innerHTML = (weed.name);
        idRace.innerHTML = (weed.race);
    } else if (strain == "sativa") {
        cardBody.style.backgroundColor = "rgba(255, 0, 0, .7)";
        idName.innerHTML = (weed.name);
        idRace.innerHTML = (weed.race);
    } else if (strain == "hybrid") {
        cardBody.style.backgroundColor = "rgba(255, 100, 2, .7)";
        idName.innerHTML = (weed.name);
        idRace.innerHTML = (weed.race);
    } else {
        cardBody.style.display = "none";
    }
}
// Function for getting the Search from the input field
function getSearchTwo() {
    /* Variables */
    let search = document.getElementById("searchTwo").value;
    let searchTwo = document.getElementById("search").value;

    /* Checking the other search field */
    if (searchTwo != " ") {
        document.getElementById("search").value = null;
    }
    userSearch(search);
}
// Function for collecting and then validating the User Search
function userSearch(search) {
    /* Checking user search */

    if (search.length <= 1) {
        ohNo(search); // Calling Error Function
    } else {
        /* Variables */
        let results = searchingAPI("name", search);
        let flavorResults = diffSearch("flavors");
        let effectResults = diffSearch("effects");
        let x;
        let flavor;
        let effect;
        let flavTrue = false;
        let effTrue = false;
        /* Checking for Flavors */
        search = search.charAt(0).toUpperCase() + search.slice(1);
        for (x = 0; x < flavorResults.length; x++) {
            if (search == flavorResults[x]) {
                flavor = flavorResults[x];
                flavTrue = true;
                break;
            }
        }
        /* Checking for Effects */
        if (x == flavorResults.length) {
            for (x = 0; x < effectResults.length; x++) {
                if (search == effectResults[x].effect) {
                    effect = effectResults[x];
                    effTrue = true;
                    break;
                }
            }
        }
        /* Checking if the search was valid */
        if (results.length == 0 && flavTrue == false && effTrue == false) {
            ohNo(search); // Calling Error Function
        } else {
            if (flavTrue == true) {
                foundFlavor(flavor); // Calling flavor function
            } else if (effTrue == true) {
                foundEffect(effect); // Calling effect function
            } else {
                /* Variables */
                let actualWeed;
                let i;
                /* Searching for the Strain without the "Bhang" */
                for (i = 0; i < results.length; i++) {
                    if (search == results[i].name) {
                        actualWeed = results[i];
                        break;
                    }
                }
                if (i == results.length) {
                    actualWeed = results[0];
                }
                foundStrain(actualWeed, results); // Calling the strain function
            }
        }
    }

}
// Function for populating the page when the user searchs for a specific strain
function foundStrain(search, results) {
    /* Variables */
    let title = document.getElementsByTagName("h1")[0];
    let description;
    let desc = document.getElementById("desc");
    let positiveEff = document.getElementById("positive");
    let medicalEff = document.getElementById("medical");
    let negativeEff = document.getElementById("negative");
    let effects;
    let flavList = document.getElementById("flavors");
    let flavors;

    clearingLists(); // Clearing the Lists
    document.getElementsByClassName("search")[0].style.visibility = "hidden"; // Hiding search bar

    /* Removing dashes */
    for (let i = 0; i < search.length; i++) {
        search = search.replace("-", "'");
    }
    /* Checking results */
    if (results == null) {
        results = searchingAPI("name", search);
        for (i = 0; i < results.length; i++) {
            if (search == results[i].name) {
                search = results[i];
                break;
            }
        }
        if (i == results.length) {
            search = results[0];
        }
    }

    title.innerHTML = search.name; // Setting title of the page

    /* Checking for a description */
    if (search.desc == null) {
        let descTwo = additionalCall("desc", search.id);
        if (descTwo.desc != null) {
            description = descTwo.desc;
        } else {
            description = "No Description Found";
        }
    } else {
        description = search.desc;
    }

    /* Displaying Description */
    desc.style.display = "block";
    desc.innerHTML = description;

    effects = additionalCall("effects", search.id); // Getting the effects of the strain

    /* Displaying Positive Effects */
    if (effects.positive.length > 0) {
        positiveEff.style.display = "block";
        document.getElementById('posImg').style.display = "block";
        for (let x = 0; x < effects.positive.length; x++) {
            let listItem = document.createElement("li");
            listItem.innerHTML = effects.positive[x];
            listItem.setAttribute("onclick", "foundEffect(" + "'" + effects.positive[x] + "'" + ");");
            positiveEff.appendChild(listItem);
        }
    }

    /* Displaying Medical Effects */
    if (effects.medical.length > 0) {
        medicalEff.style.display = "block";
        document.getElementById('medImg').style.display = "block";
        for (let x = 0; x < effects.medical.length; x++) {
            let listItem = document.createElement("li");
            listItem.innerHTML = effects.medical[x];
            listItem.setAttribute("onclick", "foundEffect(" + "'" + effects.medical[x] + "'" + ",'medical');");
            medicalEff.appendChild(listItem);
        }
    }

    /* Displaying Negative Effects */
    if (effects.negative.length > 0) {
        negativeEff.style.display = "block";
        document.getElementById('negImg').style.display = "block";
        for (let x = 0; x < effects.negative.length; x++) {
            let listItem = document.createElement("li");
            listItem.innerHTML = effects.negative[x];
            listItem.setAttribute("onclick", "foundEffect(" + "'" + effects.negative[x] + "'" + ");");
            negativeEff.appendChild(listItem);
        }
    }

    flavors = additionalCall("flavors", search.id); // Getting the flavors of the strain

    /* Displaying the flavors */
    if (flavors.length > 0) {
        flavList.style.display = "block";
        document.getElementById('flaImg').style.display = "block";
        for (let i = 0; i < flavors.length; i++) {
            if (flavors[i] != "Spicy/Herbal") {
                let listItem = document.createElement("li");
                listItem.innerHTML = flavors[i];
                listItem.setAttribute("onclick", "foundFlavor(" + "'" + flavors[i] + "'" + ");");
                flavList.appendChild(listItem);
            }
        }
    }

    /* Displaying additional Strains */
    if (results.length > 1) {
        let related = document.getElementById("suggestions");
        related.style.display = "block";
        related.setAttribute("class", "info");
        let relTitle = document.createElement("h3");
        relTitle.innerHTML = "Related Strains";
        let box = document.getElementById("sugBox");
        box.insertBefore(relTitle, related);
        for (let i = 0; i < results.length; i++) {
            if (results[i].name != search.name) {
                let listItem = document.createElement("li");
                listItem.innerHTML = results[i].name;
                let strain = results[i].name;
                for (let i = 0; i < strain.length; i++) {
                    strain = strain.replace("'", "-");
                }
                listItem.setAttribute("onclick", "foundStrain(" + "'" + strain + "'" + ");");
                related.appendChild(listItem);
            }
        }
    }
    idCard(search); // Calling the ID Card function
    scroll(); // Scrolling to the top of the page
}
// Function for populating the page when the user searches for a flavor
function foundFlavor(flavor) {
    /* Variables */
    let title = document.getElementsByTagName("h1")[0];
    let area = document.getElementsByClassName("container")[1].getElementsByClassName("row")[0];
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let results;
    let title1 = document.createElement("h3");
    let title2 = document.createElement("h3");
    let title3 = document.createElement("h3");
    let hList = document.createElement("ul");
    let iList = document.createElement("ul");
    let sList = document.createElement("ul");
    let h = 0;
    let s = 0;
    let i = 0;

    clearingLists(); // Calling the function that clears the lists
    document.getElementsByClassName("search")[0].style.visibility = "hidden"; // Hiding the Search bar

    /* Getting Strains */
    results = searchingAPI("flavor", flavor);
    title.innerHTML = "Strains that have the flavor: " + flavor; // Displaying the title with the flavor
    /* Giving the divs bootstrap classes */
    div1.setAttribute("class", "col-sm-3");
    div2.setAttribute("class", "col-sm-3");
    div3.setAttribute("class", "col-sm-3");
    /* Setting the section titles */
    title1.innerHTML = "Hybrid Strains";
    div1.appendChild(title1);
    title2.innerHTML = "Indica Strains";
    div2.appendChild(title2);
    title3.innerHTML = "Sativa Strains";
    div3.appendChild(title3);
    /* Setting the Lists */
    hList.setAttribute("class", "hybridList");
    iList.setAttribute("class", "indicaList");
    sList.setAttribute("class", "hybridList");
    div1.appendChild(hList);
    div2.appendChild(iList);
    div3.appendChild(sList);

    /* Setting the divs */
    area.appendChild(div1);
    area.appendChild(div2);
    area.appendChild(div3);

    /* Populating the lists */
    for (let x = 0; x < results.length; x++) {
        let li = document.createElement("li");
        let rand = results[Math.floor(Math.random() * results.length)];
        li.innerHTML = rand.name;
        let strain = rand.name;
        for (let i = 0; i < strain.length; i++) {
            strain = strain.replace("'", "-");
        }
        li.setAttribute("onclick", "foundStrain(" + "'" + strain + "'" + ");");
        if (rand.race == "hybrid" && h < 10) {
            h++;
            hList.appendChild(li);
        } else if (rand.race == "indica" && i < 10) {
            i++;
            iList.appendChild(li);
        } else if (rand.race == "sativa" && s < 10) {
            s++;
            sList.appendChild(li);
        }
        if (h == 10 && s == 10 && i == 10) {
            break;
        }
    }
    scroll(); // Scrolling to the top of the page
}
// Function for populating the page when the user searches for an effect
function foundEffect(effect, type) {
    /* Variables */
    let title = document.getElementsByTagName("h1")[0];
    let area = document.getElementsByClassName("container")[1].getElementsByClassName("row")[0];
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let results = searchingAPI("effect", effect);
    let title1 = document.createElement("h3");
    let title2 = document.createElement("h3");
    let title3 = document.createElement("h3");
    let hList = document.createElement("ul");
    let iList = document.createElement("ul");
    let sList = document.createElement("ul");
    let h = 0;
    let s = 0;
    let i = 0;

    clearingLists(); // Function for clearing the Lists
    document.getElementsByClassName("search")[0].style.visibility = "hidden"; // Hiding the Search bar

    /* Checking the type of Effect */
    if (!effect.hasOwnProperty("effect")) {
        results = searchingAPI("effect", effect);
        if (type == "medical") {
            title.innerHTML = "Strains that treat the effect: " + effect;
        } else {
            title.innerHTML = "Strains that have the effect: " + effect;
        }
    } else {
        results = searchingAPI("effect", effect.effect);
        if (effect.type == "medical") {
            title.innerHTML = "Strains that treat the effect: " + effect.effect;
        } else {
            title.innerHTML = "Strains that have the effect: " + effect.type;
        }
    }
    /* Giving the divs bootstrap classes */
    div1.setAttribute("class", "col-sm-3");
    div2.setAttribute("class", "col-sm-3");
    div3.setAttribute("class", "col-sm-3");
    /* Setting the section titles */
    title1.innerHTML = "Hybrid Strains";
    div1.appendChild(title1);
    title2.innerHTML = "Indica Strains";
    div2.appendChild(title2);
    title3.innerHTML = "Sativa Strains";
    div3.appendChild(title3);
    /* Setting the Lists */
    hList.setAttribute("class", "hybridList");
    iList.setAttribute("class", "indicaList");
    sList.setAttribute("class", "hybridList");
    div1.appendChild(hList);
    div2.appendChild(iList);
    div3.appendChild(sList);

    /* Setting the divs */
    area.appendChild(div1);
    area.appendChild(div2);
    area.appendChild(div3);

    /* Populating the lists */
    for (let x = 0; x < results.length; x++) {
        let li = document.createElement("li");
        let rand = results[Math.floor(Math.random() * results.length)];
        li.innerHTML = rand.name;
        let strain = rand.name;
        for (let i = 0; i < strain.length; i++) {
            strain = strain.replace("'", "-");
        }
        li.setAttribute("onclick", "foundStrain(" + "'" + strain + "'" + ");");
        if (rand.race == "hybrid" && h < 10) {
            h++;
            hList.appendChild(li);
        } else if (rand.race == "indica" && i < 10) {
            i++;
            iList.appendChild(li);
        } else if (rand.race == "sativa" && s < 10) {
            s++;
            sList.appendChild(li);
        }
        if (h == 10 && s == 10 && i == 10) {
            break;
        }
    }
    scroll(); // Scrolling to the top of the page
}
// Function for producing an error on bad searches
function ohNo(search) {
    /* Variables */
    let indica = searchingAPI("race", "indica");
    let sativa = searchingAPI("race", "sativa");
    let hybrid = searchingAPI("race", "hybrid");
    let firstLetter = search.charAt(0);
    let suggestionList = document.getElementById("suggestions");
    let desc = document.getElementById("desc");
    let title = document.getElementsByTagName("h1")[0];
    let x = 0;
    let y = 0;
    let z = 0;

    clearingLists(); // Function for clearing the Lists
    document.getElementsByClassName("search")[0].style.visibility = "visible"; // Hiding the search bar

    /* Displaying Error Message */
    desc.style.display = "block";
    desc.innerHTML = "Whoops, can't seem to find that." + "<br>" + "Here are some suggestions based on your search: ";
    title.innerHTML = "Whoops!";
    /* Displaying the Suggestions */
    firstLetter = firstLetter.toUpperCase();
    suggestionList.style.display = "block";
    for (let i = 0; i < 3; i++) {
        for (x; x < indica.length; x++) {
            let strainLetter = indica[x].name.charAt(0);
            if (firstLetter == strainLetter) {
                let listItem = document.createElement("li");
                listItem.innerHTML = indica[x].name;
                let strain = indica[x].name;
                for (let r = 0; r < strain.length; r++) {
                    strain = strain.replace("'", "-");
                }
                listItem.setAttribute('onclick', "foundStrain(" + "'" + strain + "'" + ");");
                suggestionList.appendChild(listItem);
                x++;
                break;
            }
        }
        for (y; y < sativa.length; y++) {
            let strainLetter = sativa[y].name.charAt(0);
            if (firstLetter == strainLetter) {
                let listItem = document.createElement("li");
                listItem.innerHTML = sativa[y].name;
                let strain = sativa[y].name;
                for (let r = 0; r < strain.length; r++) {
                    strain = strain.replace("'", "-");
                }
                listItem.setAttribute('onclick', "foundStrain(" + "'" + strain + "'" + ");");
                suggestionList.appendChild(listItem);
                y++;
                break;
            }
        }
        for (z; z < hybrid.length; z++) {
            let strainLetter = hybrid[z].name.charAt(0);
            if (firstLetter == strainLetter) {
                let listItem = document.createElement("li");
                listItem.innerHTML = hybrid[z].name;
                let strain = hybrid[z].name;
                for (let r = 0; r < strain.length; r++) {
                    strain = strain.replace("'", "-");
                }
                listItem.setAttribute('onclick', "foundStrain(" + "'" + strain + "'" + ");");
                suggestionList.appendChild(listItem);
                z++;
                break;
            }
        }
    }
    scroll(); // Scrolling to the top
}
// Function for clearing the lists
function clearingLists() {
    /* Variables */
    let indicaList = document.getElementsByClassName("container")[1].getElementsByClassName("row")[0];
    let sativaList = document.getElementsByClassName("container")[2].getElementsByClassName("row")[0];
    let effectsList = document.getElementsByClassName("container")[3].getElementsByClassName("row")[0];
    let suggestionList = document.getElementById("suggestions");
    let desc = document.getElementById("desc");
    let titles = document.getElementsByTagName("h3");
    let effList1 = document.getElementById("positive");
    let effList2 = document.getElementById("negative");
    let effList3 = document.getElementById("medical");
    let idCard = document.getElementById("id-card-body");
    let flavList = document.getElementById("flavors");

    /* Clearing the lists */
    indicaList.innerHTML = " ";
    sativaList.innerHTML = " ";
    effectsList.innerHTML = " ";
    suggestionList.innerHTML = " ";
    suggestionList.style.display = "none";
    desc.innerHTML = " ";
    desc.style.display = "none";
    effList1.innerHTML = " ";
    effList1.style.display = "none";
    effList2.innerHTML = " ";
    effList2.style.display = "none";
    effList3.innerHTML = " ";
    effList3.style.display = "none";
    idCard.style.display = "none";
    flavList.innerHTML = " ";
    flavList.style.display = "none";
    document.getElementById("posImg").style.display = "none";
    document.getElementById("medImg").style.display = "none";
    document.getElementById("negImg").style.display = "none";
    document.getElementById("flaImg").style.display = "none";
    for (let i = 0; i < titles.length; i++) {
        titles[i].style.display = "none";
    }
}
// Function for displaying the about section
function about() {
    /* Variables */
    let area = document.getElementById('desc');

    clearingLists(); // Clearing the lists
    document.getElementsByClassName("search")[0].style.visibility = "hidden"; // Hidding the search bar
    area.style.display = "block"; // Displaying the desc area

    /* Displaying the About Information, yes this looks bad i know */
    document.getElementsByTagName("h1")[0].innerHTML = "About";
    document.getElementsByTagName("h3")[0].style.display = "block";
    document.getElementsByTagName("h3")[0].innerHTML = 'What is "Strains"?';
    area.innerHTML = "Strains is a site where you can find more information about a cannabis strain. We have different categories where you can explore different strains. You can search by strain type(Sativa, Indica, Hybrid), flavor, and mood effects!";
    document.getElementsByClassName("container")[1].getElementsByClassName("row")[0].innerHTML = "<p class='info'>This site was created for a school project. We created this site because we were introduced to API's in our class, 'Emerging Web Tools and Trends'. </p>";
    document.getElementsByTagName("h3")[2].innerHTML = "Who created Strains?";
    document.getElementsByTagName("h3")[2].style.display = "block";
    document.getElementsByClassName("container")[2].getElementsByClassName("row")[0].innerHTML = "<p class ='info'>This site was created by four students from Portland Community College.</p>";
    document.getElementsByClassName("container")[3].getElementsByClassName("row")[0].innerHTML = "<ul class='info'><li>Project Lead and Javascript: Ben Grzybowski</li><li>Operations and Graphics: Izabela Wiechowska</li><li>UX/UI and HTML/CSS: Tiana Le</li><li>Javascript: Jared Martinez</li></ul>";

    scroll(); // Scrolling to the top
}
// Function for displaying the strain types
function strainTypes() {
    /* Variables */
    let area = document.getElementsByClassName("container")[1].getElementsByClassName("row")[0];
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let title1 = document.createElement("h3");
    let title2 = document.createElement("h3");
    let title3 = document.createElement("h3");
    let hList = document.createElement("ul");
    let iList = document.createElement("ul");
    let sList = document.createElement("ul");
    clearingLists();
    document.getElementsByTagName("h1")[0].innerHTML = "Strain Type";

    /* Giving the divs the bootstrap classes */
    div1.setAttribute("class", "col-sm-3");
    div2.setAttribute("class", "col-sm-3");
    div3.setAttribute("class", "col-sm-3");

    /* Setting the section titles */
    title1.innerHTML = "Hybrid Strains";
    div1.appendChild(title1);
    title2.innerHTML = "Indica Strains";
    div2.appendChild(title2);
    title3.innerHTML = "Sativa Strains";
    div3.appendChild(title3);

    /* Setting the Strain Lists */
    hList.setAttribute("class", "hybridList");
    iList.setAttribute("class", "indicaList");
    sList.setAttribute("class", "sativaList");
    div1.appendChild(hList);
    div2.appendChild(iList);
    div3.appendChild(sList);

    /* Setting the Divs */
    area.appendChild(div1);
    area.appendChild(div2);
    area.appendChild(div3);

    /* Populating the lists */
    showStrains("hybrid", hList);
    showStrains("indica", iList);
    showStrains("sativa", sList);

    scroll(); // Scrolling to the top
}
// Function for displaying the strains in the race
function showStrains(strain, list) {
    /* Variables */
    let results = searchingAPI("race", strain);

    /* Displaying the strains */
    for (let i = 0; i < 15; i++) {
        let listItem = document.createElement("li");
        let randoNum = Math.floor(Math.random() * results.length);
        listItem.innerHTML = results[randoNum].name;
        let strain = results[randoNum].name;
        for(let x = 0; x < strain.length; x++){
            strain = strain.replace("'", "-");
        }
        listItem.setAttribute("onclick", "foundStrain('" + strain + "');");
        list.appendChild(listItem);
    }
}
// Function for displaying the flavors
function showFlavors() {
    /* Variables */
    let results = diffSearch("flavors");
    let list = document.getElementById("suggestions");

    clearingLists(); // Clearing
    document.getElementsByTagName("h1")[0].innerHTML = "Flavors"; // Setting the title
    list.style.display = "block"; // Displaying the list

    /* Populating the list */
    for (let i = 0; i < results.length; i++) {
        if (results[i] != "Spicy/Herbal") {
            let listItem = document.createElement("li");
            let name = results[i];
            listItem.innerHTML = name;
            listItem.setAttribute("onclick", "foundFlavor('" + name + "');");
            list.appendChild(listItem);
        }
    }

    scroll(); // Scrolling to the top
}
// Function for displaying the effects
function showEffects() {
    /* Variables */
    let results = diffSearch("effects");
    let list = document.getElementById("suggestions");

    clearingLists(); // Clearing the lists
    document.getElementsByTagName("h1")[0].innerHTML = "Effects"; // Setting the title
    list.style.display = "block"; // Displaying the list

    /* Populating the list */
    for (let i = 0; i < results.length; i++) {
        let listItem = document.createElement("li");
        listItem.innerHTML = results[i].effect;
        listItem.setAttribute("onclick", "foundEffect(" + "'" + results[i].effect + "'" + "," + "'" + results[i].type + "'" + ");");
        list.appendChild(listItem);
    }
    scroll(); // Scrolling to the top
}
// Function for scrolling
function scroll() {
    document.getElementsByTagName("nav")[0].scrollIntoView();
}
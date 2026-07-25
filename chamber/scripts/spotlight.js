const baseURL = "https://viktorfrosty.github.io/wdd231/chamber/";
const linksURL = "https://viktorfrosty.github.io/wdd231/chamber/data/members.json";
const spotlight = document.querySelector("#spotlight-list");

async function getMembers() {
    if (!spotlight) return;

    let urlData = await fetch(linksURL);
    let spotlightData = await urlData.json();
    populateSpotlight(spotlightData.members);
}

function populateSpotlight(members) {

    const compliantMembers = members.filter(member =>

        member.membership === "gold" ||  member.membership === "silver"

    );

    let selectedMembers = [];

    while(selectedMembers.length < 3) {

        let randomPick = Math.floor(Math.random() * compliantMembers.length)

        if (!selectedMembers.includes(compliantMembers[randomPick])) {

            selectedMembers.push(compliantMembers[randomPick]);
        };

    };

    selectedMembers.forEach(member => {

        let li = document.createElement("li");

        let title = document.createElement("h3");

        let slogan = document.createElement("h4");

        let info = document.createElement("ul");

        let logo = document.createElement("img");

        let website = document.createElement("a");

        logo.setAttribute("src", member.logo)

        logo.setAttribute("alt", `${member.name} logo`)

        logo.setAttribute("loading", "lazy");

        logo.setAttribute("width", "175");

        logo.setAttribute("height", "100");

        title.textContent = `${member.name}`;

        slogan.textContent = `${member.slogan}`;

        member.numbers.forEach(number => {

            let numberLi = document.createElement("li");

            numberLi.textContent = `${number}`;

            numberLi.setAttribute("class","info");

            info.appendChild(numberLi);
            
        });

        let websiteLi = document.createElement("li")

        website.setAttribute("href", member.website);

        website.setAttribute("target", "_blank");

        website.textContent = `Member's website`;
        
        websiteLi.setAttribute("class","info");

        websiteLi.appendChild(website);

        info.setAttribute("class", "member-card");

        info.appendChild(websiteLi);

        li.appendChild(logo);

        li.appendChild(title);

        li.appendChild(slogan);

        li.appendChild(info);

        li.setAttribute("class", "member");

        spotlight.appendChild(li);
        
    });

};

getMembers();
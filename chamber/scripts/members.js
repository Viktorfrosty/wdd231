const baseURL = "https://viktorfrosty.github.io/wdd231/chamber/";

const linksURL = "https://viktorfrosty.github.io/wdd231/chamber/data/members.json";

const directory = document.querySelector("#directory");

let generator = "even";

function populateDirectory(members) {

    let goldMemberlist = document.createElement("ul");

    let npMemberlist = document.createElement("ul");

    let silverMemberlist = document.createElement("ul");

    let bronzeMemberlist = document.createElement("ul");

    members.forEach(member => {
        
        let info = document.createElement("li");

        let membershipLevel = document.createElement("h3");

        let icon = document.createElement("img");

        let name = document.createElement("h3");

        let slogan = document.createElement("h4");

        let categoriesHeader = document.createElement("p");

        let categoriesList = document.createElement("ul");

        let addressesHeader = document.createElement("p");

        let addressesList = document.createElement("ul");

        let numbersHeader = document.createElement("p");

        let numbersList = document.createElement("ul");

        let website = document.createElement("p");

        let url = document.createElement("a");

        if (member.membership == "gold") {

            membershipLevel.textContent = `Gold Member`;
            
            membershipLevel.setAttribute("class", "membership-lvl gold")

        } else if (member.membership == "np") {

            membershipLevel.textContent = `Non Profit Member`;

            membershipLevel.setAttribute("class", "membership-lvl np")

        } else if (member.membership == "silver") {

            membershipLevel.textContent = `Silver Member`;

            membershipLevel.setAttribute("class", "membership-lvl silver")

        } else if (member.membership == "bronze") {

            membershipLevel.textContent = `Bronze Member`;

            membershipLevel.setAttribute("class", "membership-lvl bronze")

        };

        icon.setAttribute("src", member.logo);

        icon.setAttribute("alt", `${member.name} logo`);

        icon.setAttribute("loading", "lazy");

        icon.setAttribute("width", "100");

        icon.setAttribute("height", "100");

        name.textContent = `${member.name}`;

        slogan.textContent = `${member.slogan}`;

        categoriesHeader.textContent = `Services: `;

        member.categories.forEach(category => {

            let categoryName = document.createElement("li");

            categoryName.textContent = `${category}`;
            
            categoriesList.appendChild(categoryName);
            
        });

        if (member.addresses.length == 1) {

            addressesHeader.textContent = `Address: `;

        } else {

            addressesHeader.textContent = `Addresses: `;

        };

        member.addresses.forEach(address => {

            let addressInfo = document.createElement("li");

            addressInfo.textContent = `${address}`;
            
            addressesList.appendChild(addressInfo);
            
        });

        if (member.numbers.length == 1) {

            numbersHeader.textContent = `Number: `;

        } else {

            numbersHeader.textContent = `Numbers: `;

        };

        member.numbers.forEach(number => {

            let numberInfo = document.createElement("li");

            numberInfo.textContent = `${number}`;
            
            numbersList.appendChild(numberInfo);
            
        });

        website.textContent = `Website: `;

        url.setAttribute("href", member.website);

        url.setAttribute("target", "_blank");

        url.textContent = `${member.name}`;

        info.setAttribute("class", "info-card");

        info.appendChild(membershipLevel);

        info.appendChild(icon);

        info.appendChild(name);

        info.appendChild(slogan);

        info.appendChild(categoriesHeader);

        info.appendChild(categoriesList);

        info.appendChild(addressesHeader);

        info.appendChild(addressesList);

        info.appendChild(numbersHeader);

        info.appendChild(numbersList);

        info.appendChild(website);

        info.appendChild(url);

        if (member.membership == "gold") {

            goldMemberlist.append(info);

        } else if (member.membership == "np") {

            npMemberlist.append(info);

        } else if (member.membership == "silver") {

            silverMemberlist.append(info);

        } else if (member.membership == "bronze") {

            bronzeMemberlist.append(info);

        }

    });
    
    goldMemberlist.setAttribute("class", "members");

    npMemberlist.setAttribute("class", "members");

    silverMemberlist.setAttribute("class", "members");

    bronzeMemberlist.setAttribute("class", "members");

    directory.appendChild(goldMemberlist);

    directory.appendChild(npMemberlist);

    directory.appendChild(silverMemberlist);

    directory.appendChild(bronzeMemberlist);

    const cardlist = document.querySelectorAll(".info-card");

    cardlist.forEach(element => {
                
        if (generator == "even") {

            element.setAttribute("class", "odd info-card");

            generator = "odd";

        } else if (generator == "odd") {

            element.setAttribute("class", "even info-card");

            generator = "even";
            
        };
        
    });

};

async function getDirectory() {

    let urlData = await fetch(linksURL);

    let directoryData = await urlData.json();

    populateDirectory(directoryData.members);

};

getDirectory();
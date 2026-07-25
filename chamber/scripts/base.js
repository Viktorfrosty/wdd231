document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

const url = 'data/members.json';
const directoryContainer = document.querySelector('#directory-container');
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector("#primary-nav");

async function getMembers() {
    if (!directoryContainer) return;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displayMembers = (members) => {
    directoryContainer.innerHTML = "";

    members.forEach((member) => {
        let card = document.createElement('section');
        card.innerHTML = `
            <img src="${member.logo}" alt="${member.name} Logo" width="150" height="150">
            <h3>${member.name}</h3>
            <p class="slogan"><em>${member.slogan}</em></p>
            <p class="address">📍 ${member.addresses[0]}</p>
            <p class="phone">📞 ${member.numbers[0]}</p>
            <p class="website"><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;
        directoryContainer.appendChild(card);
    });
};

if (directoryContainer) {
    getMembers();
}

if (gridBtn && listBtn && directoryContainer) {
    gridBtn.addEventListener("click", () => {
        directoryContainer.classList.add("grid-view");
        directoryContainer.classList.remove("list-view");
    });

    listBtn.addEventListener("click", () => {
        directoryContainer.classList.add("list-view");
        directoryContainer.classList.remove("grid-view");
    });
}

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("open");
        menuBtn.textContent = nav.classList.contains("open") ? "✖" : "☰";
    });
}
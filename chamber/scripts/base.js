// 1. Update Footer Dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// 2. Fetch and Display Members
const url = 'data/members.json';
const directoryContainer = document.querySelector('#directory-container');

async function getMembers() {
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
    // Clear container before adding new elements
    directoryContainer.innerHTML = "";

    members.forEach((member) => {
        // Create elements
        let card = document.createElement('section');
        
        // Build the HTML for each card based on your JSON structure
        card.innerHTML = `
            <img src="${member.logo}" alt="${member.name} Logo" width="150" height="150">
            <h3>${member.name}</h3>
            <p class="slogan"><em>${member.slogan}</em></p>
            <p class="address">📍 ${member.addresses[0]}</p>
            <p class="phone">📞 ${member.numbers[0]}</p>
            <p class="website"><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;
        
        // Append card to container
        directoryContainer.appendChild(card);
    });
}

// Initialize fetch
getMembers();

// 3. Grid / List View Toggle Logic
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

gridBtn.addEventListener("click", () => {
    directoryContainer.classList.add("grid-view");
    directoryContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
    directoryContainer.classList.add("list-view");
    directoryContainer.classList.remove("grid-view");
});

// 4. Hamburger Menu Logic
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector("#primary-nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    // Change symbol from hamburger to X when open
    menuBtn.textContent = nav.classList.contains("open") ? "✖" : "☰";
});
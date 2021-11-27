//HACKATHON task to create a GitHUb API Application
document.body.style.backgroundColor = "rgb(212, 236, 221)";

//Initially creating the variables using DOM
var container = document.createElement("div");
container.setAttribute("class", "container");

var heading = document.createElement("div");
heading.setAttribute("class", "heading");
heading.innerHTML = "GitHub API Repo";

var input = document.createElement("input");
input.setAttribute("class", "search-user");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Enter GitHub Username");

var btn = document.getElementsByTagName("button");

function createElementDOM(a, b, c, d) {
var inputDiv = document.createElement(a);
inputDiv.classList.add(...b);

for (var [key, value] of Object.entries(c)) {
    inputDiv.setAttribute(key, value);
}
inputDiv.innerHTML = d;
return inputDiv;
}

//Using async, await & fetch() to get data
async function fetchAPI(url, cb) {
try {
    var resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status}`);
    var data = await resp.json();
    cb(data);
    } catch (error) {
    rowDiv.innerHTML = "";
    alert("Error");
}
}

//Declaring all the variables using DOM
var h1Div = createElementDOM(
    "h1",["display-1", "text-center", "mb-5"],{},"GitHub API Repo Application"
);

var formDiv = createElementDOM("form",["form-inline", "justify-content-center"],{},""
);

var DivEl = createElementDOM("div", ["form-group", "mx-sm-3", "mb-2"], {}, ""
);

var labelDiv = createElementDOM("label",["sr-only"],{ for: "userid" },"UserName"
);

var inputDiv = createElementDOM("input", ["form-control"], {
    type: "text",
    id: "userid",
    placeholder: "Enter the UserName ",
    title: "Try with Github username",
});

var buttonDiv = createElementDOM(
    "button",
    ["btn", "btn-primary", "mb-2"],
    { type: "submit", title: "Click" },
    "Search"
);

DivEl.append(labelDiv, inputDiv);

formDiv.append(DivEl, buttonDiv);

document.body.append(h1Div, formDiv);

btn[0].addEventListener("click", (e) => {
    e.preventDefault();
    var userBtn = document.getElementById("userid");
    if (userBtn.value) {
    fetchAPI(
        `https://api.github.com/users/${userBtn.value}/repos`,
        createRepoDom
    );
}   else {
    alert("Enter the UserName");
}
});

var containerDiv = createElementDOM("div", ["container", "my-5"], {}, "");

var rowDiv = createElementDOM("div", ["row", "row-cols-3"], {}, "");

function createRepoDom(data) {
    rowDiv.innerHTML = "";
    if (data) {
    data.forEach((el) => {
        var columnDiv = createElementDOM("div", ["col", "d-flex"], {}, "");

        var cardDiv = createElementDOM(
        "div",
        ["card", "flex-fill", "mb-3", "border-dark", "bg-light"],
        { style: "max-width:240px" },
        ""
    );

        var childRowDiv = createElementDOM("div", ["row", "no-gutters"], {}, "");

        var childColDiv = createElementDOM("div", ["col-md-4"], {}, "");
            
        var imgDiv = createElementDOM(
        "img",
        ["card-img"],
        {
            src: el.owner.avatar_url,
            alt: "user image",
        },
        ""
    );

        var colCardDiv = createElementDOM("div", ["col-md-8"], {}, "");

        var CardBodyDiv = createElementDOM("div", ["card-body"], {}, "");

        var CardTitleDiv = createElementDOM(
        "h5",
        ["card-header", "font-weight-bold", "mb-3",],
        {},
        el.name[0].toUpperCase() + el.name.slice(1)
    );

        var linkDiv = createElementDOM(
        "a",
        ["card-text"],
        { target: "_blank", role: "button", href: el.html_url },
        el.html_url
    );

        var DescriptionDiv = createElementDOM(
        "p",
        ["card-text"],
        {},
        el.description
    );

        var forkDiv=createElementDOM(
        "z",
        ["card-body"],
        {},
        el.forks_count
    );

        var starDiv=createElementDOM(
        "m",
        ["card-body"],
        {},
        el.stargazers_count
    );

//Appending all the Elements
        CardBodyDiv.append(CardTitleDiv, DescriptionDiv,forkDiv,starDiv,linkDiv);

        colCardDiv.append(CardBodyDiv);

        childColDiv.append(imgDiv);

        childRowDiv.append(childColDiv, colCardDiv);

        cardDiv.append(childRowDiv);

        columnDiv.append(cardDiv);

        rowDiv.append(columnDiv);
    });
}   else {
    alert("Please check with the user");
}

//Task Execution
containerDiv.append(rowDiv);
document.body.append(containerDiv);
}
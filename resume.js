const fs = require('fs');

const HEADER = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Resume</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
</head>
<body>
`

const FOOTER = `
    <script src="bundle.js"></script>
</body>
</html>
`

function makeHeader(data) {
    return `
    <div class="header">
        <div class="name">${data.name}</div>
        <div class="contact-list">
            <span class="contact phone"><i class="fas fa-phone"></i> ${data.phone}</span>
            <span class="contact email"><i class="fas fa-envelope"></i> ${data.email}</span>
            <span class="contact linkedin"><i class="fab fa-linkedin"></i> ${data.linkedin}</span>
            <span class="contact github"><i class="fab fa-github"></i> ${data.github}</span>
        </div>
    </div>
    `
}

function dateEntry(data) {
    return `
    <div class="date-entry">
        <div class="date-entry-text">${data.text}</div>
        <span class="date-entry-date">${data.date}</span>
    </div>
    `
}

function makeDateSection(data, name, icon) {
    return `
    <div class="section ${name.toLowerCase()}" data-packed>
        <div class="section-header">${name}<i class="header-icon ${icon}"></i></div>
        <div class="section-list">
            ${data.map(dateEntry).join('')}
        </div>
    </div>
    `
}

function descEntry(data) {
    return `
    <div class="desc-entry">
        <div class="desc-entry-title">${data.title}</div>
        <span class="desc-entry-date">${data.date}</span>
        <div class="desc-entry-text">${data.text}</div>
    </div>
    `
}

function makeDescriptionSection(data, name, icon) {
    return `
    <div class="section ${name.toLowerCase()}" data-packed>
        <div class="section-header">${name}<i class="header-icon ${icon}"></i></div>
        <div class="section-list">
            ${data.map(descEntry).join('')}
        </div>
    </div>
    `
}

function skill(text) {
    return `<span class="skill">${text}</span>`
}

function makeSkills(data, name, icon) {
    return `
    <div class="section skills" data-packed>
        <div class="section-header">${name}<i class="header-icon ${icon}"></i></div>
        <div class="skill-container">
            ${data.map(skill).join('')}
        </div>
    </div>
    `
}

function project(data) {
    const url = data.type === "github"
        ? "https://github.com/lyneca/" + data.url
        : "https://" + data.url;

    return `
    <div class="project">
        <div class="project-url"><a class="link ${data.type}" href="${url}">${data.url}</a></div>
        <div class="project-desc">${data.desc}</div>
    </div>
    `
}

function makeProjects(data, name, icon) {
    return `
    <div class="section projects" data-packed>
        <div class="section-header">${name}<i class="header-icon ${icon}"></i></div>
        <div class="section-list">
            ${data.map(project).join('')}
        </div>
    </div>
    `
}

function compile(json) {
    return HEADER + `
    <div class="root">
        ${makeHeader(json.personal)}
        <div class="bottom-section">
        <div class="container">
            ${makeDateSection(json.university, "University", "fas fa-university")}
            ${makeSkills(json.skills, "Skills", "fas fa-tools")}
            ${makeDescriptionSection(json.experience, "Experience", "fas fa-child")}
            ${makeDateSection(json.achievements, "Achievements", "fas fa-trophy")}
            ${makeProjects(json.projects, "Projects", "fas fa-code")}
        </div>
        </div>
    </div>
    ` + FOOTER;
}

const json = JSON.parse(fs.readFileSync('data.json'))

console.log(compile(json))
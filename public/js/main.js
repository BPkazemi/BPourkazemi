$(document).ready(function() {
    init();
});

function init() {
    loadPage(window.location.hash);

    setMenuClickListeners();
    setHashListener();
}

function loadPage( hash ) {
    console.log("loadPage called");
    switch (hash) {
        case "#projects":
            setSelected("projects");
            ajax("projects");
            break;
        case "#about":
            setSelected("about");
            ajax("about");
            break;
        case "#resume":
            setSelected("resume");
            ajax("resume");
            break;
        default:
            setSelected("projects");
            ajax("projects");
            break;
    }
}

function setMenuClickListeners() {
    var about = document.getElementsByClassName('about')[0],
        projects = document.getElementsByClassName('projects')[0],
        resume = document.getElementsByClassName('resume')[0];

    about.addEventListener("click", clickHandler("about"), false);
    projects.addEventListener("click", clickHandler("projects"), false);
    resume.addEventListener("click", clickHandler("resume"), false);
}

function setHashListener() {
    if ("onhashchange" in window) {
        window.onhashchange = function() {
            console.log("new Hash: " + window.location.hash);
            loadPage(window.location.hash);
        }
    }
    else { // Event not supported
        var storedHash = window.location.hash;
        window.setInterval(function() {
            if (window.location.hash != storedHash) {
                storedHash = window.location.hash;
                loadPage(storedHash);
            }
        }, 100);
    }
}

function ajax( route ) {
    $.ajax({
        url: "/api/" + route,
        success: function(response) {
            updateContent(route, response);
        }
    });
}

function clickHandler( route ) {
    switch (route) {
        case "about":
            return function() { window.location.hash = "about"; }   
            break;
        case "projects":
            return function() { window.location.hash = "projects"; }
            break;
        case "resume":
            return function() { window.location.hash = "resume"; }
            break;
        default:
            return function() { window.location.hash = "projects"; }
            break;
    }
}

function updateContent( page_type, response ) {
    var content = document.getElementsByClassName("content")[0],
        data = "",
        html = "";

    switch (page_type) {
        case "about":
            data = response.about;
            html = "<p>" + data + "</p>";
            content.innerHTML = html;
            break;
        case "projects":
            data = response.projects;
            var curProject, title, screenshotSrc, desc;
            for (var i = 0; i < data.length; i++) {
                curProject = data[i];
                title = curProject.title;
                screenshotSrc = curProject.screenshot_src;
                desc = curProject.desc;

                html += 
                    '<div class="project">' +
                        '<div class="project-title">' +
                            '<h1>' + title + '</h1>' +
                        '</div>' +
                        '<div class="project-screenshot">' +
                            '<img src="' + screenshotSrc + '"width="500" height="250">' +
                        '</div>' +
                        '<div class="project-desc">' +
                            '<p>' + desc + '</p>' +
                        '</div>' +
                    '</div>'
            }

            content.innerHTML = html;
            break;
        case "resume":
            data = response.resume;
            html = '<p>' + data + '</p>';
            content.innerHTML = html;
            break;
        default:
            break;
    }
}

function setSelected( selectThisClass ) {
    var menuOptions = ["projects", "resume", "about"],
        curClass,
        curOption;

    for( var i = 0 ; i < menuOptions.length; i++) {
        curClass = menuOptions[i];
        curOption = document.getElementsByClassName(curClass)[0];

        if(curClass == selectThisClass) {
            curOption.className = curClass + " selected";
        } else {
            curOption.className = curClass;
        }
    }
}


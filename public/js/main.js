$(document).ready(function() {
    init();
});

function init() {
    loadPage(window.location.hash);

    setMenuClickListeners();
    setHashListener();
}

function loadPage( hash ) {
    switch (hash) {
        case "#projects":
            setSelected("projects");
            ajax("projects");
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
    var projects = document.getElementsByClassName('projects')[0],
        resume = document.getElementsByClassName('resume')[0];

    projects.addEventListener("click", clickHandler("projects"), false);
    resume.addEventListener("click", clickHandler("resume"), false);
}

function setHashListener() {
    if ("onhashchange" in window) {
        window.onhashchange = function() {
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
        case "projects":
            data = response.projects;
            var curProject, title, screenshotSrc, desc, link, type, width;

            for (var i = 0; i < data.length; i++) {
                curProject = data[i];
                title = curProject.title;
                screenshotSrc = curProject.screenshot_src;
                desc = curProject.desc,
                link = curProject.link || "",
                type = curProject.type,
                width = 600; // Default screenshot widths for web projects

                // Looks better 
                if (type == "mobile") {
                    width = 300;
                } 

                html += createCard({
                    title: title,
                    link: link,
                    screenshotSrc: screenshotSrc,
                    width: width,
                    desc: desc
                });
            }

            content.innerHTML = html;
            break;
        case "resume":
            data = response.resume.resume_src;
            html = createCard({
                title: "Resume",
                link: data,
                screenshotSrc: "assets/images/Resume.png",
                width: 600,
                desc: ''
            });
            content.innerHTML = html;
            break;
        default:
            break;
    }
}

function setSelected( selectThisClass ) {
    var menuOptions = ["projects", "resume"],
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

function createCard( opts ) {
    var title = opts.title,
        link = opts.link,
        screenshotSrc = opts.screenshotSrc,
        desc = opts.desc,
        width = opts.width,
        html = "";

    if (link) {
        html += 
            '<div class="card">' +
                '<div class="card-title">' +
                    '<h1><a href="' + link + '">' + title + '</a></h1>' +
                '</div>' +
                '<div class="card-screenshot">' +
                    '<a href="' + link + '">' + '<img src="' + screenshotSrc + '" width="' + width + '"></a>' +
                '</div>' +
                '<div class="card-desc">' +
                    '<p>' + desc + '</p>' +
                '</div>' +
            '</div>'
    } else {
        // If no link is available, don't add an <a> tag
        html += 
            '<div class="card">' +
                '<div class="card-title">' +
                    '<h1>' + title + '</h1>' +
                '</div>' +
                '<div class="card-screenshot">' +
                    '<img src="' + screenshotSrc + '" width="' + width + '">' +
                '</div>' +
                '<div class="card-desc">' +
                    '<p>' + desc + '</p>' +
                '</div>' +
            '</div>'
    }

    return html;
}


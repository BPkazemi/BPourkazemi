$(document).ready(function() {
    init();
});

function init () {
    loadPage(window.location.hash);

    setMenuClickListeners();
    setHashListener();
}

function loadPage (hash) {
    switch (hash) {
        case "#projects":
            setSelected("projects");
            ajax("projects");
            break;
        case "#bio":
            setSelected("bio");
            ajax("bio");
            break;
        default:
            setSelected("projects");
            ajax("projects");
            break;
    }
}

function setMenuClickListeners () {
    var projects = document.getElementsByClassName('projects')[0],
        bio = document.getElementsByClassName('bio')[0];

    projects.addEventListener("click", clickHandler("projects"), false);
    bio.addEventListener("click", clickHandler("bio"), false);
}

function setHashListener () {
    if ("onhashchange" in window) {
        window.onhashchange = function() {
            loadPage(window.location.hash);
        };
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

function clickHandler (route) {
    switch (route) {
        case "projects":
            return function() { window.location.hash = "projects"; };
        case "bio":
            return function() { window.location.hash = "bio"; };
        default:
            return function() { window.location.hash = "projects"; };
    }
}

function updateContent( page_type, response ) {
    var content = document.getElementsByClassName("content")[0],
        data = "",
        html = "";

    switch (page_type) {
        case "projects":
            data = response.projects;
            var curProject, title, imgSrc, desc, link, type, width;

            for (var i = 0; i < data.length; i++) {
                curProject = data[i];
                title = curProject.title;
                imgSrc = curProject.screenshot_src;
                desc = curProject.desc;
                link = curProject.link || "";
                type = curProject.type;
                width = 600; // Default screenshot widths for web projects

                // Looks better 
                if (type == "mobile") {
                    width = 300;
                } 

                html += createCard({
                    title: title,
                    link: link,
                    imgSrc: imgSrc,
                    width: width,
                    desc: desc
                });
            }

            content.innerHTML = html;
            break;
        case "bio":
            data = response.bio;
            html = createCard({
                title: "Bio",
                imgSrc: 'assets/images/' + data.img_src,
                width: 500,
                desc: data.desc
            });
            content.innerHTML = html;
            break;
        default:
            break;
    }
}

function setSelected( selectThisClass ) {
    var menuOptions = ["projects", "bio"],
        curClass,
        curOption;

    for( var i = 0 ; i < menuOptions.length; i++) {
        curClass = menuOptions[i];
        curOption = document.getElementsByClassName(curClass)[0];

        curOption.className = (curClass == selectThisClass) ?
            curClass : curClass + ' selected';
    }
}

function createCard( opts ) {
    var title = opts.title,
        link = opts.link,
        imgSrc = opts.imgSrc,
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
                    '<a href="' + link + '">' + '<img src="' + imgSrc + '" width="' + width + '"></a>' +
                '</div>' +
                '<div class="card-desc">' +
                    '<p>' + desc + '</p>' +
                '</div>' +
            '</div>';
    } else {
        // If no link is available, don't add an <a> tag
        html += 
            '<div class="card">' +
                '<div class="card-title">' +
                    '<h1>' + title + '</h1>' +
                '</div>' +
                '<div class="card-screenshot">' +
                    '<img src="' + imgSrc + '" width="' + width + '">' +
                '</div>' +
                '<div class="card-desc">' +
                    '<p>' + desc + '</p>' +
                '</div>' +
            '</div>';
    }

    return html;
}


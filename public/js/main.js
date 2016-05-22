const TABS = ['projects', 'bio'];

$(document).ready(function() {
    init();
});

function init () {
    loadPage(window.location.hash);

    setMenuClickListeners();
    setHashListener();
}

function loadPage (hash) {
    var hashless = hash.substring(1);
    hashless = TABS.indexOf(hashless) > -1 ? hashless : 'projects';
    selectTab(hashless);
    ajax(hashless);
}

function setMenuClickListeners () {
    TABS.forEach(function(tab) {
        let dt = document.querySelector(`dt.${tab}`);
        dt.addEventListener("click", () => window.location.hash = tab, false);
    });
}

function setHashListener () {
    if ("onhashchange" in window) {
        window.onhashchange = function() {
            loadPage(window.location.hash);
        };
    }
}

function ajax (route) {
    $.ajax({
        url: "/api/" + route,
        success: function(response) {
            updateContent(route, response);
        }
    });
}

function updateContent (page_type, response) {
    var content = document.querySelector("div.content");

    switch (page_type) {
        case "projects":
            var data = response.projects;
            var curProject, title, imgSrc, desc, link, type, width;

            var html = '';
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
            var data = response.bio;
            var html = createCard({
                title: "",
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

function selectTab (tab) {
    var dl = document.querySelector('dl.tabs');

    [].slice.call(dl.children).forEach(function(child) {
        child.className = (child.className.indexOf(tab) > -1) ?
            child.className + ' selected' :
            child.className.replace(new RegExp('selected|\\s', 'g'), '');
    });
}

function createCard (opts) {
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


var hasInsertUtil = {};


chrome.tabs.onUpdated.addListener(function (id) {
    hasInsertUtil[id] = false;
});

$(document).ready(function (e) {

    var resources = localStorage.getItem('resources') || "[]";
    resources = JSON.parse(resources);

    var list = $("#resourcelist");

    for (var i in resources) {
        $("<li></li>")
            .attr("rtype", resources[i]['type'])
            .text(resources[i]['name'])
            .attr('rurl', resources[i]['url'])
            .appendTo(list);
    }

    $("li").on("click", function (evt) {
        var rtype = $(this).attr("rtype");
        var rurl = $(this).attr("rurl");

        chrome.tabs.getSelected(null, function (tab) {
            var tabId = tab.id;
            if (hasInsertUtil[tabId]) {
                var code = rtype == 'script' ? "loadScript" : "loadCSS";
                code += "('" + rurl + "')";
                chrome.tabs.executeScript(tabId, {
                    code: code
                });
                return;
            }

            chrome.tabs.executeScript(tabId, {
                file: "js/Util.js"
            }, function (e) {
                hasInsertUtil[tabId] = true;

                var code = rtype == 'script' ? "loadScript" : "loadCSS";
                code += "('" + rurl + "')";
                chrome.tabs.executeScript(tabId, {
                    code: code
                });
            });
        });
    });
});
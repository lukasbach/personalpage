
$(document).ready(function() {
    var searchinput = $(".websearch-input");
    var webcontents = false;

    function filter(searchString) {
        var results = [];

        $.each(webcontents, function(i, entity) {
            var match = false;
            $.each(searchString.split(" "), function(j, query) {
                if (query.startsWith("#")) {
                    if (entity.tags.includes(query.substring(1))) {
                        match = true;
                    }
                    return false;
                }

                if (query.startsWith("cat:")) {
                    if (entity.category.includes(query.substring(4))) {
                        match = true;
                    }
                    return false;
                }

                if ((entity.title + entity.category + entity.tags + entity.date).toLowerCase().includes(query.toLowerCase())) {
                    match = true;
                    return false;
                }
            });

            if (match) {
                results.push(entity);
            }
        });

        return results;
    }

    function search(searchString) {
        var results = filter(searchString);

        $(".content").html("");

        $.each(results, function(i, result) {
            var html = $("<a><div class='blogentry-preview'><div class='blogentry-preview-head'>" +result.title+ "</div><div class='blogentry-preview-description'>" +result.excerpt+ "</div></div></a>");

            html.attr("href", result.url);
            //html.find(".blogentry-preview").html(result.title);
            //html.find(".blogentry-description").html(result.excerpt);

            $(".content").append(html);
        });
    }

    searchinput.on("change paste keyup", function() {
        if (!webcontents) {
            $.ajax({
                url: "/search.json",
                dataType: "json",
                error: function(e) {
                    alert("An error happened during grabbing search data.");
                    console.error(e);
                },
                success: function(data) {
                    webcontents = data;
                    search(searchinput.val());
                }
            });
        } else {
            search(searchinput.val());
        }
    });

});

function websearch(query) {
    $(".websearch-input").val(query).trigger('change');
}
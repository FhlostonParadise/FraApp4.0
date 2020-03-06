/*! FeedEk jQuery RSS/ATOM Feed Plugin v3.1.1
* https://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL */

(function ($) {
	$.fn.FeedEk = function (opt) {
		var def = $.extend({
			MaxCount: 6,
			ShowDesc: false,
			ShowPubDate: false,
			DescCharacterLimit: 0,
			TitleLinkTarget: "_blank",
			DateFormat: "",
			DateFormatLang: "en"
		}, opt);

		var id = $(this).attr("id"), s = "", dt;
		$("#" + id).empty();
		if (def.FeedUrl == undefined) return;
		$("#" + id).append('<img src="loader.gif" />');
		$.ajax({
			url: "https://feed.jquery-plugins.net/load?url=" + encodeURIComponent(def.FeedUrl) + "&maxCount=" + def.MaxCount + "&dateCulture=" + def.DateFormatLang + "&dateFormat=" + def.DateFormat,
			dataType: "json",
			success: function (result) {
				$("#" + id).empty();
				if (result.data == null)
					return;

				$.each(result.data, function (e, itm) {
					s += '<div class="itemTitle column is-2"><div class="card"><div class="card-content text-is-7"><a href="' + itm.link + '" target="' + def.TitleLinkTarget + '" >' + itm.title + '</a></div></div></div>';

					if (def.ShowPubDate) {
						dt = new Date(itm.publishDate);
						s += '<div class="itemDate">';
						if ($.trim(def.DateFormat).length > 0) {
							s += itm.publishDateFormatted;
						}
						else {
							s += dt.toLocaleDateString();
						}
						s += '</div>';
					}
					if (def.ShowDesc) {
						s += '<div class="itemContent">';
						if (def.DescCharacterLimit > 0 && itm.description.length > def.DescCharacterLimit) {
							s += itm.description.substring(0, def.DescCharacterLimit) + '...';
						}
						else {
							s += itm.description;
						}
						s += '</div>';
					}
				});

				$("#" + id).append('<div class="columns feedEkList">' + s + '</div>');
			}
		});
	};
})(jQuery);

$(document).ready(function(){function s(){var s=i[this.pathname];return s?(window.open(this.href,"_blank","scrollbars=yes,resizable=yes,width="+s[0]+",height="+s[1]),!1):!0}function e(e){$("a",e).filter(function(){return this.hostname===r}).click(s)}function t(s){var e={};if(!s)return e;for(var t=s.split("&"),a=0;a<t.length;a++){var n=t[a].split("=");if(2==n.length){var r=decodeURIComponent(n[0]),i=decodeURIComponent(n[1]);"[]"===r.substr(r.length-2)?(e[r]||(e[r]=[]),e[r].push(i)):e[r]=i}}return e}function a(s,r,i,o){function c(n){$(s).html(n).removeClass("dsv-macro-loading"),e(s),$('a[href^="?"]',s).click(function(){return a(s,r,i,t(this.search.substr(1))),!1}),$("form",s).submit(function(){return a(s,r,i,t($(this).serialize())),!1})}var u=null,d={lang:l},h=n,f=!1;switch(r){case"dsv_staff":case"dsv_staff_new":u="staff.php",f=!0;break;case"all_course_units":case"course_segments":u="course_segments.php",f=!0;break;case"search_publications":u="publications.php";break;case"publications":u="publications.php",d.included=1,d.researchArea=i.area.split(",")}f&&!window.footable&&($('<link rel="stylesheet" type="text/css" href="'+h+'css/footable.css" />').appendTo("head"),$.getScript(h+"js/footable.js")),o&&$.extend(d,o),u?(qs=$.param(d),""!==qs&&(qs="&"+qs),$(s).addClass("dsv-macro-loading"),$.get(h+u+"?"+qs,c)):s.text("(Unknown macro.)")}var n="//www2.dsv.su.se/daisyweb/",r="daisy.dsv.su.se",i={"/servlet/Momentinfo":[640,450],"/servlet/anstalld.Anstalldinfo":[500,250],"/anstalld/anstalldinfo.jspa":[500,250],"/servlet/schema.moment.Momentschema":[500,500],"/servlet/student.Studentinfo":[400,300],"/publikation/publikationInfo.jspa":[500,500]},o="//www2.dsv.su.se/images/throbber.gif",l=$("html").attr("lang");$(".dsv-macro").each(function(){var s=/\[\[([^\]]+)\]\]/.exec($(this).text());if(s){var e=s[1];if(s=/^(\S+)\s*/.exec(e)){for(var t=s[1],n={},r=/(\S+)=("[^"]*"|[^" ]+)/g;null!==(s=r.exec(e));)n[s[1]]=s[2];var i=$('<img class="dsv-throbber"/>').attr("src",o);$(this).empty().removeClass("dsv-macro").append(i),a(this,t,n)}}}),e(document)});

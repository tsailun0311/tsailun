var oldURL = document.referrer;
var url = location.href;
if (url.indexOf('?') != -1) {
  var ary1 = url.split('?');
  var ary2 = ary1[1].split('&');
  var ary3 = ary2[0].split('=');
  var id = ary3[1];
}
document.write('<hr width="700" class="index1" /><div align="center"><p>&nbsp;</p><p class="indexlist">')
if (id == "map") {
  document.write('<a href="index.html"><span class="tpye2">回首頁</span></a>');
} else {
  document.write('<a href="' + oldURL + '#' + id + '"><span class="tpye2">回上一頁</span></a>');
}
document.write('</p><p>&nbsp;</p></div><p>&nbsp;</p>');

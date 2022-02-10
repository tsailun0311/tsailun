var url = location.href;
if (url.indexOf('?') != -1) {
  var ary1 = url.split('?');
  var now = ary1[0];
}
document.write( /* image map by http://www.image-map.net/ */
  '<img src="./DemonSlayer/headimg.jfif" usemap="#image-map" >' +
  '<map name="image-map">' +
  '<area target="" alt="嘴平伊之助" title="嘴平伊之助" href="https://www.tsailun.tk/04Inosuke.html?id=map"' +
  'coords="76,8,113,13,140,27,125,30" shape="poly">' +
  '<area target="" alt="嘴平伊之助" title="嘴平伊之助" href="https://www.tsailun.tk/04Inosuke.html?id=map"' +
  'coords="87,186,56,214,28,237,31,258,28,271,35,267,40,275,40,258,63,237,64,246,32,296,29,322,43,333,64,358,120,382,133,407,152,421,253,420,255,361,265,356,272,340,256,322,242,325,240,310,230,310,232,297,227,286,233,264,223,254,232,245,216,243,207,227,213,208,176,226,155,228,143,215,134,234,107,264,103,278,85,262,88,238,108,228,107,204" shape="poly">' +
  '<area target="" alt="嘴平伊之助" title="嘴平伊之助" href="https://www.tsailun.tk/04Inosuke.html?id=map"' +
  'coords="324,229,343,190,332,172,330,154,273,117,257,122,254,90,276,100,363,74,389,82,292,112,361,151,410,194,411,208,395,230,390,219,395,207,376,191,350,270,343,240" shape="poly">' +
  '<area target="" alt="我妻善逸" title="我妻善逸" href="https://www.tsailun.tk/03Zenitsu.html?id=map"' +
  'coords="283,219,248,235,228,285,233,305,244,322,260,322,272,339,256,383,262,419,314,420,313,377,345,351,352,326,374,323,389,298,343,296,349,276,344,243,319,225" shape="poly">' +
  '<area target="" alt="竈門禰豆子" title="竈門禰豆子" href="https://www.tsailun.tk/02Nezuko.html?id=map"' +
  'coords="463,184,419,202,400,241,398,262,380,279,388,300,378,320,358,326,348,337,344,354,317,370,312,389,312,420,500,420,498,374,510,350,507,310,516,254,504,214,484,188" shape="poly">' +
  '<area target="" alt="竈門炭治郎" title="竈門炭治郎" href="https://www.tsailun.tk/01Tanjirou.html?id=map"' +
  'coords="543,106,539,130,524,155,529,184,516,186,534,198,540,205,533,214,548,218,545,230,527,246,514,267,507,318,510,348,500,370,500,420,695,421,701,386,692,361,688,338,696,305,711,242,696,250,679,301,669,273,638,247,635,228,644,235,651,231,654,211,637,207,640,190,650,197,661,171,657,142,641,152,632,142,646,142,629,128,632,113,619,124,609,113,600,116,599,98,588,119,575,119,586,109,558,119" shape="poly">' +
  '</map>' +
  '<div id="tabs10">' +
  '<ul>' +
  '<li><a href="https://www.tsailun.tk/index.html" title="首頁"><span class="indexlist">首頁</span></a></li>' +
  '<li><a href="https://www.tsailun.tk/man.html" title="角色介紹"><span class="indexlist">角色介紹</span></a></li>' +
  '<li><a href="https://www.tsailun.tk/no1.html" title="第一季"><span class="indexlist">第一季</span></a></li>' +
  '<li><a href="https://www.tsailun.tk/train.html" title="無限列車"><span class="indexlist">無限列車</span></a></li>' +
  '<li><a href="https://www.tsailun.tk/no2.html" title="第二季"><span class="indexlist">第二季</span></a></li>'
);
if(now=="https://www.tsailun.tk/man.html"||url=="https://www.tsailun.tk/man.html"){
 document.write('<li><span class="indexlist">搜尋：<input id="search" type="text" placeholder="輸入角色名"></span></li>');

}
document.write(
  '</ul></div>'
);

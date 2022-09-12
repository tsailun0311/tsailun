if (!i2yesCounter) {
  var i2yesCounter = {
    render: function Get(g) {
      var width = (g.s) ? 'width=' + g.s : '';
      var Tar = 'target=_blank';
      var f = '<a ' + Tar + ' href="http://' + g.y + '.i2yes.com/">';
      f += '<img ' + width + ' border=0 src="http://' + g.y + '.i2yes.com/' + g.y + '.php?p=' + g.v + '_' + g.p + '&v=' + g.v + '&d=' + g.d + '&r=' + g.r + '&t=' + g.t + '&n=' + g.n + '" title="FREE Counter / i2yes.com" alt="FREE Counter / i2yes.com">';
      f += '</a>';
      return f;
    }
  };
};
document.write('<p><span class="indexlist">　觀光人數&nbsp;&nbsp;');
document.write(i2yesCounter.render({
  y: 'counter',
  p: 'tsailuncounter', //改成您專有的計數器名稱,注意別跟別人一樣
  v: 'www.tsailun.tk', //您的網址,不對的話無法使用,也可以用沒有 www 的網址,如 i2yes.com
  d: 4, //數字位數
  r: 0, //1=不接受Reload,0=Reload會+1
  t: 'font148', //字型 font001 - font156 可用
  s: 45, //指定大小,只能輸入數字例;100, 0為不指定尺寸(原寸)
  n: 345 //指定起始的數字
}));
document.write('</span></p><p>&nbsp;</p>');

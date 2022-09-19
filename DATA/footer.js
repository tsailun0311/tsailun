if (!i2yesCounter) {
  var i2yesCounter = {
    render: function Get(g) {
      var width = (g.s) ? 'width=' + g.s : '';
      var f = '<img ' + width + ' border=0 src="http://' + g.y + '.i2yes.com/' + g.y + '.php?p=' + g.v + '_' + g.p + '&v=' + g.v + '&d=' + g.d + '&r=' + g.r + '&t=' + g.t + '&n=' + g.n + '" title="FREE Counter / i2yes.com" alt="FREE Counter / i2yes.com">';
      return f;
    }//https://counter.i2yes.com/counter.php?p=www.tsailun.tk_tsailuncounter&v=www.tsailun.tk&d=4&r=0&t=font148&n=345
  };
};
document.write('<p><span class="indexlist">　觀光人數&nbsp;&nbsp;');
document.write(i2yesCounter.render({
  y: 'counter',
  p: 'tsailuncounter', //專有的計數器名稱
  v: 'www.tsailun.tk', //網址
  d: 4, //數字位數
  r: 0, //1=不Reload,0=Reload會+1
  t: 'font148', //字型font001-font156
  s: 45, //大小,0為不指定尺寸
  n: 345 //起始的數字
}));
document.write('</span></p><p>&nbsp;</p>');

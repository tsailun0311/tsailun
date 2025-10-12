# Animcubejs

## 1. mousemove、mousedown

刪掉

```js
document.addEventListener("touchmove", mousemove, { passive: false });
document.addEventListener("mousemove", mousemove);
```

加入

```js
document.addEventListener("touchstart", mousedown, { passive: false }),
document.addEventListener("touchend", mouseup, { passive: false }),
```

以及刪掉 mousemove 函式

更改 mousedown 函式修正漢堡選單無法點擊的問題

```js
a < r ||
a > r + width / dpr ||
i < o + (height - progressHeight) / dpr ||
i > o + (height + buttonHeight) / dpr ||
```

## 2.selectButton 7 個分格變 4 個

更改

```js
for (var r = 0, o = 0; o < 4; o++) {
  var a = (width - r) / (4 - o);
  if (e >= r && e < r + a && t >= height && t < height + buttonHeight) return o;
  r += a;
}
```

## 3.paint 改變 slider 造型

更改

```js
// draw progress bar
if (progressHeight > 0) {
  graphics.lineWidth = lineWidth;
  graphics.strokeStyle = "#526d98";

  var progress =
    ((width - 2) * realMovePos(move[curMove], movePos)) /
    realMoveLength(move[curMove]);

  // trough
  graphics.fillStyle = sliderBgColor;
  graphics.fillRect(
    dph,
    height - progressHeight - dph,
    width - dpr,
    progressHeight - dpr
  );

  // slider
  graphics.fillStyle = sliderColor;
  graphics.fillRect(
    dph,
    height - progressHeight - dph,
    progress,
    progressHeight - dpr
  );

  // border
  graphics.beginPath();
  graphics.roundRect(
    dph,
    height - progressHeight - dph,
    width - dpr,
    progressHeight - dpr,
    2 * dpr
  );
  graphics.stroke();
}
```

## 4.drawButtonsFunc 7 個按鈕變 4 個並且改造型

更改

```js
if (buttonBar == 1) {
  // full buttonbar
  var buttonX = 0;
  for (var i = 0; i < 4; i++) {
    var buttonWidth = Math.floor((width - buttonX) / (4 - i));
    if (buttonPressed == i) g.fillStyle = darker(buttonBgColor);
    else g.fillStyle = buttonBgColor;
    g.lineWidth = lineWidth;
    g.strokeStyle = "#526d98";
    g.beginPath();
    g.roundRect(
      buttonX + dph * (1 + i),
      height + dpr,
      buttonWidth - dph * 5,
      buttonHeight - dph * 3,
      dpr * 5
    );
    g.fill();
    g.stroke();
    g.strokeStyle = "black";
    drawButton(
      g,
      i,
      buttonX + buttonWidth / 2,
      height + buttonHeight / 2 - adj
    );
    buttonX += buttonWidth;
  }
  drawButtons = false;
  return;
}
```

## 5.button 更改鏡像動作為播放

更改

```js
3 == buttonPressed
? animating
? stopAnimation()
: startAnimation(0)
```

## 6.buttonAction 更改動作定義

更改

```js
var buttonAction = [-1, 3, 2, -1, 0, 2, 4, -1];
```

## 7.drawButton 更改按鈕造型

更改

```js
function drawButton(g, i, x, y) {
  x = Math.floor(x);
  y = Math.floor(y);
  switch (i) {
    case 0: // rewind
      drawArrow2(g, x - ds[1], y + ds[1], -1);
      drawArrow2(g, x + ds[5], y + ds[1], -1);
      break;
    case 1: // reverse step
      drawArrow2(g, x + ds[2], y + ds[1], -1);
      break;
    case 2: // reverse play
      drawArrow2(g, x - ds[3], y + ds[1], 1);
      break;
    case 3: // stop / mirror
      if (animating) drawRect(g, x - ds[4], y - ds[3], ds[7], ds[7]);
      else {
        drawArrow1(g, x - ds[2], y + ds[1], 1);
      }
      break;
  }
}
function drawArrow(g, x, y, dir) {
  var d5 = 5 * dpr;
  var fillX = [];
  var fillY = [];
  fillX[0] = x;
  fillX[1] = x + 6 * dpr * dir;
  fillX[2] = x;
  fillY[0] = y - d5;
  fillY[1] = y;
  fillY[2] = y + d5;
  g.beginPath();
  g.moveTo(fillX[0] + dph, fillY[0] + dph);
  for (var i = 1; i < 3; i++) g.lineTo(fillX[i] + dph, fillY[i] + dph);
}
function drawArrow1(g, x, y, dir) {
  drawArrow(g, x, y, dir);
  g.closePath();
  g.fillStyle = "black";
  g.fill();
}
function drawArrow2(g, x, y, dir) {
  drawArrow(g, x, y, dir);
  g.strokeStyle = "black";
  g.lineWidth = lineWidth;
  g.stroke();
}
function drawRect(g, x, y, width, height) {
  g.lineWidth = lineWidth;
  g.beginPath();
  g.rect(x + dph, y + dph, width, height);
  g.fillStyle = "black";
  g.fill();
}
```

## 8.init 更改顏色

更改

```js
colors[10] = rgbToHex(255, 255, 255); // W - white
colors[11] = "yellow"; // Y - yellow
colors[12] = "orange"; // O - orange
colors[13] = "red"; // R - red
colors[14] = "#0d0"; // G - green
colors[15] = "#07f"; // B - blue
```

## 9.darker 更改 highlight

更改

```js
function darker(s) {
  if (s.substring(0, 1) != "#") s = colorToHex(s);
  var r = parseInt(s.substring(1, 3), 16);
  var g = parseInt(s.substring(3, 5), 16);
  var b = parseInt(s.substring(5, 7), 16);
  r = Math.floor(r * 0.8);
  g = Math.floor(g * 0.8);
  b = Math.floor(b * 0.8);
  return rgbToHex(r, g, b);
}
```

## 10.paint 更改公式粗體

更改

```js
graphics.font = textHeight + "px helvetica";
```

## 11.更改基本參數

```js
buttonbar=1
buttonheight=22
borderwidth=8
bgcolor=e7e5e3
butbgcolor=b7ccdd
slidercolor=526d98
troughcolor=b7ccdd
scale=1
wca=1
hint=3
movetext=5
fonttype=0
colorscheme=ywrobg
initrevmove=#
position=lluuu
align=0
textsize=15
yz=1
```

## 12.drawMoveTextFunc 更改當前步驟圓角

```js
if (w2 > 0) {
  g.fillStyle = hlColor;
  g.lineWidth = 2;
  g.strokeStyle = "black";
  g.beginPath();
  if (utextHeight <= 14)
    // make rectangle taller for smaller fonts
    g.roundRect(
      x + w1 - 1,
      height - progressHeight - textHeight - Math.floor(dpr * 4),
      w2 + 2,
      textHeight + Math.floor(dpr * 3),
      dpr * 3
    );
  else
    g.roundRect(
      x + w1 - 1,
      height - progressHeight - textHeight - Math.floor(dpr * 2),
      w2 + 2,
      textHeight + Math.floor(dpr),
      dpr * 3
    );
  g.fill();
}
```

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

## 3.drawButtonsFunc 7 個按鈕變 4 個

更改

```js
else {
      for (var r = 0, o = 0; o < 4; o++) {
        var a = Math.floor((width - r) / (4 - o));
        (e.fillStyle =
          buttonPressed == o ? darker(buttonBgColor) : buttonBgColor),
          e.fillRect(r, height, a, buttonHeight),
          (e.lineWidth = lineWidth),
          (e.strokeStyle = buttonBorderColor),
          e.beginPath(),
          0 == o
            ? e.rect(r + dph, height - dph, a - dpr, buttonHeight)
            : e.rect(r - dph, height - dph, a, buttonHeight),
          e.stroke(),
          (e.strokeStyle = "black"),
          drawButton(e, o, r + a / 2, height + buttonHeight / 2 - t),
          (r += a);
      }
      drawButtons = !1;
    }
```

## 4.button 更改鏡像動作為播放

更改

```js
3 == buttonPressed
? animating
? stopAnimation()
: startAnimation(0)
```

## 5.buttonAction 更改動作定義

更改

```js
var buttonAction = [-1, 3, 2, -1, 0, 2, 4, -1];
```

## 6.drawButton 更改按鈕造型

更改

```js
      case 0:
        drawRect(e, t - ds[4], o - ds[3], ds[3], ds[6] + 1),
          drawArrow(e, t + ds[4], o, -1);
        break;
      case 1:
        drawRect(e, t + ds[1], o - ds[3], ds[3], ds[6] + 1),
          drawArrow(e, t - ds[1], o, -1);
        break;
      case 2:
        drawRect(e, t - ds[4], o - ds[3], ds[3], ds[6] + 1),
          drawArrow(e, t, o, 1);
        break;
      case 3:
        animating
          ? drawRect(e, t - ds[4], o - ds[3], ds[7], ds[7])
          : drawArrow(e, t - ds[2], o, 1);
        break;
```

## 6.init 更改顏色

更改

```js
colors[10] = rgbToHex(255, 255, 255); // W - white
colors[11] = "yellow"; // Y - yellow
colors[12] = "orange"; // O - orange
colors[13] = "red"; // R - red
colors[14] = "#0d0"; // G - green
colors[15] = "#07f"; // B - blue
```

## 7.darker 更改 highlight

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

## 8.paint 更改 公式粗體

更改

```js
graphics.font = textHeight + "px helvetica";
```

## 8.更改 基本參數

buttonbar=1
buttonheight=18
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

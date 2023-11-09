# Roofpig

Roofpig 是用於現代網絡的動畫、可編程和交互式魔方。它使用 WebGL 或純 Canvas（通過[three.js](http://threejs.org/))並用 CoffeeScript 編寫。您可以在<http://lar5.com/cube/>上看到它的使用情況。

## 1. 用法

您只需要一個文件和一個 Web 服務器。把[`roofpig_and_three.min.js`](https://raw.githubusercontent.com/larspetrus/Roofpig/master/roofpig_and_three.min.js)放在你的服務器上。在您的 HTML 中包含它和 jQuery 3.1.1：

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="roofpig_and_three.min.js"></script>
```

##### 靜態創作

要將立方體放在頁面上，`div`請使用`class='roofpig'`。配置一個`data-config`屬性。在 CSS 中設置高度和寬度。

```html
<div class="roofpig" data-config="alg=R U R' U R U2 R'"></div>
```

## 2.數據配置

在 `data-config`您將值設置為屬性。格式為 `property1=value|prop2=other value|prop99=you get the idea`.

```html
<div
  class="roofpig"
  style="width:140px; height:160px;"
  data-config="alg=L' U2 L U2 R U' L' U L+R'|solved=U-/ce|colors=F:b B:g U:r D:o R:w L:y"
></div>
```

有效屬性為： `alg`, `algdisplay`, `base`, `colored`, `colors`, `flags`, `hover`, `pov`, `setup`, `solved`, `speed`, `tweaks`. 我們將按邏輯順序討論它們。

### 2.1 算法 `alg`.

像這樣定義動畫算法：`alg=R F' x2 R D Lw'`。它處理標準立方體表示法等等。如果沒有給出 alg，則不會出現播放按鈕。

##### 標準符號

Roofpig 幾乎支持所有標準立方體表示法。層：**F, B, R, L, U, D. M, E, S. x, y, z. Fw, Bw, Rw, Lw, Uw, Dw, f, b, r, l, u, d**。轉：**2,',2'**。您還可以使用**², Z, 1**和**3**。

##### 旋轉符號

Roofpig 添加了“非破壞性”旋轉，在保持側面名稱的同時轉動立方體。您可以將它們視為移動“相機”。`R>`旋轉整個立方體。`R` 移動 `R>>`是雙轉， `R<`和`R<<`反方向也一樣。這意味著與`F>`與`B<`相同。

##### 組合符號

Roofpig 還允許組合動作。使用 **+**。側面安全切片移動：`M`=`L'+R`,`E`=`D'+U`,`S`=`F'+B`,`Rw`=`R>+L`,`Lw`=`L>+R`,和`Uw`=`U>+D`,等。整個立方體：`y`=`U+E'+D'`。組合不能並行完成的動作，比如`L+U`或`Rw+Fw2`，會讓可怕而有趣的事情發生。

### 2.2 立方體

在 Roofpig 中，您通常定義立方體在算法完成後的外觀。默認情況下，它是一個全彩色的立方體。您還可以使零件“已解決”（深灰色）或“忽略”（淺灰色），移動零件，重新著色貼紙並撒出 **X**-es.

但首先我們必須談談 Cubexps。

##### Cubexps

Cubexps 只做一件事：從 54 個立方體上定義一組貼紙。

最簡單的格式是列出片段。`UBL`是 UBL 角塊上的所有貼紙。`F`是 F 側中心貼紙。整個 U 層：`U UB UBL UBR UF UFL UFR UL UR`，`UbL`只有 UBL 上的 U 和 L 貼紙。所以`U Ub Ubl Ubr Uf Ufl Ufr Ul Ur`也就是 U 側。

- **F\*** 整層。`U*`是 U 層(`U UB UBL UBR UF UFL UFR UL UR`)，`UF*`是整個 U 層和 F 層。
- **F-** 不在這些層中的所有內容。`U-`是除了 U 層之外的一切。`ULB-`是不在 U、L 或 B 中的方塊`D DF DFR DR F FR R`（DFR 2x2x2 塊）。
- **f** 一整面。`u`是 U 面`U Ub Ubl Ubr Uf Ufl Ufr Ul Ur`。
- **\*** 整個立方體。
- **/** “的”的意思，所有表達式都可以按片段類型過濾。`c`=角，`e`=邊，`m`=中心。`U*/c`U 層中的角，或者`UBL UBR UFL UFR`。`u/me`是`U Ub Uf Ul Ur`。

##### `solved`和`colored`

主要參數是`solved`和`colored`Cubexps。`solved`貼紙將是深灰色。`colored`貼紙將具有正常顏色。任何不是`solved`或`colored`將是淺灰色的“忽略”。 `solved`勝過`colored`。

##### `setupmoves`和`tweaks`

當標記貼紙還不夠時，您需要使用這些。

- `setupmoves`對立方體應用一些動作。例如`setupmoves=L' B' R B L B' R' B`置換 3 個角。
- `tweaks`可以將任何貼紙設置為任何顏色！`tweaks=F:RF`將 FR 邊緣的兩個貼紙設置為 F 顏色。`tweaks=R:Ubl`僅將 UBL 角上的 U 貼紙設置為 R 顏色。除了顏色，你還可以在貼紙上貼 **X** es`tweaks=X:Ub x:Ul`。

### 2.3 其他參數

##### `hover`

“窺視”貼紙離立方體有多遠？`1`是近。`10`是遠。使用別名`none`,`near`和`far`(1,2 和 7.1)是最簡單的。

##### `speed`

轉一圈的毫秒數。默認為 400。雙轉需要 1.5 倍的時間。

##### `flags`

- `showalg` - 根據`algdisplay`設置顯示算法。
- `canvas` - 使用常規 2D 畫布而不是 WebGL 進行繪製。
- `startsolved` - 從求解的立方體開始，而不是應用反向算法。

##### `colors`

默認顏色為`colors=R:g L:b F:r B:o U:y D:w`。您還可以使用任何 CSS 顏色，如`pink`,`#77f`,`#3d3dff`等。

##### `pov`

默認情況下，視點位於 UFR 角上，U 位於頂部。或`Ufr`以這種表示法。要面對 DFL，F 在上面，請使用`pov=Fdl`。

##### `algdisplay`

- `fancy2s` - 雙重動作寫成 F² 而不是 F2。
- `rotations` - 顯示 Roofpig 旋轉（R>、U<<等）。默認關閉。
- `2p` - 顯示逆時針雙移動為 2'。默認只有 2 個。
- `Z` - 將逆時針雙移動顯示為 Z。

### 2.4 `base` - 共享配置。

您可以使用以 **"ROOFPIG_CONF"** 開頭的 Javascript 變量作為基礎。

```html
<script>
  ROOFPIG_CONF_F5 = "solved=U- | colors=F:B B:G U:R D:O R:W L:Y";
</script>
<div class="roofpig" data-config="base=F5|alg=L+R' U' R U L' U' R' U R"></div>
<div class="roofpig" data-config="base=F5|alg=R' U' R U L U' R' U R+L'"></div>
```

data-config 中的屬性會覆蓋那些從基礎“繼承”的屬性。如果您遇到這種複雜性，`base`可以參考另一個以形成精細的層次結構。

要在頁面之間共享，您可以將 **"ROOFPIG_CONF"** 放在一個通用的 .js 文件中。

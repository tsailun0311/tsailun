"use strict";
function AnimCube2(params) {
  var cubeDim = 2,
    config = [],
    bgColor,
    hlColor,
    textColor,
    buttonBgColor,
    sliderColor,
    sliderBgColor,
    buttonBorderColor,
    cubeColor,
    colors = [],
    cube = [],
    scube = [],
    initialCube = [],
    initialSCube = [],
    faceNormals = [
      [0, -1, 0],
      [0, 1, 0],
      [0, 0, -1],
      [0, 0, 1],
      [-1, 0, 0],
      [1, 0, 0],
    ],
    cornerCoords = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, -1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, 1, -1],
      [1, 1, 1],
      [-1, 1, 1],
    ],
    faceCorners = [
      [0, 1, 2, 3],
      [4, 7, 6, 5],
      [0, 4, 5, 1],
      [2, 6, 7, 3],
      [0, 3, 7, 4],
      [1, 5, 6, 2],
    ],
    oppositeCorners = [
      [0, 3, 2, 1],
      [0, 3, 2, 1],
      [3, 2, 1, 0],
      [3, 2, 1, 0],
      [0, 3, 2, 1],
      [0, 3, 2, 1],
    ],
    adjacentFaces = [
      [2, 5, 3, 4],
      [4, 3, 5, 2],
      [4, 1, 5, 0],
      [5, 1, 4, 0],
      [0, 3, 1, 2],
      [2, 1, 3, 0],
    ],
    twistedLayer,
    twistedMode,
    faceTwistDirs = [1, 1, -1, -1, -1, -1],
    eye = [0, 0, -1],
    eyeX = [1, 0, 0],
    eyeY = [],
    initialEye = [],
    initialEyeX = [],
    initialEyeY = [],
    currentAngle,
    originalAngle,
    speed,
    doubleSpeed,
    natural = !0,
    toTwist,
    interrupted,
    restarted,
    mirrored,
    editable,
    repeatable,
    clickProgress,
    twisting,
    spinning,
    animating,
    dragging,
    demo,
    persp,
    scale,
    align,
    hint,
    faceShift,
    hintHoriz,
    hintVert,
    hintBorder,
    moveCounter,
    move = [],
    demoMove = [],
    initialMove = [],
    initialReversedMove = [],
    curMove,
    movePos,
    moveDir,
    moveOne,
    moveAnimated,
    metric,
    infoText = [],
    curInfoText,
    buttonBar = 1,
    buttonHeight = 18,
    drawButtons = !0,
    pushed,
    buttonPressed = -1,
    progressHeight = 6,
    textHeight = 12,
    moveText,
    moveTextSpace,
    outlined = !0,
    snap = !1,
    yzAlt,
    superCube = !1,
    scrambleToggle = !1,
    scramble = 0,
    randMoveCount = 0,
    scw = 0,
    borderWidth = 8,
    rotateAllowed = 1,
    posFaceTransform = [3, 2, 0, 5, 1, 4],
    posFaceletTransform = [
      [2, 0, 3, 1],
      [1, 3, 0, 2],
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [2, 0, 3, 1],
      [0, 1, 2, 3],
    ];
  function onModuleLoad() {
    var e = getParameter("config");
    if (null == e) init();
    else {
      var t = location.pathname,
        r = t.substring(t.lastIndexOf("/") + 1);
      loadConfigFile(0 == r.length ? t + e : t.replace(r, e));
    }
  }
  function loadConfigFile(e) {
    var t = new XMLHttpRequest();
    (t.onreadystatechange = function () {
      4 == t.readyState &&
        (200 == t.status
          ? parseConfigFile(t.responseText)
          : console.log("Error loading config file: " + e),
        init());
    }),
      t.open("GET", e, !0),
      t.send();
  }
  function parseConfigFile(e) {
    for (var t = e.split("\n"), r = 0; r < t.length; r++) {
      var o = t[r].split("=");
      void 0 !== o[1] && (config[o[0]] = o[1].trim());
    }
  }
  function init() {
    (colors[0] = rgbToHex(255, 128, 64)),
      (colors[1] = rgbToHex(255, 0, 0)),
      (colors[2] = rgbToHex(0, 255, 0)),
      (colors[3] = rgbToHex(0, 0, 255)),
      (colors[4] = rgbToHex(153, 153, 153)),
      (colors[5] = rgbToHex(170, 170, 68)),
      (colors[6] = rgbToHex(187, 119, 68)),
      (colors[7] = rgbToHex(153, 68, 68)),
      (colors[8] = rgbToHex(68, 119, 68)),
      (colors[9] = rgbToHex(0, 68, 119)),
      (colors[10] = rgbToHex(255, 255, 255)),
      (colors[11] = rgbToHex(255, 255, 0)),
      (colors[12] = "orange"),
      (colors[13] = "red"),
      (colors[14] = "#0d0"),
      (colors[15] = "#07f"),
      (colors[16] = rgbToHex(176, 176, 176)),
      (colors[17] = rgbToHex(80, 80, 80)),
      (colors[18] = rgbToHex(255, 0, 255)),
      (colors[19] = rgbToHex(0, 255, 255)),
      (colors[20] = rgbToHex(255, 160, 192)),
      (colors[21] = rgbToHex(32, 255, 16)),
      (colors[22] = rgbToHex(0, 0, 0)),
      (colors[23] = rgbToHex(128, 128, 128));
    var e = getParameter("bgcolor");
    if (
      ((bgColor =
        null != e && 6 == e.length && validateColor(e) ? "#" + e : "#e7e5e3"),
      (e = getParameter("butbgcolor")),
      (buttonBgColor =
        null != e && 6 == e.length && validateColor(e) ? "#" + e : "#b7ccdd"),
      null != (e = getParameter("colors")))
    )
      for (var t = 0, r = 0; t < 10 && r < e.length; t++, r += 6) {
        var o = e.substr(r, 6);
        6 == o.length && validateColor(o) && (colors[t] = "#" + o);
      }
    for (t = 0; t < 6; t++) for (r = 0; r < 4; r++) cube[t][r] = t + 10;
    if (null != (e = getParameter("supercube")) && "1" == e) {
      (superCube = !0), setBorderWidth(0.06);
      for (t = 0; t < 4; t++) cube[0][t] = 22;
      null != (e = getParameter("scw")) &&
        ("1" == e ? (scw = 1) : "2" == e && (scw = 2)),
        1 == scw && (colors[10] = "#000000");
    }
    if (
      (null != (e = getParameter("gabbacolors")) &&
        "1" == e &&
        (1 == superCube
          ? ((colors[11] = "#fdcf00"),
            (colors[12] = "#fd4e0a"),
            (colors[13] = "#93000d"),
            (colors[14] = "#00702d"),
            (colors[15] = "#00347a"))
          : (setBorderWidth(0.06),
            (colors[11] = "#ffd90a"),
            (colors[12] = "#ff4f0b"),
            (colors[13] = "#9e0b19"),
            (colors[14] = "#0b7d39"),
            (colors[15] = "#0b4186"))),
      null != (e = getParameter("borderwidth")))
    ) {
      for (t = 0; t < e.length; t++)
        e.charAt(t) >= "0" &&
          e.charAt(t) <= "9" &&
          (borderWidth = 10 * borderWidth + parseInt(e[t]));
      borderWidth >= 0 &&
        borderWidth <= 20 &&
        setBorderWidth(borderWidth / 100);
    }
    setBorderWidth(borderWidth / 100);
    if (superCube)
      for (t = 0; t < 6; t++) for (r = 0; r < 4; r++) scube[t][r] = 0;
    var a = "lluuu";
    if (null != (e = getParameter("colorscheme")) && 6 == e.length)
      for (t = 0; t < 6; t++) {
        var i = 23;
        for (r = 0; r < 23; r++)
          if (e[t].toLowerCase() == "0123456789wyorgbldmcpnk".charAt(r)) {
            i = r;
            break;
          }
        for (r = 0; r < 4; r++) cube[t][r] = i;
      }
    cube[0] = [11, 11, 11, 11];
    cube[1] = [10, 10, 10, 10];
    cube[2] = [13, 13, 13, 13];
    cube[3] = [12, 12, 12, 12];
    cube[4] = [15, 15, 15, 15];
    cube[5] = [14, 14, 14, 14];
    if (
      ("1" == (e = getParameter("scramble"))
        ? (scramble = 1)
        : "2" == e && (scramble = 2),
      2 == scramble)
    )
      for (t = 0; t < 6; t++)
        for (r = 0; r < 4; r++)
          (initialCube[t][r] = cube[t][r]), (initialSCube[t][r] = scube[t][r]);
    if (0 == scramble) {
      if (null != (e = getParameter("pos")) && 24 == e.length) {
        (a = "uuuuff"), "gray" == bgColor && (bgColor = "white");
        for (t = 0; t < 6; t++) {
          var n = posFaceTransform[t];
          for (r = 0; r < 4; r++) {
            var s = posFaceletTransform[t][r];
            cube[n][s] = 23;
            for (var l = 0; l < 14; l++)
              if (e.charAt(9 * t + r) == "DFECABdfecabgh".charAt(l)) {
                cube[n][s] = l + 4;
                break;
              }
          }
        }
      }
      if (null != (e = getParameter("facelets")) && 24 == e.length)
        for (t = 0; t < 6; t++)
          for (r = 0; r < 4; r++) {
            cube[t][r] = 23;
            for (l = 0; l < 23; l++)
              if (
                e[4 * t + r].toLowerCase() ==
                "0123456789wyorgbldmcpnk".charAt(l)
              ) {
                cube[t][r] = l;
                break;
              }
          }
      if (null != (e = getParameter("superfacelets")) && 24 == e.length)
        for (t = 0; t < 6; t++)
          for (r = 0; r < 4; r++)
            for (l = 0; l < 4; l++)
              if (e[4 * t + r].toLowerCase() == "0123".charAt(l)) {
                scube[t][r] = l;
                break;
              }
    }
    if (
      ((moveText = 0),
      (yzAlt = !0),
      null != (e = getParameter("sign")) &&
        "1" == e &&
        ((moveText = 5), (yzAlt = !0)),
      null != (e = getParameter("wca")) &&
        "1" == e &&
        ((moveText = 5), (yzAlt = !0)),
      null != (e = getParameter("yz")) &&
        ("0" == e ? (yzAlt = !1) : "1" == e && (yzAlt = !0)),
      null != (e = getParameter("randmoves")))
    ) {
      var c = 0;
      for (t = 0; t < e.length; t++)
        e.charAt(t) >= "0" &&
          e.charAt(t) <= "9" &&
          (c = 10 * c + parseInt(e[t]));
      c > 0 && (randMoveCount = c);
    }
    ("random" == (e = getParameter("move")) || scramble > 0) &&
      (e = randMoves(2, randMoveCount)),
      (move = null == e ? [] : getMove(e, !0)),
      (movePos = 0),
      (curInfoText = -1),
      (initialReversedMove = move),
      0 == scramble &&
        (null != (e = getParameter("initmove")) &&
          ("random" == e && (e = randMoves(2, randMoveCount)),
          (initialMove = "#" == e ? move : getMove(e, !1))),
        null != (e = getParameter("initrevmove")) &&
          ("random" == e && (e = randMoves(2, randMoveCount)),
          (initialReversedMove = "#" == e ? move : getMove(e, !1))),
        null != (e = getParameter("demo")) &&
          ("random" == e && (e = randMoves(2, randMoveCount)),
          (demoMove = "#" == e ? move : getMove(e, !0)).length > 0 &&
            demoMove[0].length > 0 &&
            (demo = !0))),
      (e = getParameter("position")),
      vNorm(vMul(eyeY, eye, eyeX)),
      null == e && (e = a);
    var d = Math.PI / 12;
    for (t = 0; t < e.length; t++) {
      var u = d;
      switch (e[t].toLowerCase()) {
        case "d":
          u = -u;
        case "u":
          vRotY(eye, u), vRotY(eyeX, u);
          break;
        case "f":
          u = -u;
        case "b":
          vRotZ(eye, u), vRotZ(eyeX, u);
          break;
        case "l":
          u = -u;
        case "r":
          vRotX(eye, u), vRotX(eyeX, u);
      }
    }
    if (
      (vNorm(vMul(eyeY, eye, eyeX)),
      (speed = 0),
      (doubleSpeed = 0),
      null != (e = getParameter("speed")))
    )
      for (t = 0; t < e.length; t++)
        e.charAt(t) >= "0" &&
          e.charAt(t) <= "9" &&
          (speed = 10 * speed + parseInt(e[t]));
    if (null != (e = getParameter("doublespeed")))
      for (t = 0; t < e.length; t++)
        e.charAt(t) >= "0" &&
          e.charAt(t) <= "9" &&
          (doubleSpeed = 10 * doubleSpeed + parseInt(e[t]));
    if (
      (0 == speed && (speed = 10),
      0 == doubleSpeed && (doubleSpeed = (3 * speed) / 2),
      (persp = 0),
      null == (e = getParameter("perspective")))
    )
      persp = 2;
    else
      for (t = 0; t < e.length; t++)
        e.charAt(t) >= "0" &&
          e.charAt(t) <= "9" &&
          (persp = 10 * persp + parseInt(e[t]));
    var g,
      h = 1;
    if (null != (e = getParameter("scale")))
      for (t = 0; t < e.length; t++)
        e.charAt(t) >= "0" &&
          e.charAt(t) <= "9" &&
          (h = 10 * h + parseInt(e[t]));
    if (
      ((scale = 1 / (1 + h / 10)),
      (hint = !0),
      null != (e = getParameter("hint")))
    ) {
      (hint = !0), (faceShift = 0);
      for (t = 0; t < e.length; t++)
        e.charAt(t) >= "0" &&
          e.charAt(t) <= "9" &&
          (faceShift = 10 * faceShift + parseInt(e[t]));
      faceShift < 1 ? (hint = !1) : (faceShift /= 10);
    }
    faceShift = 0.3;
    ((hintHoriz = 3.7), null != (e = getParameter("hinthoriz"))) &&
      (g = parseFloat(e)) > 0 &&
      (hintHoriz = g);
    ((hintVert = 3.7), null != (e = getParameter("hintvert"))) &&
      (g = parseFloat(e)) > 0 &&
      (hintVert = g);
    ((hintBorder = 0),
    null != (e = getParameter("hintborder")) && "1" == e && (hintBorder = 1),
    null != (e = getParameter("buttonheight"))) &&
      ((g = parseInt(e)) >= 9) & (g <= 25) &&
      (buttonHeight = g);
    ((progressHeight = 0 == move.length ? 0 : 6),
    (buttonBar = 1),
    "0" == (e = getParameter("buttonbar"))
      ? ((buttonBar = 0), (buttonHeight = 0), (progressHeight = 0))
      : "1" == e
      ? (buttonBar = 1)
      : ("2" != e && 0 != move.length) ||
        ((buttonBar = 2), (progressHeight = 0)),
    (e = getParameter("edit")),
    (editable = "0" != e),
    (e = getParameter("repeat")),
    (repeatable = "0" != e),
    (e = getParameter("clickprogress")),
    (clickProgress = "0" != e),
    "0" == (e = getParameter("movetext"))
      ? (moveText = 0)
      : "1" == e
      ? (moveText = 1)
      : ("5" == e || "6" == e) && (moveText = 5),
    (moveText = 5),
    (moveTextSpace = 1),
    "0" == (e = getParameter("movetextspace")) && (moveTextSpace = 0),
    (textHeight = 15),
    null != (e = getParameter("textsize"))) &&
      ((g = parseInt(e)) >= 5) & (g <= 40) &&
      (textHeight = g);
    ((e = getParameter("fonttype")),
    (outlined = null == e || "1" == e),
    (outlined = false),
    (metric = 0),
    null != (e = getParameter("metric")) &&
      ("1" == e
        ? (metric = 1)
        : "2" == e
        ? (metric = 2)
        : "3" == e && (metric = 3)),
    (align = 0),
    null != (e = getParameter("align"))) &&
      (((g = parseInt(e)) >= 0) & (g <= 3) && (align = g),
      (g >= 3) & (g <= 99) && (align = g / 100));
    null != (e = getParameter("snap")) && "1" == e && (snap = !0);
    for (t = 0; t < 6; t++)
      for (r = 0; r < 4; r++)
        (initialCube[t][r] = cube[t][r]), (initialSCube[t][r] = scube[t][r]);
    initialMove.length > 0 &&
      doMove(cube, initialMove[0], 0, initialMove[0].length, !1),
      initialReversedMove.length > 0 &&
        doMove(
          cube,
          initialReversedMove[0],
          0,
          initialReversedMove[0].length,
          !0
        ),
      2 == scramble && doMove(cube, move[0], 0, move[0].length, !0);
    for (t = 0; t < 3; t++)
      (initialEye[t] = eye[t]),
        (initialEyeX[t] = eyeX[t]),
        (initialEyeY[t] = eyeY[t]);
    colorAverage(bgColor) < 128
      ? ((textColor = "white"), (hlColor = brighter(bgColor)))
      : ((textColor = "black"), (hlColor = darker(bgColor))),
      (buttonBorderColor =
        colorAverage(buttonBgColor) < 128 ? "white" : "black"),
      (sliderColor = "#526d98"),
      null != (e = getParameter("slidercolor")) &&
        6 == e.length &&
        validateColor(e) &&
        (sliderColor = "#" + e),
      (sliderBgColor = "#b7ccdd"),
      null != (e = getParameter("troughcolor")) &&
        6 == e.length &&
        validateColor(e) &&
        (sliderBgColor = "#" + e),
      (cubeColor = "black"),
      null != (e = getParameter("cubecolor")) &&
        6 == e.length &&
        validateColor(e) &&
        (cubeColor = "#" + e),
      (moveCounter = 1),
      "0" == (e = getParameter("counter")) && (moveCounter = 0),
      (curInfoText = move.length > 0 && move[0][0] >= 1e3 ? 0 : -1),
      init2(),
      demo && startAnimation(-1);
  }
  function getParameter(e) {
    var t = searchParams[e];
    return void 0 === t ? config[e] : t;
  }
  function setBorderWidth(e) {
    (border[0][0] = border[0][1] = border[1][1] = border[3][0] = e),
      (border[1][0] = border[2][0] = border[2][1] = border[3][1] = 1 - e);
  }
  var moveModes = [
      0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2,
    ],
    moveCodes = [0, 1, 2, 3, 4, 5, 1, 2, 4, 5, 2, 0, 5, 2, 0, 0, 1, 2, 3, 4, 5];
  function getMove(e, t) {
    if (t) {
      for (var r = e.indexOf("{"); -1 != r; ) r = e.indexOf("{", r + 1);
      if (null == infoText) (curInfoText = 0), (infoText = []);
      else {
        for (var o = [], a = 0; a < infoText.length; a++) o[a] = infoText[a];
        (curInfoText = infoText.length), (infoText = o);
      }
    }
    var i = 1;
    for (r = e.indexOf(";"); -1 != r; ) i++, (r = e.indexOf(";", r + 1));
    var n = [],
      s = 0;
    for (r = e.indexOf(";"), i = 0; -1 != r; )
      (n[i] = getMovePart(e.substring(s, r), t, i++)),
        (s = r + 1),
        (r = e.indexOf(";", s));
    return (n[i] = getMovePart(e.substring(s), t, i)), n;
  }
  var modeChar = ["m", "t", "c", "s", "a"];
  function getMovePart(e, t, r) {
    if ("#" == e.trim() && void 0 !== move[r]) return move[r];
    var o = 0,
      a = [],
      i = "UDFBLRESMXYZxyzudfblr";
    1 == yzAlt && (i = "UDFBLRESMXZYxzyudfblr");
    for (var n = 0; n < e.length; n++)
      if ("." == e.charAt(n)) (a[o] = -1), o++;
      else if ("{" == e.charAt(n)) {
        n++;
        for (var s = ""; n < e.length && "}" != e.charAt(n); )
          t && (s += e.charAt(n)), n++;
        t &&
          ((infoText[curInfoText] = s),
          (a[o] = 1e3 + curInfoText),
          curInfoText++,
          o++);
      } else
        for (var l = 0; l < 21; l++)
          if (e.charAt(n) == i.charAt(l)) {
            var c = e.charAt(n);
            if ("E" == c || "S" == c || "M" == c) continue;
            n++;
            var d = moveModes[l];
            if (((a[o] = 24 * moveCodes[l]), n < e.length && 0 == moveModes[l]))
              for (var u = 0; u < modeChar.length; u++)
                if (e.charAt(n) == modeChar[u]) {
                  (d = u + 1), n++;
                  break;
                }
            (a[o] += 4 * d),
              n < e.length &&
                ("1" == e.charAt(n)
                  ? n++
                  : "'" == e.charAt(n) || "3" == e.charAt(n)
                  ? ((a[o] += 2), n++)
                  : "2" == e.charAt(n) &&
                    (++n < e.length && "'" == e.charAt(n)
                      ? ((a[o] += 3), n++)
                      : (a[o] += 1))),
              o++,
              n--;
            break;
          }
    return a;
  }
  function moveTextFunc(e, t, r) {
    if (t >= e.length) return "";
    for (var o = "", a = t; a < r; a++) {
      var i = turnTextFunc(e, a);
      "" != i && (o += i + (moveTextSpace ? " " : ""));
    }
    return o;
  }
  var turnSymbol = [
      [
        ["U", "D", "F", "B", "L", "R"],
        ["Um", "Dm", "Fm", "Bm", "Lm", "Rm"],
        ["Ut", "Dt", "Ft", "Bt", "Lt", "Rt"],
        ["Uc", "Dc", "Fc", "Bc", "Lc", "Rc"],
        ["Us", "Ds", "Fs", "Bs", "Ls", "Rs"],
        ["Ua", "Da", "Fa", "Ba", "La", "Ra"],
      ],
      [
        ["U", "D", "F", "B", "L", "R"],
        ["~E", "E", "S", "~S", "M", "~M"],
        ["u", "d", "f", "b", "l", "r"],
        ["Z", "~Z", "Y", "~Y", "~X", "X"],
        ["Us", "Ds", "Fs", "Bs", "Ls", "Rs"],
        ["Ua", "Da", "Fa", "Ba", "La", "Ra"],
      ],
      [
        ["U", "D", "F", "B", "L", "R"],
        ["~E", "E", "S", "~S", "M", "~M"],
        ["u", "d", "f", "b", "l", "r"],
        ["Y", "~Y", "Z", "~Z", "~X", "X"],
        ["Us", "Ds", "Fs", "Bs", "Ls", "Rs"],
        ["Ua", "Da", "Fa", "Ba", "La", "Ra"],
      ],
      [
        ["U", "D", "F", "B", "L", "R"],
        ["u", "d", "f", "b", "l", "r"],
        ["Uu", "Dd", "Ff", "Bb", "Ll", "Rr"],
        ["QU", "QD", "QF", "QB", "QL", "QR"],
        ["UD'", "DU'", "FB'", "BF'", "LR'", "RL'"],
        ["UD", "DU", "FB", "BF", "LR", "RL"],
      ],
      [
        ["U", "D", "F", "B", "L", "R"],
        ["~E", "E", "S", "~S", "M", "~M"],
        ["u", "d", "f", "b", "l", "r"],
        ["y", "~y", "z", "~z", "~x", "x"],
        ["Us", "Ds", "Fs", "Bs", "Ls", "Rs"],
        ["Ua", "Da", "Fa", "Ba", "La", "Ra"],
      ],
    ],
    modifierStrings = ["", "2", "'", "2'"];
  function turnTextFunc(e, t) {
    if (t >= e.length) return "";
    if (e[t] >= 1e3) return "";
    if (-1 == e[t]) return ".";
    var r =
      turnSymbol[moveText - 1][Math.floor(e[t] / 4) % 6][Math.floor(e[t] / 24)];
    return "~" == r.charAt(0)
      ? r.substring(1) + modifierStrings[(e[t] + 2) % 4]
      : r + modifierStrings[e[t] % 4];
  }
  var metricChar = ["", "q", "h", "s"];
  function realMoveLength(e) {
    for (var t = 0, r = 0; r < e.length; r++) e[r] < 1e3 && t++;
    return t;
  }
  function realMovePos(e, t) {
    for (var r = 0, o = 0; o < t; o++) e[o] < 1e3 && r++;
    return r;
  }
  function arrayMovePos(e, t) {
    for (var r = 0, o = 0; ; ) {
      for (; r < e.length && e[r] >= 1e3; ) r++;
      if (o == t) break;
      r < e.length && (o++, r++);
    }
    return r;
  }
  function moveLength(e, t) {
    for (var r = 0, o = 0; o < e.length && (o < t || t < 0); o++)
      r += turnLength(e[o]);
    return r;
  }
  function turnLength(e) {
    if (e < 0 || e >= 1e3) return 0;
    var t = e % 4,
      r = Math.floor(e / 4) % 6,
      o = 1;
    switch (metric) {
      case 1:
        (1 != t && 3 != t) || (o *= 2);
      case 2:
        (1 != r && 4 != r && 5 != r) || (o *= 2);
      case 3:
        3 == r && (o = 0), 3 != metric || (4 != r && 5 != r) || (o *= 2);
    }
    return o;
  }
  function initInfoText(e) {
    curInfoText = e.length > 0 && e[0] >= 1e3 ? e[0] - 1e3 : -1;
  }
  function doMove(e, t, r, o, a) {
    for (var i = a ? r + o : r; ; ) {
      if (a) {
        if (i <= r) break;
        i--;
      }
      if (t[i] >= 1e3) curInfoText = a ? -1 : t[i] - 1e3;
      else if (t[i] >= 0) {
        var n = (t[i] % 4) + 1,
          s = Math.floor(t[i] / 4) % 6;
        4 == n && (n = 2),
          a && (n = 4 - n),
          twistLayers(e, Math.floor(t[i] / 24), n, s);
      }
      if (!a && ++i >= r + o) break;
    }
  }
  var jobNumber = 0,
    nowServing = 0;
  function startAnimation(e) {
    if (
      (stopAnimation(),
      (demo || (0 != move.length && 0 != move[curMove].length)) &&
        (!demo || (0 != demoMove.length && 0 != demoMove[0].length)))
    ) {
      switch (((moveDir = 1), (moveOne = !1), (moveAnimated = !0), e)) {
        case 0:
          break;
        case 1:
          moveDir = -1;
          break;
        case 2:
          moveOne = !0;
          break;
        case 3:
          (moveDir = -1), (moveOne = !0);
          break;
        case 4:
          moveAnimated = !1;
      }
      run(jobNumber++, moveDir);
    }
  }
  function stopAnimation() {
    1 == animating && (restarted = !0);
  }
  function clear() {
    (movePos = 0), (natural = !0), (mirrored = !1);
    for (var e = 0; e < 6; e++)
      for (var t = 0; t < 4; t++)
        (cube[e][t] = initialCube[e][t]), (scube[e][t] = initialSCube[e][t]);
    initialMove.length > 0 &&
      void 0 !== initialMove[curMove] &&
      doMove(cube, initialMove[curMove], 0, initialMove[curMove].length, !1),
      initialReversedMove.length > 0 &&
        void 0 !== initialReversedMove[curMove] &&
        doMove(
          cube,
          initialReversedMove[curMove],
          0,
          initialReversedMove[curMove].length,
          !0
        ),
      move.length > 0 && initInfoText(move[curMove]),
      scramble > 0 && (move = getMove(randMoves(2, randMoveCount), !1)),
      2 == scramble && doMove(cube, move[0], 0, move[0].length, !0);
    for (e = 0; e < 3; e++)
      (eye[e] = initialEye[e]),
        (eyeX[e] = initialEyeX[e]),
        (eyeY[e] = initialEyeY[e]);
    setTimeout(paint, 0);
  }
  var cubeBlocks = [
      [
        [0, 2],
        [0, 2],
      ],
      [
        [0, 2],
        [0, 2],
      ],
      [
        [0, 2],
        [0, 2],
      ],
      [
        [0, 2],
        [0, 2],
      ],
      [
        [0, 2],
        [0, 2],
      ],
      [
        [0, 2],
        [0, 2],
      ],
    ],
    topBlocks = [],
    botBlocks = [],
    topBlockTable = [
      [
        [0, 0],
        [0, 0],
      ],
      [
        [0, 2],
        [0, 2],
      ],
      [
        [0, 2],
        [0, 1],
      ],
      [
        [0, 1],
        [0, 2],
      ],
      [
        [0, 2],
        [1, 2],
      ],
      [
        [1, 2],
        [0, 2],
      ],
    ],
    topBlockFaceDim = [
      [1, 0, 3, 3, 2, 3],
      [0, 1, 5, 5, 4, 5],
      [2, 3, 1, 0, 3, 2],
      [4, 5, 0, 1, 5, 4],
      [3, 2, 2, 4, 1, 0],
      [5, 4, 4, 2, 0, 1],
    ],
    botBlockFaceDim = [
      [0, 1, 5, 5, 4, 5],
      [1, 0, 3, 3, 2, 3],
      [4, 5, 0, 1, 5, 4],
      [2, 3, 1, 0, 3, 2],
      [5, 4, 4, 2, 0, 1],
      [3, 2, 2, 4, 1, 0],
    ];
  function splitCube(e) {
    for (var t = 0; t < 6; t++)
      (topBlocks[t] = topBlockTable[topBlockFaceDim[e][t]]),
        (botBlocks[t] = topBlockTable[botBlockFaceDim[e][t]]);
    natural = !1;
  }
  function twistLayers(e, t, r, o) {
    5 == o
      ? twistLayer(e, 1 ^ t, 4 - r)
      : (2 != o && 3 != o && 4 != o) || twistLayer(e, 1 ^ t, r),
      twistLayer(e, t, 4 - r);
  }
  var cycleOrder = [0, 1, 3, 2],
    cycleFactors = [1, 2, -1, -2],
    cycleOffsets = [0, 1, 3, 2],
    cycleLayerSides = [
      [3, 3, 3, 0],
      [2, 1, 1, 1],
      [3, 3, 0, 0],
      [2, 1, 1, 2],
      [3, 2, 0, 0],
      [2, 2, 0, 1],
    ],
    twistBuffer = [];
  function twistLayer(e, t, r) {
    twistLayer2(e, t, r),
      1 == superCube &&
        r > 0 &&
        r < 4 &&
        (twistLayer2(scube, t, r), twistSuperLayer(t, r));
  }
  function twistLayer2(e, t, r) {
    for (var o = 0; o < 4; o++) twistBuffer[(o + r) % 4] = e[t][cycleOrder[o]];
    for (o = 0; o < 4; o++) e[t][cycleOrder[o]] = twistBuffer[o];
    var a = 2 * r;
    for (o = 0; o < 4; o++)
      for (
        var i = adjacentFaces[t][o],
          n = cycleLayerSides[t][o],
          s = cycleFactors[n],
          l = cycleOffsets[n],
          c = 0;
        c < 2;
        c++, a++
      )
        twistBuffer[a % 8] = e[i][c * s + l];
    for (o = 0, a = 0; o < 4; o++)
      for (
        i = adjacentFaces[t][o],
          n = cycleLayerSides[t][o],
          s = cycleFactors[n],
          l = cycleOffsets[n],
          c = 0;
        c < 2;
        c++, a++
      )
        e[i][c * s + l] = twistBuffer[a];
  }
  var superTwistArr = [
      [
        [0, 1, 0],
        [0, 2, 1],
        [0, 2, 4],
        [0, 1, 5],
      ],
      [
        [2, 1, 0],
        [1, 2, 1],
        [1, 2, 4],
        [2, 1, 5],
      ],
      [
        [2, 1, 3],
        [0, 1, 1],
        [0, 1, 2],
        [0, 2, 0],
      ],
      [
        [0, 1, 3],
        [1, 2, 0],
        [2, 1, 2],
        [2, 1, 1],
      ],
    ],
    width,
    height,
    lastX,
    lastY,
    lastDragX,
    lastDragY,
    dragAreas;
  function twistSuperLayer(e, t, r) {
    for (var o = 0; o < 4; o++) scube[e][o] = (scube[e][o] + 4 - t) % 4;
    2 == e && superTwist2(0, 4 - t),
      3 == e && superTwist2(1, t),
      4 == e && superTwist(2, t),
      5 == e && superTwist(3, t);
  }
  function superTwist(e, t) {
    superTwist1(superTwistArr[e][0]), superTwist1(superTwistArr[e][t]);
  }
  function superTwist1(e) {
    for (var t = e[0], r = 0; r < 2; t += e[1], r++)
      scube[e[2]][t] = (scube[e[2]][t] + 2) % 4;
  }
  function superTwist2(e, t) {
    for (var r = 0; r < 4; r++)
      for (var o = superTwistArr[e][r], a = o[0], i = 0; i < 2; a += o[1], i++)
        scube[o[2]][a] = (scube[o[2]][a] + t) % 4;
  }
  var dragCornersX = [],
    dragCornersY = [],
    dragDirsX = [],
    dragDirsY = [],
    dragBlocks = [
      [
        [0, 0],
        [2, 0],
        [2, 1],
        [0, 1],
      ],
      [
        [2, 0],
        [2, 2],
        [1, 2],
        [1, 0],
      ],
      [
        [2, 2],
        [0, 2],
        [0, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [0, 0],
        [1, 0],
        [1, 2],
      ],
    ],
    areaDirs = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ],
    twistDirs = [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, -1, 1, -1],
      [1, -1, 1, -1],
      [-1, 1, -1, 1],
      [1, -1, 1, -1],
    ],
    dragLayers = [],
    dragModes = [],
    dragX,
    dragY,
    rotCos = [
      [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 1],
      ],
      [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
    ],
    rotSin = [
      [
        [0, 0, 1],
        [0, 0, 0],
        [-1, 0, 0],
      ],
      [
        [0, 1, 0],
        [-1, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 1],
        [0, -1, 0],
      ],
    ],
    rotVec = [
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 1],
      ],
      [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    ],
    rotSign = [1, -1, 1, -1, 1, -1],
    tempEye = [],
    tempEyeX = [],
    tempEyeY = [],
    tempEye2 = [],
    tempEyeX2 = [],
    tempEyeY2 = [],
    perspEye = [],
    perspEyeI = [],
    perspNormal = [],
    eyeArray = [],
    eyeArrayX = [],
    eyeArrayY = [],
    eyeOrder = [
      [1, 0],
      [1, 0],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 2],
    ],
    blockArray = [],
    blockMode = [
      [0, 2],
      [2, 1],
      [2, 2],
      [2, 2],
      [2, 2],
      [2, 2],
    ],
    drawOrder = [
      [0, 1],
      [1, 0],
      [0, 1],
    ];
  function paint() {
    graphics.save(), (graphics.fillStyle = bgColor);
    var e =
      1 != buttonBar ||
      (0 != progressHeight && !demo && 0 != move[curMove].length)
        ? height
        : height - dpr;
    if (
      (setClip(graphics, 0, 0, width, e),
      graphics.fillRect(0, 0, width, e),
      (dragAreas = 0),
      natural)
    )
      fixBlock(eye, eyeX, eyeY, cubeBlocks, 3);
    else {
      for (
        var t = Math.cos(originalAngle + currentAngle),
          r = Math.sin(originalAngle + currentAngle) * rotSign[twistedLayer],
          o = 0;
        o < 3;
        o++
      ) {
        (tempEye[o] = 0), (tempEyeX[o] = 0);
        for (var a = 0; a < 3; a++) {
          var i = Math.floor(twistedLayer / 2);
          (tempEye[o] +=
            eye[a] *
            (rotVec[i][o][a] + rotCos[i][o][a] * t + rotSin[i][o][a] * r)),
            (tempEyeX[o] +=
              eyeX[a] *
              (rotVec[i][o][a] + rotCos[i][o][a] * t + rotSin[i][o][a] * r));
        }
      }
      vMul(tempEyeY, tempEye, tempEyeX);
      var n = Math.cos(originalAngle - currentAngle),
        s = Math.sin(originalAngle - currentAngle) * rotSign[twistedLayer];
      for (o = 0; o < 3; o++) {
        (tempEye2[o] = 0), (tempEyeX2[o] = 0);
        for (a = 0; a < 3; a++) {
          i = Math.floor(twistedLayer / 2);
          (tempEye2[o] +=
            eye[a] *
            (rotVec[i][o][a] + rotCos[i][o][a] * n + rotSin[i][o][a] * s)),
            (tempEyeX2[o] +=
              eyeX[a] *
              (rotVec[i][o][a] + rotCos[i][o][a] * n + rotSin[i][o][a] * s));
        }
      }
      vMul(tempEyeY2, tempEye2, tempEyeX2),
        (eyeArray[0] = eye),
        (eyeArrayX[0] = eyeX),
        (eyeArrayY[0] = eyeY),
        (eyeArray[1] = tempEye),
        (eyeArrayX[1] = tempEyeX),
        (eyeArrayY[1] = tempEyeY),
        (eyeArray[2] = tempEye2),
        (eyeArrayX[2] = tempEyeX2),
        (eyeArrayY[2] = tempEyeY2),
        (blockArray[0] = topBlocks),
        (blockArray[1] = botBlocks),
        vSub(
          vScale(vCopy(perspEye, eye), 5 + persp),
          vScale(vCopy(perspNormal, faceNormals[twistedLayer]), 1 / 3)
        ),
        vSub(
          vScale(vCopy(perspEyeI, eye), 5 + persp),
          vScale(vCopy(perspNormal, faceNormals[1 ^ twistedLayer]), 1 / 3)
        );
      var l,
        c = vProd(perspEye, faceNormals[twistedLayer]),
        d = vProd(perspEyeI, faceNormals[1 ^ twistedLayer]);
      l = c < 0 && d > 0 ? 0 : c > 0 && d < 0 ? 1 : 2;
      for (o = 0; o < 2; o++) {
        a = drawOrder[l][o];
        var u = eyeOrder[twistedMode][a];
        fixBlock(
          eyeArray[u],
          eyeArrayX[u],
          eyeArrayY[u],
          blockArray[a],
          blockMode[twistedMode][a]
        );
      }
    }
    if (
      (pushed || animating || (buttonPressed = -1),
      !(scramble > 0 && 2 == buttonBar))
    ) {
      if (!demo && move.length > 0) {
        if (move[curMove].length > 0) {
          if (progressHeight > 0) {
            (graphics.lineWidth = lineWidth),
              (graphics.strokeStyle = buttonBorderColor);
            var g =
              ((width - 2) * realMovePos(move[curMove], movePos)) /
              realMoveLength(move[curMove]);
            (graphics.fillStyle = sliderBgColor),
              graphics.fillRect(
                dph,
                height - progressHeight - dph,
                width - dpr,
                progressHeight
              ),
              (graphics.fillStyle = sliderColor),
              graphics.fillRect(
                dph,
                height - progressHeight - dph,
                g,
                progressHeight
              ),
              graphics.beginPath(),
              graphics.rect(
                dph,
                height - progressHeight - dph,
                width - dpr,
                progressHeight
              ),
              graphics.stroke();
          }
          graphics.font = textHeight + "px helvetica";
          var h =
              moveLength(move[curMove], movePos) +
              "/" +
              moveLength(move[curMove], -1) +
              metricChar[metric],
            v = graphics.measureText(h).width,
            f = width - v - 2,
            m = height - progressHeight - Math.floor(4 * dpr);
          moveText > 0
            ? (moveCounter &&
                drawString(graphics, h, outlined ? f - dpr : f, m - textHeight),
              drawMoveTextFunc(graphics, m))
            : moveCounter && drawString(graphics, h, outlined ? f - dpr : f, m);
        }
        if (move.length > 1) {
          graphics.font = "bold " + textHeight + "px helvetica";
          (h = curMove + 1 + "/" + move.length),
            (v = graphics.measureText(h).width),
            (f = width - v - 2 * buttonHeight - Math.floor(5 * dpr));
          drawString(graphics, h, f, adjTextHeight()),
            drawButton(graphics, 7, width - 2 * buttonHeight, 0),
            drawButton(graphics, 8, width - buttonHeight, 0);
        }
      }
      if (curInfoText >= 0) {
        graphics.font = "bold " + textHeight + "px helvetica";
        v = move.length > 1 ? f - 5 * dpr : width;
        wrapText(
          graphics,
          infoText[curInfoText],
          dpr,
          adjTextHeight(),
          v,
          textHeight
        );
      }
    }
    graphics.restore(),
      drawButtons && 0 != buttonBar && drawButtonsFunc(graphics);
  }
  function wrapText(e, t, r, o, a, i) {
    for (var n = t.split(" "), s = "", l = 0; l < n.length; l++) {
      var c = s + n[l] + " ";
      e.measureText(c).width > a && l > 0
        ? (drawString(e, s, r, o), (s = n[l] + " "), (o += i))
        : (s = c);
    }
    drawString(e, s, r, o);
  }
  function adjTextHeight() {
    return utextHeight < 10
      ? Math.floor(10 * dpr)
      : utextHeight < 12
      ? Math.floor(12 * dpr)
      : utextHeight < 14
      ? Math.floor(14 * dpr)
      : textHeight;
  }
  var fillX = [],
    fillY = [],
    coordsX = [],
    coordsY = [],
    cooX = [[], [], [], [], [], []],
    cooY = [[], [], [], [], [], []],
    border = [
      [0.1, 0.1],
      [0.9, 0.1],
      [0.9, 0.9],
      [0.1, 0.9],
    ],
    factors = [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    tempNormal = [];
  function fixBlock(e, t, r, o, a) {
    for (var i = 0; i < 8; i++) {
      var n =
          ((c = width < height ? width : height - progressHeight) / 3.7) *
          vProd(cornerCoords[i], t) *
          scale,
        s = (c / 3.7) * vProd(cornerCoords[i], r) * scale;
      (n /=
        1 - (d = (c / (5 + persp)) * vProd(cornerCoords[i], e) * scale) / c),
        (s /= 1 - d / c),
        (coordsX[i] = width / 2 + n),
        (coordsY[i] =
          0 == align
            ? ((height - progressHeight) / 2) * scale - s
            : 1 == align
            ? (height - progressHeight) / 2 - s
            : 2 == align
            ? height -
              progressHeight -
              ((height - progressHeight) / 2) * scale -
              s
            : (height - progressHeight) * (align * (1 - scale) + scale / 2) -
              s);
    }
    for (i = 0; i < 6; i++)
      for (var l = 0; l < 4; l++)
        (cooX[i][l] = coordsX[faceCorners[i][l]]),
          (cooY[i][l] = coordsY[faceCorners[i][l]]);
    if (hint)
      for (i = 0; i < 6; i++)
        if (
          (vSub(vScale(vCopy(perspEye, e), 5 + persp), faceNormals[i]),
          vProd(perspEye, faceNormals[i]) < -(1 - scale))
        ) {
          vScale(vCopy(tempNormal, faceNormals[i]), faceShift);
          var c, d;
          (n =
            ((c = width < height ? width : height - progressHeight) /
              hintHoriz) *
            vProd(tempNormal, t)),
            (s = (c / hintVert) * vProd(tempNormal, r));
          (n /= 1 - (d = (c / (5 + persp)) * vProd(tempNormal, e)) / c),
            (s /= 1 - d / c);
          var u = o[i][0][1] - o[i][0][0],
            g = o[i][1][1] - o[i][1][0];
          if (u > 0 && g > 0)
            for (var h = 0, v = o[i][1][0]; h < g; h++, v++)
              for (var f = 0, m = o[i][0][0]; f < u; f++, m++) {
                for (l = 0; l < 4; l++)
                  getCorners(
                    i,
                    l,
                    fillX,
                    fillY,
                    m + border[l][0],
                    v + border[l][1],
                    mirrored
                  ),
                    (fillX[l] = Math.floor(fillX[l] + (mirrored ? -n : n))),
                    (fillY[l] = Math.floor(fillY[l] - s));
                1 == superCube
                  ? drawSuperArrow(
                      graphics,
                      fillX,
                      fillY,
                      i,
                      scube[i][2 * v + m],
                      colors[cube[i][2 * v + m]]
                    )
                  : (fillPolygon(
                      graphics,
                      fillX,
                      fillY,
                      colors[cube[i][2 * v + m]]
                    ),
                    drawPolygon(
                      graphics,
                      fillX,
                      fillY,
                      hintBorder
                        ? darker(colors[cube[i][2 * v + m]])
                        : colors[cube[i][2 * v + m]]
                    ));
              }
        }
    for (i = 0; i < 6; i++) {
      (u = o[i][0][1] - o[i][0][0]), (g = o[i][1][1] - o[i][1][0]);
      if (u <= 0 || g <= 0) {
        for (l = 0; l < 4; l++) {
          var p = oppositeCorners[i][l];
          (fillX[l] = Math.floor(
            cooX[i][l] + (1 * (cooX[1 ^ i][p] - cooX[i][l])) / 2
          )),
            (fillY[l] = Math.floor(
              cooY[i][l] + (1 * (cooY[1 ^ i][p] - cooY[i][l])) / 2
            )),
            mirrored && (fillX[l] = width - fillX[l]);
        }
        fillPolygon(graphics, fillX, fillY, cubeColor);
      } else {
        for (l = 0; l < 4; l++)
          getCorners(
            i,
            l,
            fillX,
            fillY,
            o[i][0][factors[l][0]],
            o[i][1][factors[l][1]],
            mirrored
          );
        fillPolygon(graphics, fillX, fillY, cubeColor);
      }
    }
    for (i = 0; i < 6; i++)
      if (
        (vSub(vScale(vCopy(perspEye, e), 5 + persp), faceNormals[i]),
        vProd(perspEye, faceNormals[i]) > -(1 - scale))
      ) {
        (u = o[i][0][1] - o[i][0][0]), (g = o[i][1][1] - o[i][1][0]);
        if (u > 0 && g > 0)
          for (h = 0, v = o[i][1][0]; h < g; h++, v++)
            for (f = 0, m = o[i][0][0]; f < u; f++, m++) {
              for (l = 0; l < 4; l++)
                getCorners(
                  i,
                  l,
                  fillX,
                  fillY,
                  m + border[l][0],
                  v + border[l][1],
                  mirrored
                );
              1 == superCube
                ? (drawPolygon(graphics, fillX, fillY, "#fdfdfd"),
                  fillPolygon(graphics, fillX, fillY, "#fdfdfd"),
                  drawSuperArrow(
                    graphics,
                    fillX,
                    fillY,
                    i,
                    scube[i][2 * v + m],
                    colors[cube[i][2 * v + m]]
                  ))
                : (drawPolygon(
                    graphics,
                    fillX,
                    fillY,
                    colors[cube[i][2 * v + m]]
                  ),
                  fillPolygon(
                    graphics,
                    fillX,
                    fillY,
                    colors[cube[i][2 * v + m]]
                  ));
            }
        if (!editable || animating) continue;
        var b = (cooX[i][1] - cooX[i][0] + cooX[i][2] - cooX[i][3]) / 6,
          w = (cooX[i][3] - cooX[i][0] + cooX[i][2] - cooX[i][1]) / 6,
          y = (cooY[i][1] - cooY[i][0] + cooY[i][2] - cooY[i][3]) / 6,
          M = (cooY[i][3] - cooY[i][0] + cooY[i][2] - cooY[i][1]) / 6;
        if (3 == a)
          for (l = 0; l < 4; l++) {
            for (p = 0; p < 4; p++)
              getCorners(
                i,
                p,
                dragCornersX[dragAreas],
                dragCornersY[dragAreas],
                dragBlocks[l][p][0],
                dragBlocks[l][p][1],
                !1
              );
            if (
              ((dragDirsX[dragAreas] =
                (b * areaDirs[l][0] + y * areaDirs[l][1]) * twistDirs[i][l]),
              (dragDirsY[dragAreas] =
                (w * areaDirs[l][0] + M * areaDirs[l][1]) * twistDirs[i][l]),
              (dragLayers[dragAreas] = adjacentFaces[i][l % 4]),
              (dragModes[dragAreas] = Math.floor(l / 4)),
              12 == ++dragAreas)
            )
              break;
          }
        else if (0 == a && i != twistedLayer && u > 0 && g > 0) {
          for (
            l = 2 == u ? (0 == o[i][1][0] ? 0 : 2) : 0 == o[i][0][0] ? 3 : 1,
              p = 0;
            p < 4;
            p++
          )
            getCorners(
              i,
              p,
              dragCornersX[dragAreas],
              dragCornersY[dragAreas],
              dragBlocks[l][p][0],
              dragBlocks[l][p][1],
              !1
            );
          (dragDirsX[dragAreas] =
            (b * areaDirs[l][0] + y * areaDirs[l][1]) * twistDirs[i][l]),
            (dragDirsY[dragAreas] =
              (w * areaDirs[l][0] + M * areaDirs[l][1]) * twistDirs[i][l]),
            (dragLayers[dragAreas] = twistedLayer),
            (dragModes[dragAreas] = 0),
            dragAreas++;
        }
      }
  }
  function getCorners(e, t, r, o, a, i, n) {
    (a /= 2), (i /= 2);
    var s = cooX[e][0] + (cooX[e][1] - cooX[e][0]) * a,
      l = cooY[e][0] + (cooY[e][1] - cooY[e][0]) * a,
      c = cooX[e][3] + (cooX[e][2] - cooX[e][3]) * a,
      d = cooY[e][3] + (cooY[e][2] - cooY[e][3]) * a;
    (r[t] = Math.floor(0.5 + s + (c - s) * i)),
      (o[t] = Math.floor(0.5 + l + (d - l) * i)),
      n && (r[t] = width - r[t]);
  }
  var textOffsetInit = [1, 1, -1, -1, -1, 1, 1, -1, -1, 0, 1, 0, 0, 1, 0, -1],
    textOffset = [];
  function drawString(e, t, r, o) {
    if (outlined) {
      e.fillStyle = "black";
      for (var a = 0; a < textOffset.length; a += 2)
        e.fillText(t, r + textOffset[a], o + textOffset[a + 1]);
      e.fillStyle = "white";
    } else e.fillStyle = textColor;
    e.fillText(t, r, o);
  }
  function drawMoveTextFunc(e, t) {
    var r = 0 == movePos ? arrayMovePos(move[curMove], movePos) : movePos,
      o = moveTextFunc(move[curMove], 0, r),
      a = turnTextFunc(move[curMove], r),
      i = moveTextFunc(move[curMove], r + 1, move[curMove].length);
    moveTextSpace &&
      ("" == a && (o = o.substr(0, o.length - 1)),
      "" != i && (i = " " + i.substr(0, i.length - 1)));
    var n = e.measureText(o).width,
      s = e.measureText(a).width,
      l = e.measureText(i).width,
      c = 1;
    c + n + s + l > width &&
      ((c = Math.min(1, width / 2 - n - s / 2)),
      (c = Math.max(c, width - n - s - l - 2))),
      s > 0 &&
        ((e.fillStyle = hlColor),
        (e.lineWidth = 2),
        (e.strokeStyle = "black"),
        e.beginPath(),
        utextHeight <= 14
          ? e.fillRect(
              c + n - 1,
              height - progressHeight - textHeight - Math.floor(4 * dpr),
              s + 2,
              textHeight + Math.floor(3 * dpr)
            )
          : e.fillRect(
              c + n - 1,
              height - progressHeight - textHeight - Math.floor(2 * dpr),
              s + 2,
              textHeight + Math.floor(dpr)
            )),
      n > 0 && drawString(e, o, c, t),
      s > 0 && drawString(e, a, c + n, t),
      l > 0 && drawString(e, i, c + n + s, t);
  }
  function selectButton(e, t) {
    if (0 == buttonBar) return -1;
    if (
      move.length > 1 &&
      e >= width - 2 * buttonHeight &&
      e < width - buttonHeight &&
      t >= 0 &&
      t < buttonHeight
    )
      return 7;
    if (
      move.length > 1 &&
      e >= width - buttonHeight &&
      e < width &&
      t >= 0 &&
      t < buttonHeight
    )
      return 8;
    if (2 == buttonBar)
      return e >= 0 &&
        e < buttonHeight &&
        t >= height - buttonHeight &&
        t < height
        ? 0
        : -1;
    if (t < height) return -1;
    for (var r = 0, o = 0; o < 4; o++) {
      var a = (width - r) / (4 - o);
      if (e >= r && e < r + a && t >= height && t < height + buttonHeight)
        return o;
      r += a;
    }
    return -1;
  }
  var buttonAction = [-1, 3, 2, -1, 0, 2, 4, -1];
  function vCopy(e, t) {
    return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), e;
  }
  function vNorm(e) {
    var t = Math.sqrt(vProd(e, e));
    return (e[0] /= t), (e[1] /= t), (e[2] /= t), e;
  }
  function vScale(e, t) {
    return (e[0] *= t), (e[1] *= t), (e[2] *= t), e;
  }
  function vProd(e, t) {
    return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
  }
  function vAdd(e, t) {
    return (e[0] += t[0]), (e[1] += t[1]), (e[2] += t[2]), e;
  }
  function vSub(e, t) {
    return (e[0] -= t[0]), (e[1] -= t[1]), (e[2] -= t[2]), e;
  }
  function vMul(e, t, r) {
    return (
      (e[0] = t[1] * r[2] - t[2] * r[1]),
      (e[1] = t[2] * r[0] - t[0] * r[2]),
      (e[2] = t[0] * r[1] - t[1] * r[0]),
      e
    );
  }
  function vRotX(e, t) {
    var r = Math.sin(t),
      o = Math.cos(t),
      a = e[1] * o - e[2] * r,
      i = e[1] * r + e[2] * o;
    return (e[1] = a), (e[2] = i), e;
  }
  function vRotY(e, t) {
    var r = Math.sin(t),
      o = Math.cos(t),
      a = e[0] * o - e[2] * r,
      i = e[0] * r + e[2] * o;
    return (e[0] = a), (e[2] = i), e;
  }
  function vRotZ(e, t) {
    var r = Math.sin(t),
      o = Math.cos(t),
      a = e[0] * o - e[1] * r,
      i = e[0] * r + e[1] * o;
    return (e[0] = a), (e[1] = i), e;
  }
  function rgbToHex(e, t, r) {
    return (
      "#" + lpad(e.toString(16)) + lpad(t.toString(16)) + lpad(r.toString(16))
    );
  }
  function lpad(e) {
    return ("00" + e).substring(e.length);
  }
  function validateColor(e) {
    if (6 != e.length) return !1;
    for (var t = 0, r = 0; r < 6; r++)
      for (var o = 0; o < 16; o++)
        if (e.charAt(r).toLowerCase() == "0123456789abcdef".charAt(o)) {
          t++;
          break;
        }
    return 6 == t;
  }
  function setClip(e, t, r, o, a) {
    e.beginPath(),
      e.moveTo(t, r),
      e.lineTo(t + o, r),
      e.lineTo(t + o, r + a),
      e.lineTo(t, r + a),
      e.lineTo(t, r),
      e.closePath(),
      e.clip();
  }
  function drawButtonsFunc(e) {
    var t = buttonHeight % 2 == 0 ? 1 : 0;
    if (((t += Math.floor(dpr + 0.5) - 1), 2 == buttonBar))
      return (
        (e.fillStyle =
          0 == buttonPressed || (scramble > 0 && 4 == buttonPressed)
            ? darker(buttonBgColor)
            : buttonBgColor),
        e.fillRect(dph, height - buttonHeight, buttonHeight, buttonHeight),
        (e.lineWidth = lineWidth),
        (e.strokeStyle = buttonBorderColor),
        e.beginPath(),
        e.rect(dph, height - buttonHeight - dph, buttonHeight, buttonHeight),
        e.stroke(),
        void drawButton(
          e,
          0,
          buttonHeight / 2,
          height - (buttonHeight + 1) / 2 - t
        )
      );
    if (1 != buttonBar);
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
  }
  var ds = [];
  function drawButton(e, t, r, o) {
    switch (((r = Math.floor(r)), (o = Math.floor(o)), t)) {
      case 0:
        drawRect(e, r - ds[4], o - ds[3], ds[3], ds[6] + 1),
          drawArrow(e, r + ds[4], o, -1);
        break;
      case 1:
        drawRect(e, r + ds[1], o - ds[3], ds[3], ds[6] + 1),
          drawArrow(e, r - ds[1], o, -1);
        break;
      case 2:
        drawRect(e, r - ds[4], o - ds[3], ds[3], ds[6] + 1),
          drawArrow(e, r, o, 1);
        break;
      case 3:
        animating
          ? drawRect(e, r - ds[4], o - ds[3], ds[7], ds[7])
          : drawArrow(e, r - ds[2], o, 1);
        break;
      case 4:
        drawArrow(e, r - ds[2], o, 1);
        break;
      case 5:
        drawRect(e, r - ds[4], o - ds[3], ds[3], ds[6] + 1),
          drawArrow(e, r, o, 1);
        break;
      case 6:
        drawRect(e, r + ds[1], o - ds[3], ds[3], ds[6] + 1),
          drawArrow(e, r - ds[4], o, 1);
        break;
      case 7:
        var a = 7 == buttonPressed ? darker(buttonBgColor) : buttonBgColor;
        drawRect2(e, r - 2 * dpr, o + dpr, buttonHeight, o + buttonHeight, a),
          drawArrow(
            e,
            r + 2 * dpr + buttonHeight / 2 - 3 * dpr,
            o + buttonHeight / 2 + dph,
            -1
          );
        break;
      case 8:
        a = 8 == buttonPressed ? darker(buttonBgColor) : buttonBgColor;
        drawRect2(e, r - 2 * dpr, o + dpr, buttonHeight, o + buttonHeight, a),
          drawArrow(
            e,
            r - dpr + buttonHeight / 2 - 3 * dpr,
            o + buttonHeight / 2 + dph,
            1
          );
    }
  }
  function drawArrow(e, t, r, o) {
    var a = 3 * dpr,
      i = [],
      n = [];
    (i[0] = t),
      (i[1] = t + o),
      (i[2] = t + 4 * dpr * o),
      (i[3] = t + o),
      (i[4] = t),
      (n[0] = r - a),
      (n[1] = r - a),
      (n[2] = r),
      (n[3] = r + a),
      (n[4] = r + a),
      drawArrow2(e, i, n);
  }
  function drawArrow2(e, t, r) {
    e.beginPath(), e.moveTo(t[0] + dph, r[0] + dph);
    for (var o = 1; o < 5; o++) e.lineTo(t[o] + dph, r[o] + dph);
    e.closePath(),
      (e.fillStyle = "white"),
      (e.strokeStyle = "black"),
      e.fill(),
      (e.lineWidth = lineWidth),
      e.stroke();
  }
  function drawRect(e, t, r, o, a) {
    (e.lineWidth = lineWidth),
      e.beginPath(),
      e.rect(t + dph, r + dph, o - 1, a - 1),
      (e.fillStyle = "white"),
      e.fill(),
      (e.strokeStyle = "black"),
      e.stroke();
  }
  function drawRect2(e, t, r, o, a, i) {
    (e.lineWidth = lineWidth),
      e.beginPath(),
      e.rect(t + dph, r + dph, o - 1, a - 1),
      (e.fillStyle = i),
      e.fill(),
      (e.strokeStyle = "black"),
      e.stroke();
  }
  function drawPolygon(e, t, r, o) {
    e.beginPath(),
      e.moveTo(t[0], r[0]),
      e.lineTo(t[1], r[1]),
      e.lineTo(t[2], r[2]),
      e.lineTo(t[3], r[3]),
      e.closePath(),
      (e.strokeStyle = o),
      (e.lineWidth = 0.7 * dpr),
      e.stroke();
  }
  function fillPolygon(e, t, r, o) {
    e.beginPath(),
      e.moveTo(t[0], r[0]),
      e.lineTo(t[1], r[1]),
      e.lineTo(t[2], r[2]),
      e.lineTo(t[3], r[3]),
      e.closePath(),
      (e.fillStyle = o),
      e.fill();
  }
  var superRotate = [
      [0, 1, 2, 3],
      [3, 0, 1, 2],
      [2, 3, 0, 1],
      [1, 2, 3, 0],
    ],
    offsetX,
    offsetY;
  function drawSuperArrow(e, t, r, o, a, i) {
    var n = [],
      s = [];
    if (2 != scw || "#ffffff" != i) {
      for (var l = 0; l < 4; l++)
        (n[l] = Math.floor(t[l] + 0.05 * (t[superRotate[2][l]] - t[l]))),
          (s[l] = Math.floor(r[l] + 0.05 * (r[superRotate[2][l]] - r[l])));
      0 == o && (a = (a + 1) % 4), 4 == o && (a = (a + 3) % 4);
      var c = superRotate[a][0],
        d = superRotate[a][1],
        u = superRotate[a][2],
        g = superRotate[a][3],
        h = 0.26 * (n[u] - n[d]),
        v = 0.26 * (s[u] - s[d]),
        f = (n[c] - n[d]) / 2,
        m = s[d] + (s[c] - s[d]) / 2,
        p = s[u] + (s[g] - s[u]) / 2,
        b = (n[g] - n[u]) / 2,
        w = 1 ^ a;
      (e.fillStyle = i),
        e.beginPath(),
        e.moveTo(n[c] + (n[g] - n[c]) / 2, s[c] + (s[g] - s[c]) / 2),
        e.lineTo(n[w] + f, m),
        e.lineTo(n[w] + h + f, m + v),
        e.lineTo(n[w] + h, s[w] + v),
        (w = (w + 1) % 4),
        e.lineTo(n[w] - h, s[w] - v),
        e.lineTo(n[w] - h + b, p - v),
        e.lineTo(n[w] + b, p),
        e.closePath(),
        e.fill(),
        (e.lineWidth = 0.6 * dpr),
        (e.strokeStyle = "black"),
        e.stroke();
    }
  }
  function colorToHex(e) {
    return "white" == e ? "#FFFFFF" : "black" == e ? "#000000" : "#808080";
  }
  function colorAverage(e) {
    return (
      "#" != e.substring(0, 1) && (e = colorToHex(e)),
      (299 * parseInt(e.substring(1, 3), 16) +
        587 * parseInt(e.substring(3, 5), 16) +
        114 * parseInt(e.substring(5, 7), 16)) /
        1e3
    );
  }
  function brighter(e) {
    "#" != e.substring(0, 1) && (e = colorToHex(e));
    var t = parseInt(e.substring(1, 3), 16),
      r = parseInt(e.substring(3, 5), 16),
      o = parseInt(e.substring(5, 7), 16);
    return rgbToHex(
      (t = Math.floor(1.3 * t)) > 255 ? 255 : t,
      (r = Math.floor(1.3 * r)) > 255 ? 255 : r,
      (o = Math.floor(1.3 * o)) > 255 ? 255 : o
    );
  }
  function darker(e) {
    "#" != e.substring(0, 1) && (e = colorToHex(e));
    var t = parseInt(e.substring(1, 3), 16),
      r = parseInt(e.substring(3, 5), 16),
      o = parseInt(e.substring(5, 7), 16);
    return rgbToHex(
      (t = Math.floor(0.8 * t)),
      (r = Math.floor(0.8 * r)),
      (o = Math.floor(0.8 * o))
    );
  }
  function run(e, t) {
    if (e > nowServing) setTimeout(run, 0, e, t);
    else {
      if (!demo && (0 == move.length || 0 == move[curMove].length))
        return (animating = !1), (drawButtons = !0), void paint();
      if (!moveAnimated) {
        for (var r = move[curMove]; movePos < r.length; ) {
          if (r[movePos] >= 1e3) curInfoText = r[movePos] - 1e3;
          else if (-1 != r[movePos]) {
            var o = (r[movePos] % 4) + 1,
              a = Math.floor(r[movePos] / 4) % 6,
              i = Math.floor(r[movePos] / 24);
            twistLayers(cube, i, 4 == o ? 2 : o, a);
          }
          movePos++;
        }
        return (animating = !1), (drawButtons = !0), paint(), void nowServing++;
      }
      var n,
        s,
        l,
        c,
        d,
        u,
        g = t;
      (interrupted = !1),
        requestAnimationFrame(function e() {
          if (v) {
            if (((v = !1), (u = !1), repeatable))
              g > 0
                ? movePos >= r.length && ((movePos = 0), initInfoText(r))
                : ((curInfoText = -1), 0 == movePos && (movePos = r.length));
            else if ((g > 0 && movePos >= r.length) || (g < 0 && 0 == movePos))
              return (
                (restarted = !1),
                (animating = !1),
                nowServing++,
                (drawButtons = !0),
                void paint()
              );
            (animating = !0), (drawButtons = !0);
          }
          if (
            f &&
            ((f = !1),
            g < 0 &&
              ((b = !1), 0 == movePos ? ((b = !0), (p = !0)) : movePos--),
            !b)
          ) {
            if (((h = !1), -1 == r[movePos])) {
              if ((paint(), !moveOne))
                for (n = Date.now(); Date.now() - n < 1e3; );
            } else
              r[movePos] >= 1e3
                ? (curInfoText = g > 0 ? r[movePos] - 1e3 : -1)
                : (h = !0);
            if (h) {
              (o = (r[movePos] % 4) + 1), (a = Math.floor(r[movePos] / 4) % 6);
              var t = o < 3;
              if (
                (4 == o && (o = 2),
                g < 0 && ((t = !t), (o = 4 - o)),
                (i = Math.floor(r[movePos] / 24)),
                (twisting = !1),
                (natural = !0),
                (spinning = !0),
                (originalAngle = 0),
                faceTwistDirs[i] > 0 && (t = !t),
                moveAnimated)
              ) {
                (d = Math.PI / 2), (c = t ? 1 : -1);
                var w = 67 * speed;
                2 == o && ((d = Math.PI), (w = 67 * doubleSpeed)),
                  (twisting = !0),
                  (twistedLayer = i),
                  (twistedMode = a),
                  splitCube(i),
                  (n = Date.now()),
                  (s = n),
                  (l = (c * d) / w),
                  (currentAngle = 0);
              }
            } else m = !0;
          }
          b ||
            (h &&
              (moveAnimated && currentAngle * c < d
                ? (paint(),
                  (interrupted || restarted) && (m = !0),
                  (s = Date.now()),
                  (currentAngle = l * (s - n)))
                : (m = !0)),
            m &&
              ((m = !1),
              (f = !0),
              h &&
                ((currentAngle = 0),
                (twisting = !1),
                (natural = !0),
                twistLayers(cube, i, o, a),
                (spinning = !1),
                moveAnimated &&
                  (!moveOne && g > 0 && movePos++,
                  paint(),
                  !moveOne && g > 0 && movePos--),
                moveOne && (u = !0)),
              g > 0
                ? (++movePos < r.length &&
                    r[movePos] >= 1e3 &&
                    ((curInfoText = r[movePos] - 1e3), movePos++),
                  movePos == r.length && (demo ? clearDemo(r) : (p = !0)))
                : (curInfoText = -1),
              (interrupted || restarted || u) && (p = !0)));
          if (p)
            return (
              (p = !1),
              (v = !0),
              jobNumber <= nowServing + 1 && (animating = !1),
              (drawButtons = !0),
              (0 == buttonPressed || buttonPressed > 6) && clear(),
              paint(),
              demo && (clear(), (demo = !1)),
              (restarted = !1),
              nowServing++,
              void (1 == movePos && r[0] >= 1e3 && movePos--)
            );
          requestAnimationFrame(e);
        });
      var h = !1,
        v = !0,
        f = !0,
        m = !1,
        p = !1,
        b = !1;
      r = demo ? demoMove[0] : move[curMove];
    }
  }
  function clearDemo(e) {
    movePos = 0;
    for (var t = 0; t < 6; t++)
      for (var r = 0; r < 4; r++)
        (cube[t][r] = initialCube[t][r]), (scube[t][r] = initialSCube[t][r]);
    initialMove.length > 0 &&
      void 0 !== initialMove[curMove] &&
      doMove(cube, initialMove[curMove], 0, initialMove[curMove].length, !1),
      initialReversedMove.length > 0 &&
        void 0 !== initialReversedMove[curMove] &&
        doMove(
          cube,
          initialReversedMove[curMove],
          0,
          initialReversedMove[curMove].length,
          !0
        ),
      initInfoText(e);
  }
  document.addEventListener("touchstart", mousedown, { passive: false }),
    document.addEventListener("touchend", mouseup, { passive: false }),
    document.addEventListener("mousedown", mousedown),
    document.addEventListener("mouseup", mouseup),
    document.addEventListener("contextmenu", contextmenu);
  var mouseIsDown = !1,
    showContextMenu = !0,
    divs = document.getElementsByTagName("div"),
    wrapDiv = divs.length > 0 && "wrap" == divs[0].className;
  function touchfunc(e) {
    wrapDiv ? (divs[0].style.overflow = e) : (document.body.style.overflow = e);
  }
  function mouseup(e) {
    if (
      (mouseIsDown &&
        void 0 !== e.touches &&
        (e.preventDefault(), touchfunc("auto")),
      mouseIsDown
        ? setTimeout(function () {
            showContextMenu = !0;
          }, 100)
        : (showContextMenu = !0),
      (mouseIsDown = !1),
      (dragging = !1),
      pushed)
    )
      (pushed = !1), (drawButtons = !0), paint();
    else if (twisting && !spinning) {
      (twisting = !1), (originalAngle += currentAngle), (currentAngle = 0);
      for (var t = originalAngle; t < 0; ) t += 32 * Math.PI;
      var r = Math.floor((8 * t) / Math.PI) % 16;
      (snap || r % 4 == 0 || r % 4 == 3) &&
        ((r = Math.floor((r + 2) / 4)),
        faceTwistDirs[twistedLayer] > 0 && (r = (4 - r) % 4),
        (originalAngle = 0),
        (natural = !0),
        twistLayers(cube, twistedLayer, r, twistedMode)),
        paint();
    }
  }
  function mousedown(e) {
    var t = canvas.getBoundingClientRect(),
      r = Math.floor(t.left),
      o = Math.floor(t.top);
    if (void 0 === e.touches)
      var a = e.clientX,
        i = e.clientY;
    else (a = e.touches[0].clientX), (i = e.touches[0].clientY);
    a < r ||
      a > r + width / dpr ||
      i < o + (height - progressHeight) / dpr ||
      i > o + (height + buttonHeight) / dpr ||
      (e.preventDefault(),
      (mouseIsDown = !0),
      (showContextMenu = !1),
      void 0 !== e.touches && touchfunc("hidden"),
      (offsetX = r),
      (offsetY = o),
      (lastDragX = lastX = getX(e)),
      (lastDragY = lastY = getY(e)),
      (toTwist = !1),
      (buttonPressed = selectButton(lastX, lastY)) >= 0
        ? button()
        : progressHeight > 0 &&
          move.length > 0 &&
          move[curMove].length > 0 &&
          lastY > height - progressHeight &&
          lastY <= height
        ? clickProgress && (stopAnimation(), progress(jobNumber++))
        : null);
  }
  function button() {
    (pushed = !0),
      3 == buttonPressed
        ? animating
          ? stopAnimation()
          : startAnimation(0)
        : 0 == buttonPressed
        ? scramble > 0 && 2 == buttonBar
          ? 1 == scrambleToggle
            ? ((scrambleToggle = !1), stopAnimation(), clear())
            : ((scrambleToggle = !0),
              startAnimation(buttonAction[(buttonPressed = 6)]))
          : (stopAnimation(), clear())
        : 7 == buttonPressed || 8 == buttonPressed
        ? (stopAnimation(),
          setTimeout(clear, 0),
          (curMove =
            7 == buttonPressed
              ? curMove > 0
                ? curMove - 1
                : move.length - 1
              : curMove < move.length - 1
              ? curMove + 1
              : 0))
        : startAnimation(buttonAction[buttonPressed]),
      (drawButtons = !0),
      paint();
  }
  function progress(e) {
    if (e > nowServing) setTimeout(progress, 0, e);
    else {
      var t = realMoveLength(move[curMove]),
        r = Math.floor((((lastX - 1) * t * 2) / (width - 2) + 1) / 2);
      (r = Math.max(0, Math.min(t, r))) > 0 &&
        (r = arrayMovePos(move[curMove], r)),
        r > movePos && doMove(cube, move[curMove], movePos, r - movePos, !1),
        r < movePos && doMove(cube, move[curMove], r, movePos - r, !0),
        (movePos = r),
        (dragging = !0),
        paint(),
        (animating = !1),
        nowServing++;
    }
  }
  var eyeD = [],
    timer,
    canvas,
    graphics,
    dpr,
    dph,
    lineWidth,
    ubuttonHeight,
    uprogressHeight,
    utextHeight,
    parNode;
  function getX(e) {
    return void 0 === e.touches
      ? (e.clientX - offsetX) * dpr
      : (e.touches[0].clientX - offsetX) * dpr;
  }
  function getY(e) {
    return void 0 === e.touches
      ? (e.clientY - offsetY) * dpr
      : (e.touches[0].clientY - offsetY) * dpr;
  }
  function contextmenu(e) {
    showContextMenu || e.preventDefault();
  }
  function resize() {
    clearTimeout(timer),
      (timer = setTimeout(function () {
        scaleCanvas(), (drawButtons = !0), paint();
      }, 20));
  }
  function init2() {
    (graphics = canvas.getContext("2d")),
      (ubuttonHeight = buttonHeight),
      (uprogressHeight = progressHeight),
      (utextHeight = textHeight),
      scaleCanvas(),
      parNode.appendChild(canvas),
      paint();
  }
  function scaleCanvas() {
    (height = parNode.clientHeight - 1),
      (width = parNode.clientWidth - 1),
      setCanvasCssSize(),
      (dpr = devicePixelRatio),
      (dph = dpr / 2),
      (height = Math.floor(height * dpr)),
      (width = Math.floor(width * dpr)),
      setCanvasSize(),
      (lineWidth = dpr),
      (buttonHeight = Math.floor(ubuttonHeight * dpr)),
      (progressHeight = Math.floor(uprogressHeight * dpr)),
      (textHeight = Math.floor(utextHeight * dpr));
    for (var e = 1; e < 10; e++) ds[e] = e * dpr;
    for (e = 0; e < textOffsetInit.length; e++)
      textOffset[e] = textOffsetInit[e] * dpr;
    1 == buttonBar && (height -= buttonHeight);
  }
  function setCanvasCssSize() {
    (canvas.style.width = width + "px"), (canvas.style.height = height + "px");
  }
  function setCanvasSize() {
    (canvas.width = width), (canvas.height = height);
  }
  function randMoves(e, t) {
    var r,
      o,
      a = ["R", "L", "F", "B", "U", "D"],
      i = ["", "m", "n"],
      n = ["", "2", "'"],
      s = -1,
      l = -1,
      c = -1,
      d = "";
    0 == t && (t = 10 * e);
    for (var u = 0; u < t; u++) {
      for (; s == l || (Math.floor(s / 2) == Math.floor(l / 2) && s == c); )
        s = Math.floor(6 * Math.random());
      (c = l),
        (l = s),
        (r = Math.floor(3 * Math.random())),
        e <= 3
          ? (d += "" + a[s] + n[r] + " ")
          : ((o = Math.floor(Math.random() * (e > 4 ? 3 : 2))),
            5 == e && 1 == o && (o = 0),
            (d += "" + a[s] + i[o] + n[r] + " "));
    }
    return d;
  }
  window.addEventListener("resize", resize);
  var searchParams = [];
  function parseSearchParams() {
    for (var e = params.split("&"), t = 0; t < e.length; t++) {
      var r = e[t].split("=");
      void 0 !== r[1] && (searchParams[r[0]] = decodeURIComponent(r[1].trim()));
    }
  }
  function init0() {
    (canvas = document.createElement("canvas")),
      void 0 !== params && parseSearchParams();
    var e = getParameter("id");
    if (null != e) (parNode = document.getElementById(e)).innerHTML = "";
    else if (null != document.currentScript)
      parNode = document.currentScript.parentNode;
    else {
      var t = document.getElementsByTagName("script"),
        r = t[t.length - 1];
      parNode = r.parentNode;
    }
    for (var o = 0; o < 6; o++)
      (cube[o] = []),
        (scube[o] = []),
        (initialCube[o] = []),
        (initialSCube[o] = []);
    for (o = 0; o < 12; o++) (dragCornersX[o] = []), (dragCornersY[o] = []);
    (curMove = 0),
      (originalAngle = 0),
      onModuleLoad(),
      null != parNode.id && init_direct_access(parNode.id);
  }
  function init_direct_access(id) {
    for (var s in window)
      if ("acjs_" == s.substr(0, 5)) {
        var g = eval(s),
          l = s.substr(5);
        Array.isArray(g)
          ? exists(l)
            ? (g[id] = eval(l))
            : console.log(l + " does not exist in animcube")
          : console.log(s + " is not an array");
      }
  }
  function get_var(v) {
    if (exists(v)) return eval(v);
    console.log(v + " does not exist in animcube");
  }
  function put_var(v, val, type) {
    exists(v) &&
      ("s" == type
        ? eval(v + "='" + val + "'")
        : "n" == type && eval(v + "=" + Number(val)));
  }
  function exists(s) {
    try {
      return typeof eval(s);
    } catch {
      return !1;
    }
  }
  init0();
}

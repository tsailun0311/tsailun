"use strict";
function AnimCube4(params) {
  var cubeDim = 4,
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
    signNotation,
    wcaNotation,
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
      [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3],
      [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    ];
  function onModuleLoad() {
    var e = getParameter("config");
    if (null == e) init();
    else {
      var r = location.pathname,
        t = r.substring(r.lastIndexOf("/") + 1);
      loadConfigFile(0 == t.length ? r + e : r.replace(t, e));
    }
  }
  function loadConfigFile(e) {
    var r = new XMLHttpRequest();
    (r.onreadystatechange = function () {
      4 == r.readyState &&
        (200 == r.status
          ? parseConfigFile(r.responseText)
          : console.log("Error loading config file: " + e),
        init());
    }),
      r.open("GET", e, !0),
      r.send();
  }
  function parseConfigFile(e) {
    for (var r = e.split("\n"), t = 0; t < r.length; t++) {
      var o = r[t].split("=");
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
      for (var r = 0, t = 0; r < 10 && t < e.length; r++, t += 6) {
        var o = e.substr(t, 6);
        6 == o.length && validateColor(o) && (colors[r] = "#" + o);
      }
    for (r = 0; r < 6; r++) for (t = 0; t < 16; t++) cube[r][t] = r + 10;
    if (null != (e = getParameter("supercube")) && "1" == e) {
      (superCube = !0), setBorderWidth(0.06);
      for (r = 0; r < 16; r++) cube[0][r] = 22;
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
      for (r = 0; r < e.length; r++)
        e.charAt(r) >= "0" &&
          e.charAt(r) <= "9" &&
          (borderWidth = 10 * borderWidth + parseInt(e[r]));
      borderWidth >= 0 &&
        borderWidth <= 20 &&
        setBorderWidth(borderWidth / 100);
    }
    setBorderWidth(borderWidth / 100);
    if (superCube)
      for (r = 0; r < 6; r++) for (t = 0; t < 16; t++) scube[r][t] = 0;
    var a = "lluuu";
    if (null != (e = getParameter("colorscheme")) && 6 == e.length)
      for (r = 0; r < 6; r++) {
        var i = 23;
        for (t = 0; t < 23; t++)
          if (e[r].toLowerCase() == "0123456789wyorgbldmcpnk".charAt(t)) {
            i = t;
            break;
          }
        for (t = 0; t < 16; t++) cube[r][t] = i;
      }
    cube[0] = [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11];
    cube[1] = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    cube[2] = [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13];
    cube[3] = [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12];
    cube[4] = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
    cube[5] = [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14];
    if (
      ("1" == (e = getParameter("scramble"))
        ? (scramble = 1)
        : "2" == e && (scramble = 2),
      2 == scramble)
    )
      for (r = 0; r < 6; r++)
        for (t = 0; t < 16; t++)
          (initialCube[r][t] = cube[r][t]), (initialSCube[r][t] = scube[r][t]);
    if (0 == scramble) {
      if (null != (e = getParameter("pos")) && 96 == e.length) {
        (a = "uuuuff"), "gray" == bgColor && (bgColor = "white");
        for (r = 0; r < 6; r++) {
          var n = posFaceTransform[r];
          for (t = 0; t < 16; t++) {
            var s = posFaceletTransform[r][t];
            cube[n][s] = 23;
            for (var l = 0; l < 14; l++)
              if (e.charAt(16 * r + t) == "DFECABdfecabgh".charAt(l)) {
                cube[n][s] = l + 4;
                break;
              }
          }
        }
      }
      if (null != (e = getParameter("facelets")) && 96 == e.length)
        for (r = 0; r < 6; r++)
          for (t = 0; t < 16; t++) {
            cube[r][t] = 23;
            for (l = 0; l < 23; l++)
              if (
                e[16 * r + t].toLowerCase() ==
                "0123456789wyorgbldmcpnk".charAt(l)
              ) {
                cube[r][t] = l;
                break;
              }
          }
      if (null != (e = getParameter("superfacelets")) && 96 == e.length)
        for (r = 0; r < 6; r++)
          for (t = 0; t < 16; t++)
            for (l = 0; l < 4; l++)
              if (e[16 * r + t].toLowerCase() == "0123".charAt(l)) {
                scube[r][t] = l;
                break;
              }
    }
    if (
      ((moveText = 0),
      (yzAlt = !0),
      (signNotation = !1),
      null != (e = getParameter("sign")) &&
        "1" == e &&
        ((signNotation = !0), (moveText = 5), (yzAlt = !0)),
      (wcaNotation = !0),
      null != (e = getParameter("wca")) &&
        "1" == e &&
        ((wcaNotation = !0), (moveText = 6), (yzAlt = !0)),
      null != (e = getParameter("yz")) &&
        ("0" == e ? (yzAlt = !1) : "1" == e && (yzAlt = !0)),
      null != (e = getParameter("randmoves")))
    ) {
      var c = 0;
      for (r = 0; r < e.length; r++)
        e.charAt(r) >= "0" &&
          e.charAt(r) <= "9" &&
          (c = 10 * c + parseInt(e[r]));
      c > 0 && (randMoveCount = c);
    }
    ("random" == (e = getParameter("move")) || scramble > 0) &&
      (e = randMoves(4, randMoveCount)),
      (move = null == e ? [] : getMove(e, !0)),
      (movePos = 0),
      (curInfoText = -1),
      (initialReversedMove = move),
      0 == scramble &&
        (null != (e = getParameter("initmove")) &&
          ("random" == e && (e = randMoves(4, randMoveCount)),
          (initialMove = "#" == e ? move : getMove(e, !1))),
        null != (e = getParameter("initrevmove")) &&
          ("random" == e && (e = randMoves(4, randMoveCount)),
          (initialReversedMove = "#" == e ? move : getMove(e, !1))),
        null != (e = getParameter("demo")) &&
          ("random" == e && (e = randMoves(4, randMoveCount)),
          (demoMove = "#" == e ? move : getMove(e, !0)).length > 0 &&
            demoMove[0].length > 0 &&
            (demo = !0))),
      (e = getParameter("position")),
      vNorm(vMul(eyeY, eye, eyeX)),
      null == e && (e = a);
    var d = Math.PI / 12;
    for (r = 0; r < e.length; r++) {
      var u = d;
      switch (e[r].toLowerCase()) {
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
      for (r = 0; r < e.length; r++)
        e.charAt(r) >= "0" &&
          e.charAt(r) <= "9" &&
          (speed = 10 * speed + parseInt(e[r]));
    if (null != (e = getParameter("doublespeed")))
      for (r = 0; r < e.length; r++)
        e.charAt(r) >= "0" &&
          e.charAt(r) <= "9" &&
          (doubleSpeed = 10 * doubleSpeed + parseInt(e[r]));
    if (
      (0 == speed && (speed = 10),
      0 == doubleSpeed && (doubleSpeed = (3 * speed) / 2),
      (persp = 0),
      null == (e = getParameter("perspective")))
    )
      persp = 2;
    else
      for (r = 0; r < e.length; r++)
        e.charAt(r) >= "0" &&
          e.charAt(r) <= "9" &&
          (persp = 10 * persp + parseInt(e[r]));
    var g,
      h = 1;
    if (null != (e = getParameter("scale")))
      for (r = 0; r < e.length; r++)
        e.charAt(r) >= "0" &&
          e.charAt(r) <= "9" &&
          (h = 10 * h + parseInt(e[r]));
    if (
      ((scale = 1 / (1 + h / 10)),
      (hint = !0),
      null != (e = getParameter("hint")))
    ) {
      (hint = !0), (faceShift = 0);
      for (r = 0; r < e.length; r++)
        e.charAt(r) >= "0" &&
          e.charAt(r) <= "9" &&
          (faceShift = 10 * faceShift + parseInt(e[r]));
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
      : "5" == e
      ? (moveText = 5)
      : "6" == e && (moveText = 6),
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
    for (r = 0; r < 6; r++)
      for (t = 0; t < 16; t++)
        (initialCube[r][t] = cube[r][t]), (initialSCube[r][t] = scube[r][t]);
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
    for (r = 0; r < 3; r++)
      (initialEye[r] = eye[r]),
        (initialEyeX[r] = eyeX[r]),
        (initialEyeY[r] = eyeY[r]);
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
    var r = searchParams[e];
    return void 0 === r ? config[e] : r;
  }
  function setBorderWidth(e) {
    (border[0][0] = border[0][1] = border[1][1] = border[3][0] = e),
      (border[1][0] = border[2][0] = border[2][1] = border[3][1] = 1 - e);
  }
  var moveModes = [
      0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2,
    ],
    moveCodes = [0, 1, 2, 3, 4, 5, 1, 2, 4, 5, 2, 0, 5, 2, 0, 0, 1, 2, 3, 4, 5];
  function getMove(e, r) {
    if (r) {
      for (var t = e.indexOf("{"); -1 != t; ) t = e.indexOf("{", t + 1);
      if (null == infoText) (curInfoText = 0), (infoText = []);
      else {
        for (var o = [], a = 0; a < infoText.length; a++) o[a] = infoText[a];
        (curInfoText = infoText.length), (infoText = o);
      }
    }
    var i = 1;
    for (t = e.indexOf(";"); -1 != t; ) i++, (t = e.indexOf(";", t + 1));
    var n = [],
      s = 0;
    for (t = e.indexOf(";"), i = 0; -1 != t; )
      (n[i] = getMovePart(e.substring(s, t), r, i++)),
        (s = t + 1),
        (t = e.indexOf(";", s));
    return (n[i] = getMovePart(e.substring(s), r, i)), n;
  }
  var modeChar = ["m", "t", "c", "s", "a", "w"];
  function getMovePart(e, r, t) {
    if (
      (wcaNotation
        ? (e = convertNotation4((e = wca_to_sign(e))))
        : signNotation && (e = convertNotation4(e)),
      "#" == e.trim() && void 0 !== move[t])
    )
      return move[t];
    var o = 0,
      a = [],
      i = "UDFBLRESMXYZxyzudfblr";
    1 == yzAlt && (i = "UDFBLRESMXZYxzyudfblr");
    for (var n = 0; n < e.length; n++)
      if ("." == e.charAt(n)) (a[o] = -1), o++;
      else if ("{" == e.charAt(n)) {
        n++;
        for (var s = ""; n < e.length && "}" != e.charAt(n); )
          r && (s += e.charAt(n)), n++;
        r &&
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
            if (((a[o] = 28 * moveCodes[l]), n < e.length && 0 == moveModes[l]))
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
  function convertNotation4(e) {
    return (
      (e = replaceMoves(
        (e = e
          .replace(/^e| e/g, " Dw")
          .replace(/^s| s/g, " Fw")
          .replace(/^m| m/g, " Lw")),
        2,
        "m",
        0
      )),
      (e = replaceMoves(e, 2, "t", 1))
    );
  }
  var faces = ["U", "D", "F", "B", "L", "R"];
  function replaceMoves(e, r, t, o) {
    for (var a = 0; a < 6; a++) {
      var i = 0 == o ? faces[a] : faces[a].toLowerCase(),
        n = new RegExp(r + i, "g");
      e = e.replace(n, faces[a] + t);
    }
    return e;
  }
  function wca_to_sign(e) {
    for (var r = 0; r < 6; r++) {
      var t = new RegExp(faces[r] + "w", "g");
      e = e.replace(t, faces[r].toLowerCase());
    }
    return e;
  }
  function moveTextFunc(e, r, t) {
    if (r >= e.length) return "";
    for (var o = "", a = r; a < t; a++) {
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
        ["Uw", "Dw", "Fw", "Bw", "Lw", "Rw"],
      ],
      [
        ["U", "D", "F", "B", "L", "R"],
        ["~E", "E", "S", "~S", "M", "~M"],
        ["u", "d", "f", "b", "l", "r"],
        ["Z", "~Z", "Y", "~Y", "~X", "X"],
        ["Us", "Ds", "Fs", "Bs", "Ls", "Rs"],
        ["Ua", "Da", "Fa", "Ba", "La", "Ra"],
        ["Uw", "Dw", "Fw", "Bw", "Lw", "Rw"],
      ],
      [
        ["U", "D", "F", "B", "L", "R"],
        ["~E", "E", "S", "~S", "M", "~M"],
        ["u", "d", "f", "b", "l", "r"],
        ["Y", "~Y", "Z", "~Z", "~X", "X"],
        ["Us", "Ds", "Fs", "Bs", "Ls", "Rs"],
        ["Ua", "Da", "Fa", "Ba", "La", "Ra"],
        ["Uw", "Dw", "Fw", "Bw", "Lw", "Rw"],
      ],
      [
        ["U", "D", "F", "B", "L", "R"],
        ["u", "d", "f", "b", "l", "r"],
        ["Uu", "Dd", "Ff", "Bb", "Ll", "Rr"],
        ["QU", "QD", "QF", "QB", "QL", "QR"],
        ["UD'", "DU'", "FB'", "BF'", "LR'", "RL'"],
        ["UD", "DU", "FB", "BF", "LR", "RL"],
        ["ud'", "du'", "fb'", "bf'", "lr'", "rl'"],
      ],
      [
        ["U", "D", "F", "B", "L", "R"],
        ["2U", "2D", "2F", "2B", "2L", "2R"],
        ["u", "d", "f", "b", "l", "r"],
        ["y", "~y", "z", "~z", "~x", "x"],
        ["Us", "Ds", "Fs", "Bs", "Ls", "Rs"],
        ["Ua", "Da", "Fa", "Ba", "La", "Ra"],
        ["~e", "e", "s", "~s", "m", "~m"],
      ],
      [
        ["U", "D", "F", "B", "L", "R"],
        ["2U", "2D", "2F", "2B", "2L", "2R"],
        ["Uw", "Dw", "Fw", "Bw", "Lw", "Rw"],
        ["y", "~y", "z", "~z", "~x", "x"],
        ["Us", "Ds", "Fs", "Bs", "Ls", "Rs"],
        ["Ua", "Da", "Fa", "Ba", "La", "Ra"],
        ["~e", "e", "s", "~s", "m", "~m"],
      ],
    ],
    modifierStrings = ["", "2", "'", "2'"];
  function turnTextFunc(e, r) {
    if (r >= e.length) return "";
    if (e[r] >= 1e3) return "";
    if (-1 == e[r]) return ".";
    var t =
      turnSymbol[moveText - 1][Math.floor(e[r] / 4) % 7][Math.floor(e[r] / 28)];
    return "~" == t.charAt(0)
      ? t.substring(1) + modifierStrings[(e[r] + 2) % 4]
      : t + modifierStrings[e[r] % 4];
  }
  var metricChar = ["", "q", "h", "s"];
  function realMoveLength(e) {
    for (var r = 0, t = 0; t < e.length; t++) e[t] < 1e3 && r++;
    return r;
  }
  function realMovePos(e, r) {
    for (var t = 0, o = 0; o < r; o++) e[o] < 1e3 && t++;
    return t;
  }
  function arrayMovePos(e, r) {
    for (var t = 0, o = 0; ; ) {
      for (; t < e.length && e[t] >= 1e3; ) t++;
      if (o == r) break;
      t < e.length && (o++, t++);
    }
    return t;
  }
  function moveLength(e, r) {
    for (var t = 0, o = 0; o < e.length && (o < r || r < 0); o++)
      t += turnLength(e[o]);
    return t;
  }
  function turnLength(e) {
    if (e < 0 || e >= 1e3) return 0;
    var r = e % 4,
      t = Math.floor(e / 4) % 7,
      o = 1;
    switch (metric) {
      case 1:
        (1 != r && 3 != r) || (o *= 2);
      case 2:
        (1 == t || t > 3) && (o *= 2);
      case 3:
        3 == t && (o = 0), 3 != metric || (4 != t && 5 != t) || (o *= 2);
    }
    return o;
  }
  function initInfoText(e) {
    curInfoText = e.length > 0 && e[0] >= 1e3 ? e[0] - 1e3 : -1;
  }
  function doMove(e, r, t, o, a) {
    for (var i = a ? t + o : t; ; ) {
      if (a) {
        if (i <= t) break;
        i--;
      }
      if (r[i] >= 1e3) curInfoText = a ? -1 : r[i] - 1e3;
      else if (r[i] >= 0) {
        var n = (r[i] % 4) + 1,
          s = Math.floor(r[i] / 4) % 7;
        4 == n && (n = 2),
          a && (n = 4 - n),
          twistLayers(e, Math.floor(r[i] / 28), n, s);
      }
      if (!a && ++i >= t + o) break;
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
      for (var r = 0; r < 16; r++)
        (cube[e][r] = initialCube[e][r]), (scube[e][r] = initialSCube[e][r]);
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
      scramble > 0 && (move = getMove(randMoves(4, randMoveCount), !1)),
      2 == scramble && doMove(cube, move[0], 0, move[0].length, !0);
    for (e = 0; e < 3; e++)
      (eye[e] = initialEye[e]),
        (eyeX[e] = initialEyeX[e]),
        (eyeY[e] = initialEyeY[e]);
    setTimeout(paint, 0);
  }
  var cubeBlocks = [
      [
        [0, 4],
        [0, 4],
      ],
      [
        [0, 4],
        [0, 4],
      ],
      [
        [0, 4],
        [0, 4],
      ],
      [
        [0, 4],
        [0, 4],
      ],
      [
        [0, 4],
        [0, 4],
      ],
      [
        [0, 4],
        [0, 4],
      ],
    ],
    topBlocks = [],
    midBlocks = [],
    midBlocks2 = [],
    botBlocks = [],
    topBlockTable = [
      [
        [0, 0],
        [0, 0],
      ],
      [
        [0, 4],
        [0, 4],
      ],
      [
        [0, 4],
        [0, 1],
      ],
      [
        [0, 1],
        [0, 4],
      ],
      [
        [0, 4],
        [3, 4],
      ],
      [
        [3, 4],
        [0, 4],
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
    ],
    midBlockTable = [
      [
        [0, 0],
        [0, 0],
      ],
      [
        [0, 4],
        [2, 3],
      ],
      [
        [0, 4],
        [1, 2],
      ],
      [
        [2, 3],
        [0, 4],
      ],
      [
        [1, 2],
        [0, 4],
      ],
    ],
    midBlockFaceDim = [
      [0, 0, 4, 4, 2, 4],
      [0, 0, 3, 3, 1, 3],
      [2, 4, 0, 0, 4, 2],
      [1, 3, 0, 0, 3, 1],
      [4, 2, 2, 1, 0, 0],
      [3, 1, 1, 2, 0, 0],
    ],
    midBlockFaceDim2 = [
      [0, 0, 3, 3, 1, 3],
      [0, 0, 4, 4, 2, 4],
      [1, 3, 0, 0, 3, 1],
      [2, 4, 0, 0, 4, 2],
      [3, 1, 1, 2, 0, 0],
      [4, 2, 2, 1, 0, 0],
    ];
  function splitCube(e) {
    for (var r = 0; r < 6; r++)
      (topBlocks[r] = topBlockTable[topBlockFaceDim[e][r]]),
        (botBlocks[r] = topBlockTable[botBlockFaceDim[e][r]]),
        (midBlocks[r] = midBlockTable[midBlockFaceDim[e][r]]),
        (midBlocks2[r] = midBlockTable[midBlockFaceDim2[e][r]]);
    natural = !1;
  }
  function twistLayers(e, r, t, o) {
    switch (o) {
      case 3:
        twistLayer(e, r, 4 - t, !1),
          twistLayer(e, r, 4 - t, !0),
          twistLayer(e, 1 ^ r, t, !0),
          twistLayer(e, 1 ^ r, t, !1);
        break;
      case 2:
        twistLayer(e, r, 4 - t, !1);
      case 1:
        twistLayer(e, r, 4 - t, !0);
        break;
      case 6:
        twistLayer(e, r, 4 - t, !0), twistLayer(e, 1 ^ r, t, !0);
        break;
      case 5:
        twistLayer(e, 1 ^ r, 4 - t, !1), twistLayer(e, r, 4 - t, !1);
        break;
      case 4:
        twistLayer(e, 1 ^ r, t, !1);
      default:
        twistLayer(e, r, 4 - t, !1);
    }
  }
  var cycleOrder = [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4],
    cycleOrder2 = [5, 6, 10, 9],
    cycleFactors = [1, 4, -1, -4, 1, 4, -1, -4],
    cycleOffsets = [0, 3, 15, 12, 4, 2, 11, 13],
    cycleLayerSides = [
      [3, 3, 3, 0],
      [2, 1, 1, 1],
      [3, 3, 0, 0],
      [2, 1, 1, 2],
      [3, 2, 0, 0],
      [2, 2, 0, 1],
    ],
    cycleCenters = [
      [7, 7, 7, 4],
      [6, 5, 5, 5],
      [7, 7, 4, 4],
      [6, 5, 5, 6],
      [7, 6, 4, 4],
      [6, 6, 4, 5],
    ],
    twistBuffer = [];
  function twistLayer(e, r, t, o) {
    twistLayer2(e, r, t, o),
      1 == superCube &&
        t > 0 &&
        t < 4 &&
        (twistLayer2(scube, r, t, o), twistSuperLayer(r, t, o));
  }
  function twistLayer2(e, r, t, o) {
    if (!o) {
      for (var a = 0; a < 12; a++)
        twistBuffer[(a + 3 * t) % 12] = e[r][cycleOrder[a]];
      for (a = 0; a < 12; a++) e[r][cycleOrder[a]] = twistBuffer[a];
      for (a = 0; a < 4; a++) twistBuffer[(a + t) % 4] = e[r][cycleOrder2[a]];
      for (a = 0; a < 4; a++) e[r][cycleOrder2[a]] = twistBuffer[a];
    }
    var i = 4 * t;
    for (a = 0; a < 4; a++)
      for (
        var n = adjacentFaces[r][a],
          s = o ? cycleCenters[r][a] : cycleLayerSides[r][a],
          l = cycleFactors[s],
          c = cycleOffsets[s],
          d = 0;
        d < 4;
        d++, i++
      )
        twistBuffer[i % 16] = e[n][d * l + c];
    for (a = 0, i = 0; a < 4; a++)
      for (
        n = adjacentFaces[r][a],
          s = o ? cycleCenters[r][a] : cycleLayerSides[r][a],
          l = cycleFactors[s],
          c = cycleOffsets[s],
          d = 0;
        d < 4;
        d++, i++
      )
        e[n][d * l + c] = twistBuffer[i];
  }
  var superTwistArr = [
      [
        [0, 1, 0],
        [0, 4, 1],
        [0, 4, 4],
        [0, 1, 5],
      ],
      [
        [12, 1, 0],
        [3, 4, 1],
        [3, 4, 4],
        [12, 1, 5],
      ],
      [
        [4, 1, 0],
        [1, 4, 1],
        [1, 4, 4],
        [4, 1, 5],
      ],
      [
        [8, 1, 0],
        [2, 4, 1],
        [2, 4, 4],
        [8, 1, 5],
      ],
      [
        [12, 1, 3],
        [0, 1, 1],
        [0, 1, 2],
        [0, 4, 0],
      ],
      [
        [0, 1, 3],
        [3, 4, 0],
        [12, 1, 2],
        [12, 1, 1],
      ],
      [
        [8, 1, 3],
        [4, 1, 1],
        [4, 1, 2],
        [1, 4, 0],
      ],
      [
        [4, 1, 3],
        [2, 4, 0],
        [8, 1, 2],
        [8, 1, 1],
      ],
    ],
    width,
    height,
    lastX,
    lastY,
    lastDragX,
    lastDragY,
    dragAreas;
  function twistSuperLayer(e, r, t) {
    if (0 == t) {
      for (var o = 0; o < 16; o++) scube[e][o] = (scube[e][o] + 4 - r) % 4;
      2 == e && superTwist2(0, 4 - r),
        3 == e && superTwist2(1, r),
        4 == e && superTwist(4, r),
        5 == e && superTwist(5, r);
    }
    1 == t &&
      (2 == e && superTwist2(2, 4 - r),
      3 == e && superTwist2(3, r),
      4 == e && superTwist(6, r),
      5 == e && superTwist(7, r));
  }
  function superTwist(e, r) {
    superTwist1(superTwistArr[e][0]), superTwist1(superTwistArr[e][r]);
  }
  function superTwist1(e) {
    for (var r = e[0], t = 0; t < 4; r += e[1], t++)
      scube[e[2]][r] = (scube[e[2]][r] + 2) % 4;
  }
  function superTwist2(e, r) {
    for (var t = 0; t < 4; t++)
      for (var o = superTwistArr[e][t], a = o[0], i = 0; i < 4; a += o[1], i++)
        scube[o[2]][a] = (scube[o[2]][a] + r) % 4;
  }
  var dragCornersX = [],
    dragCornersY = [],
    dragDirsX = [],
    dragDirsY = [],
    dragBlocks = [
      [
        [0, 0],
        [4, 0],
        [4, 1],
        [0, 1],
      ],
      [
        [4, 0],
        [4, 4],
        [3, 4],
        [3, 0],
      ],
      [
        [4, 4],
        [0, 4],
        [0, 3],
        [4, 3],
      ],
      [
        [0, 4],
        [0, 0],
        [1, 0],
        [1, 4],
      ],
      [
        [0, 1],
        [4, 1],
        [4, 2],
        [0, 2],
      ],
      [
        [3, 0],
        [3, 4],
        [2, 4],
        [2, 0],
      ],
      [
        [0, 2],
        [4, 2],
        [4, 3],
        [0, 3],
      ],
      [
        [2, 0],
        [2, 4],
        [1, 4],
        [1, 0],
      ],
    ],
    areaDirs = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ],
    twistDirs = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, -1, 1, -1, 1, -1, 1, -1],
      [1, -1, 1, -1, 1, -1, 1, -1],
      [-1, 1, -1, 1, -1, 1, -1, 1],
      [1, -1, 1, -1, 1, -1, 1, -1],
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
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 2],
      [0, 1, 1, 0],
    ],
    blockArray = [],
    blockMode = [
      [0, 2, 2, 2],
      [2, 1, 2, 2],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
      [0, 2, 2, 0],
      [0, 2, 2, 0],
      [0, 2, 2, 0],
    ],
    drawOrder = [
      [0, 1, 2, 3],
      [0, 1, 3, 2],
      [0, 3, 2, 1],
      [3, 2, 1, 0],
    ],
    sliceNormals = [];
  function initSliceNormals() {
    for (var e = [], r = [], t = 0; t < 6; t++) {
      sliceNormals[t] = [];
      for (var o = 0; o < cubeDim; o++)
        (sliceNormals[t][o] = []),
          vCopy(e, faceNormals[t]),
          vScale(vCopy(r, e), 2 / cubeDim),
          vScale(vSub(e, vScale(r, o)), scale),
          vCopy(sliceNormals[t][o], e);
    }
  }
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
      hint && fixBlock(eye, eyeX, eyeY, cubeBlocks, 3, 0, 1),
        fixBlock(eye, eyeX, eyeY, cubeBlocks, 3, 0, 0);
    else {
      for (
        var r = Math.cos(originalAngle + currentAngle),
          t = Math.sin(originalAngle + currentAngle) * rotSign[twistedLayer],
          o = 0;
        o < 3;
        o++
      ) {
        (tempEye[o] = 0), (tempEyeX[o] = 0);
        for (var a = 0; a < 3; a++) {
          var i = Math.floor(twistedLayer / 2);
          (tempEye[o] +=
            eye[a] *
            (rotVec[i][o][a] + rotCos[i][o][a] * r + rotSin[i][o][a] * t)),
            (tempEyeX[o] +=
              eyeX[a] *
              (rotVec[i][o][a] + rotCos[i][o][a] * r + rotSin[i][o][a] * t));
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
        (blockArray[1] = midBlocks),
        (blockArray[2] = midBlocks2),
        (blockArray[3] = botBlocks);
      var l,
        c,
        d,
        u = [];
      vScale(vCopy(u, eye), 5 + persp);
      for (o = 0; o < cubeDim; o++) {
        if (
          (vSub(vCopy(perspEye, u), sliceNormals[twistedLayer][o]),
          (c = vProd(perspEye, faceNormals[twistedLayer])),
          0 == o)
        )
          l = c < 0 ? 0 : cubeDim - 1;
        else if ((c > 0 && d < 0) || (c < 0 && d > 0)) {
          l = cubeDim - o;
          break;
        }
        d = c;
      }
      if (hint)
        for (o = 0; o < cubeDim; o++) {
          a = drawOrder[l][o];
          var g = eyeOrder[twistedMode][a];
          fixBlock(
            eyeArray[g],
            eyeArrayX[g],
            eyeArrayY[g],
            blockArray[a],
            blockMode[twistedMode][a],
            a,
            1
          );
        }
      for (o = 0; o < cubeDim; o++) {
        (a = drawOrder[l][o]), (g = eyeOrder[twistedMode][a]);
        fixBlock(
          eyeArray[g],
          eyeArrayX[g],
          eyeArrayY[g],
          blockArray[a],
          blockMode[twistedMode][a],
          a,
          0
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
            var h =
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
                h,
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
          var v =
              moveLength(move[curMove], movePos) +
              "/" +
              moveLength(move[curMove], -1) +
              metricChar[metric],
            f = graphics.measureText(v).width,
            m = width - f - 2,
            p = height - progressHeight - Math.floor(4 * dpr);
          moveText > 0
            ? (moveCounter &&
                drawString(graphics, v, outlined ? m - dpr : m, p - textHeight),
              drawMoveTextFunc(graphics, p))
            : moveCounter && drawString(graphics, v, outlined ? m - dpr : m, p);
        }
        if (move.length > 1) {
          graphics.font = "bold " + textHeight + "px helvetica";
          (v = curMove + 1 + "/" + move.length),
            (f = graphics.measureText(v).width),
            (m = width - f - 2 * buttonHeight - Math.floor(5 * dpr));
          drawString(graphics, v, m, adjTextHeight()),
            drawButton(graphics, 7, width - 2 * buttonHeight, 0),
            drawButton(graphics, 8, width - buttonHeight, 0);
        }
      }
      if (curInfoText >= 0) {
        graphics.font = "bold " + textHeight + "px helvetica";
        f = move.length > 1 ? m - 5 * dpr : width;
        wrapText(
          graphics,
          infoText[curInfoText],
          dpr,
          adjTextHeight(),
          f,
          textHeight
        );
      }
    }
    graphics.restore(),
      drawButtons && 0 != buttonBar && drawButtonsFunc(graphics);
  }
  function wrapText(e, r, t, o, a, i) {
    for (var n = r.split(" "), s = "", l = 0; l < n.length; l++) {
      var c = s + n[l] + " ";
      e.measureText(c).width > a && l > 0
        ? (drawString(e, s, t, o), (s = n[l] + " "), (o += i))
        : (s = c);
    }
    drawString(e, s, t, o);
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
  function fixBlock(e, r, t, o, a, i, n) {
    for (var s = 0; s < 8; s++) {
      var l =
          ((u = width < height ? width : height - progressHeight) / 3.7) *
          vProd(cornerCoords[s], r) *
          scale,
        c = (u / 3.7) * vProd(cornerCoords[s], t) * scale;
      (l /=
        1 - (g = (u / (5 + persp)) * vProd(cornerCoords[s], e) * scale) / u),
        (c /= 1 - g / u),
        (coordsX[s] = width / 2 + l),
        (coordsY[s] =
          0 == align
            ? ((height - progressHeight) / 2) * scale - c
            : 1 == align
            ? (height - progressHeight) / 2 - c
            : 2 == align
            ? height -
              progressHeight -
              ((height - progressHeight) / 2) * scale -
              c
            : (height - progressHeight) * (align * (1 - scale) + scale / 2) -
              c);
    }
    for (s = 0; s < 6; s++)
      for (var d = 0; d < 4; d++)
        (cooX[s][d] = coordsX[faceCorners[s][d]]),
          (cooY[s][d] = coordsY[faceCorners[s][d]]);
    if (hint && n) {
      for (s = 0; s < 6; s++)
        if (
          (vSub(vScale(vCopy(perspEye, e), 5 + persp), faceNormals[s]),
          vProd(perspEye, faceNormals[s]) < -(1 - scale))
        ) {
          vScale(vCopy(tempNormal, faceNormals[s]), faceShift);
          var u, g;
          (l =
            ((u = width < height ? width : height - progressHeight) /
              hintHoriz) *
            vProd(tempNormal, r)),
            (c = (u / hintVert) * vProd(tempNormal, t));
          (l /= 1 - (g = (u / (5 + persp)) * vProd(tempNormal, e)) / u),
            (c /= 1 - g / u);
          var h = o[s][0][1] - o[s][0][0],
            v = o[s][1][1] - o[s][1][0];
          if (h > 0 && v > 0)
            for (var f = 0, m = o[s][1][0]; f < v; f++, m++)
              for (var p = 0, b = o[s][0][0]; p < h; p++, b++) {
                for (d = 0; d < 4; d++)
                  getCorners(
                    s,
                    d,
                    fillX,
                    fillY,
                    b + border[d][0],
                    m + border[d][1],
                    mirrored
                  ),
                    (fillX[d] = Math.floor(fillX[d] + (mirrored ? -l : l))),
                    (fillY[d] = Math.floor(fillY[d] - c));
                1 == superCube
                  ? drawSuperArrow(
                      graphics,
                      fillX,
                      fillY,
                      s,
                      scube[s][4 * m + b],
                      colors[cube[s][4 * m + b]]
                    )
                  : (fillPolygon(
                      graphics,
                      fillX,
                      fillY,
                      colors[cube[s][4 * m + b]]
                    ),
                    drawPolygon(
                      graphics,
                      fillX,
                      fillY,
                      hintBorder
                        ? darker(colors[cube[s][4 * m + b]])
                        : colors[cube[s][4 * m + b]]
                    ));
              }
        }
    } else {
      for (s = 0; s < 6; s++) {
        (h = o[s][0][1] - o[s][0][0]), (v = o[s][1][1] - o[s][1][0]);
        if (h <= 0 || v <= 0) {
          var w = (s == twistedLayer ? i : cubeDim - 1 - i) / cubeDim;
          for (d = 0; d < 4; d++) {
            var y = oppositeCorners[s][d];
            (fillX[d] = Math.floor(
              cooX[s][d] + (cooX[1 ^ s][y] - cooX[s][d]) * w
            )),
              (fillY[d] = Math.floor(
                cooY[s][d] + (cooY[1 ^ s][y] - cooY[s][d]) * w
              )),
              mirrored && (fillX[d] = width - fillX[d]);
          }
          fillPolygon(graphics, fillX, fillY, cubeColor);
        } else {
          for (d = 0; d < 4; d++)
            getCorners(
              s,
              d,
              fillX,
              fillY,
              o[s][0][factors[d][0]],
              o[s][1][factors[d][1]],
              mirrored
            );
          fillPolygon(graphics, fillX, fillY, cubeColor);
        }
      }
      for (s = 0; s < 6; s++)
        if (
          (vSub(vScale(vCopy(perspEye, e), 5 + persp), faceNormals[s]),
          vProd(perspEye, faceNormals[s]) > -(1 - scale))
        ) {
          (h = o[s][0][1] - o[s][0][0]), (v = o[s][1][1] - o[s][1][0]);
          if (h > 0 && v > 0)
            for (f = 0, m = o[s][1][0]; f < v; f++, m++)
              for (p = 0, b = o[s][0][0]; p < h; p++, b++) {
                for (d = 0; d < 4; d++)
                  getCorners(
                    s,
                    d,
                    fillX,
                    fillY,
                    b + border[d][0],
                    m + border[d][1],
                    mirrored
                  );
                1 == superCube
                  ? (drawPolygon(graphics, fillX, fillY, "#fdfdfd"),
                    fillPolygon(graphics, fillX, fillY, "#fdfdfd"),
                    drawSuperArrow(
                      graphics,
                      fillX,
                      fillY,
                      s,
                      scube[s][4 * m + b],
                      colors[cube[s][4 * m + b]]
                    ))
                  : (drawPolygon(
                      graphics,
                      fillX,
                      fillY,
                      colors[cube[s][4 * m + b]]
                    ),
                    fillPolygon(
                      graphics,
                      fillX,
                      fillY,
                      colors[cube[s][4 * m + b]]
                    ));
              }
          if (!editable || animating) continue;
          var M = (cooX[s][1] - cooX[s][0] + cooX[s][2] - cooX[s][3]) / 6,
            C = (cooX[s][3] - cooX[s][0] + cooX[s][2] - cooX[s][1]) / 6,
            x = (cooY[s][1] - cooY[s][0] + cooY[s][2] - cooY[s][3]) / 6,
            P = (cooY[s][3] - cooY[s][0] + cooY[s][2] - cooY[s][1]) / 6;
          if (3 == a)
            for (d = 0; d < 8; d++) {
              for (y = 0; y < 4; y++)
                getCorners(
                  s,
                  y,
                  dragCornersX[dragAreas],
                  dragCornersY[dragAreas],
                  dragBlocks[d][y][0],
                  dragBlocks[d][y][1],
                  !1
                );
              if (
                ((dragDirsX[dragAreas] =
                  (M * areaDirs[d][0] + x * areaDirs[d][1]) * twistDirs[s][d]),
                (dragDirsY[dragAreas] =
                  (C * areaDirs[d][0] + P * areaDirs[d][1]) * twistDirs[s][d]),
                (dragLayers[dragAreas] = adjacentFaces[s][d % 4]),
                (dragModes[dragAreas] = Math.floor(d / 4)),
                24 == ++dragAreas)
              )
                break;
            }
          else if (0 == a) {
            if (s != twistedLayer && h > 0 && v > 0) {
              for (
                d =
                  4 == h ? (0 == o[s][1][0] ? 0 : 2) : 0 == o[s][0][0] ? 3 : 1,
                  y = 0;
                y < 4;
                y++
              )
                getCorners(
                  s,
                  y,
                  dragCornersX[dragAreas],
                  dragCornersY[dragAreas],
                  dragBlocks[d][y][0],
                  dragBlocks[d][y][1],
                  !1
                );
              (dragDirsX[dragAreas] =
                (M * areaDirs[d][0] + x * areaDirs[d][1]) * twistDirs[s][d]),
                (dragDirsY[dragAreas] =
                  (C * areaDirs[d][0] + P * areaDirs[d][1]) * twistDirs[s][d]),
                (dragLayers[dragAreas] = twistedLayer),
                (dragModes[dragAreas] = 0),
                dragAreas++;
            }
          } else if (1 == a && s != twistedLayer && h > 0 && v > 0) {
            d = 4 == h ? (1 == o[s][1][0] ? 0 : 2) : 1 == o[s][0][0] ? 3 : 1;
            d += 4;
            for (y = 0; y < 4; y++)
              getCorners(
                s,
                y,
                dragCornersX[dragAreas],
                dragCornersY[dragAreas],
                dragBlocks[d][y][0],
                dragBlocks[d][y][1],
                !1
              );
            (dragDirsX[dragAreas] =
              (M * areaDirs[d][0] + x * areaDirs[d][1]) * twistDirs[s][d]),
              (dragDirsY[dragAreas] =
                (C * areaDirs[d][0] + P * areaDirs[d][1]) * twistDirs[s][d]),
              (dragLayers[dragAreas] = twistedLayer),
              (dragModes[dragAreas] = 1),
              dragAreas++;
          }
        }
    }
  }
  function getCorners(e, r, t, o, a, i, n) {
    (a /= 4), (i /= 4);
    var s = cooX[e][0] + (cooX[e][1] - cooX[e][0]) * a,
      l = cooY[e][0] + (cooY[e][1] - cooY[e][0]) * a,
      c = cooX[e][3] + (cooX[e][2] - cooX[e][3]) * a,
      d = cooY[e][3] + (cooY[e][2] - cooY[e][3]) * a;
    (t[r] = Math.floor(0.5 + s + (c - s) * i)),
      (o[r] = Math.floor(0.5 + l + (d - l) * i)),
      n && (t[r] = width - t[r]);
  }
  var textOffsetInit = [1, 1, -1, -1, -1, 1, 1, -1, -1, 0, 1, 0, 0, 1, 0, -1],
    textOffset = [];
  function drawString(e, r, t, o) {
    if (outlined) {
      e.fillStyle = "black";
      for (var a = 0; a < textOffset.length; a += 2)
        e.fillText(r, t + textOffset[a], o + textOffset[a + 1]);
      e.fillStyle = "white";
    } else e.fillStyle = textColor;
    e.fillText(r, t, o);
  }
  function drawMoveTextFunc(e, r) {
    var t = 0 == movePos ? arrayMovePos(move[curMove], movePos) : movePos,
      o = moveTextFunc(move[curMove], 0, t),
      a = turnTextFunc(move[curMove], t),
      i = moveTextFunc(move[curMove], t + 1, move[curMove].length);
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
      n > 0 && drawString(e, o, c, r),
      s > 0 && drawString(e, a, c + n, r),
      l > 0 && drawString(e, i, c + n + s, r);
  }
  function selectButton(e, r) {
    if (0 == buttonBar) return -1;
    if (
      move.length > 1 &&
      e >= width - 2 * buttonHeight &&
      e < width - buttonHeight &&
      r >= 0 &&
      r < buttonHeight
    )
      return 7;
    if (
      move.length > 1 &&
      e >= width - buttonHeight &&
      e < width &&
      r >= 0 &&
      r < buttonHeight
    )
      return 8;
    if (2 == buttonBar)
      return e >= 0 &&
        e < buttonHeight &&
        r >= height - buttonHeight &&
        r < height
        ? 0
        : -1;
    if (r < height) return -1;
    for (var t = 0, o = 0; o < 4; o++) {
      var a = (width - t) / (4 - o);
      if (e >= t && e < t + a && r >= height && r < height + buttonHeight)
        return o;
      t += a;
    }
    return -1;
  }
  var buttonAction = [-1, 3, 2, -1, 0, 2, 4, -1];
  function vCopy(e, r) {
    return (e[0] = r[0]), (e[1] = r[1]), (e[2] = r[2]), e;
  }
  function vNorm(e) {
    var r = Math.sqrt(vProd(e, e));
    return (e[0] /= r), (e[1] /= r), (e[2] /= r), e;
  }
  function vScale(e, r) {
    return (e[0] *= r), (e[1] *= r), (e[2] *= r), e;
  }
  function vProd(e, r) {
    return e[0] * r[0] + e[1] * r[1] + e[2] * r[2];
  }
  function vAdd(e, r) {
    return (e[0] += r[0]), (e[1] += r[1]), (e[2] += r[2]), e;
  }
  function vSub(e, r) {
    return (e[0] -= r[0]), (e[1] -= r[1]), (e[2] -= r[2]), e;
  }
  function vMul(e, r, t) {
    return (
      (e[0] = r[1] * t[2] - r[2] * t[1]),
      (e[1] = r[2] * t[0] - r[0] * t[2]),
      (e[2] = r[0] * t[1] - r[1] * t[0]),
      e
    );
  }
  function vRotX(e, r) {
    var t = Math.sin(r),
      o = Math.cos(r),
      a = e[1] * o - e[2] * t,
      i = e[1] * t + e[2] * o;
    return (e[1] = a), (e[2] = i), e;
  }
  function vRotY(e, r) {
    var t = Math.sin(r),
      o = Math.cos(r),
      a = e[0] * o - e[2] * t,
      i = e[0] * t + e[2] * o;
    return (e[0] = a), (e[2] = i), e;
  }
  function vRotZ(e, r) {
    var t = Math.sin(r),
      o = Math.cos(r),
      a = e[0] * o - e[1] * t,
      i = e[0] * t + e[1] * o;
    return (e[0] = a), (e[1] = i), e;
  }
  function rgbToHex(e, r, t) {
    return (
      "#" + lpad(e.toString(16)) + lpad(r.toString(16)) + lpad(t.toString(16))
    );
  }
  function lpad(e) {
    return ("00" + e).substring(e.length);
  }
  function validateColor(e) {
    if (6 != e.length) return !1;
    for (var r = 0, t = 0; t < 6; t++)
      for (var o = 0; o < 16; o++)
        if (e.charAt(t).toLowerCase() == "0123456789abcdef".charAt(o)) {
          r++;
          break;
        }
    return 6 == r;
  }
  function setClip(e, r, t, o, a) {
    e.beginPath(),
      e.moveTo(r, t),
      e.lineTo(r + o, t),
      e.lineTo(r + o, t + a),
      e.lineTo(r, t + a),
      e.lineTo(r, t),
      e.closePath(),
      e.clip();
  }
  function drawButtonsFunc(e) {
    var r = buttonHeight % 2 == 0 ? 1 : 0;
    if (((r += Math.floor(dpr + 0.5) - 1), 2 == buttonBar))
      return (
        (e.fillStyle =
          0 == buttonPressed || (scramble > 0 && 6 == buttonPressed)
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
          height - (buttonHeight + 1) / 2 - r
        )
      );
    if (1 != buttonBar);
    else {
      for (var t = 0, o = 0; o < 4; o++) {
        var a = Math.floor((width - t) / (4 - o));
        (e.fillStyle =
          buttonPressed == o ? darker(buttonBgColor) : buttonBgColor),
          e.fillRect(t, height, a, buttonHeight),
          (e.lineWidth = lineWidth),
          (e.strokeStyle = buttonBorderColor),
          e.beginPath(),
          0 == o
            ? e.rect(t + dph, height - dph, a - dpr, buttonHeight)
            : e.rect(t - dph, height - dph, a, buttonHeight),
          e.stroke(),
          (e.strokeStyle = "black"),
          drawButton(e, o, t + a / 2, height + buttonHeight / 2 - r),
          (t += a);
      }
      drawButtons = !1;
    }
  }
  var ds = [];
  function drawButton(e, r, t, o) {
    switch (((t = Math.floor(t)), (o = Math.floor(o)), r)) {
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
      case 4:
        drawArrow(e, t - ds[2], o, 1);
        break;
      case 5:
        drawRect(e, t - ds[4], o - ds[3], ds[3], ds[6] + 1),
          drawArrow(e, t, o, 1);
        break;
      case 6:
        drawRect(e, t + ds[1], o - ds[3], ds[3], ds[6] + 1),
          drawArrow(e, t - ds[4], o, 1);
        break;
      case 7:
        var a = 7 == buttonPressed ? darker(buttonBgColor) : buttonBgColor;
        drawRect2(e, t - 2 * dpr, o + dpr, buttonHeight, o + buttonHeight, a),
          drawArrow(
            e,
            t + 2 * dpr + buttonHeight / 2 - 3 * dpr,
            o + buttonHeight / 2 + dph,
            -1
          );
        break;
      case 8:
        a = 8 == buttonPressed ? darker(buttonBgColor) : buttonBgColor;
        drawRect2(e, t - 2 * dpr, o + dpr, buttonHeight, o + buttonHeight, a),
          drawArrow(
            e,
            t - dpr + buttonHeight / 2 - 3 * dpr,
            o + buttonHeight / 2 + dph,
            1
          );
    }
  }
  function drawArrow(e, r, t, o) {
    var a = 3 * dpr,
      i = [],
      n = [];
    (i[0] = r),
      (i[1] = r + o),
      (i[2] = r + 4 * dpr * o),
      (i[3] = r + o),
      (i[4] = r),
      (n[0] = t - a),
      (n[1] = t - a),
      (n[2] = t),
      (n[3] = t + a),
      (n[4] = t + a),
      drawArrow2(e, i, n);
  }
  function drawArrow2(e, r, t) {
    e.beginPath(), e.moveTo(r[0] + dph, t[0] + dph);
    for (var o = 1; o < 5; o++) e.lineTo(r[o] + dph, t[o] + dph);
    e.closePath(),
      (e.fillStyle = "white"),
      (e.strokeStyle = "black"),
      e.fill(),
      (e.lineWidth = lineWidth),
      e.stroke();
  }
  function drawRect(e, r, t, o, a) {
    (e.lineWidth = lineWidth),
      e.beginPath(),
      e.rect(r + dph, t + dph, o - 1, a - 1),
      (e.fillStyle = "white"),
      e.fill(),
      (e.strokeStyle = "black"),
      e.stroke();
  }
  function drawRect2(e, r, t, o, a, i) {
    (e.lineWidth = lineWidth),
      e.beginPath(),
      e.rect(r + dph, t + dph, o - 1, a - 1),
      (e.fillStyle = i),
      e.fill(),
      (e.strokeStyle = "black"),
      e.stroke();
  }
  function drawPolygon(e, r, t, o) {
    e.beginPath(),
      e.moveTo(r[0], t[0]),
      e.lineTo(r[1], t[1]),
      e.lineTo(r[2], t[2]),
      e.lineTo(r[3], t[3]),
      e.closePath(),
      (e.strokeStyle = o),
      (e.lineWidth = 0.7 * dpr),
      e.stroke();
  }
  function fillPolygon(e, r, t, o) {
    e.beginPath(),
      e.moveTo(r[0], t[0]),
      e.lineTo(r[1], t[1]),
      e.lineTo(r[2], t[2]),
      e.lineTo(r[3], t[3]),
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
  function drawSuperArrow(e, r, t, o, a, i) {
    var n = [],
      s = [];
    if (2 != scw || "#ffffff" != i) {
      for (var l = 0; l < 4; l++)
        (n[l] = Math.floor(r[l] + 0.05 * (r[superRotate[2][l]] - r[l]))),
          (s[l] = Math.floor(t[l] + 0.05 * (t[superRotate[2][l]] - t[l])));
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
    var r = parseInt(e.substring(1, 3), 16),
      t = parseInt(e.substring(3, 5), 16),
      o = parseInt(e.substring(5, 7), 16);
    return rgbToHex(
      (r = Math.floor(1.3 * r)) > 255 ? 255 : r,
      (t = Math.floor(1.3 * t)) > 255 ? 255 : t,
      (o = Math.floor(1.3 * o)) > 255 ? 255 : o
    );
  }
  function darker(e) {
    "#" != e.substring(0, 1) && (e = colorToHex(e));
    var r = parseInt(e.substring(1, 3), 16),
      t = parseInt(e.substring(3, 5), 16),
      o = parseInt(e.substring(5, 7), 16);
    return rgbToHex(
      (r = Math.floor(0.8 * r)),
      (t = Math.floor(0.8 * t)),
      (o = Math.floor(0.8 * o))
    );
  }
  function run(e, r) {
    if (e > nowServing) setTimeout(run, 0, e, r);
    else {
      if (!demo && (0 == move.length || 0 == move[curMove].length))
        return (animating = !1), (drawButtons = !0), void paint();
      if (!moveAnimated) {
        for (var t = move[curMove]; movePos < t.length; ) {
          if (t[movePos] >= 1e3) curInfoText = t[movePos] - 1e3;
          else if (-1 != t[movePos]) {
            var o = (t[movePos] % 4) + 1,
              a = Math.floor(t[movePos] / 4) % 7,
              i = Math.floor(t[movePos] / 28);
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
        g = r;
      (interrupted = !1),
        requestAnimationFrame(function e() {
          if (v) {
            if (((v = !1), (u = !1), repeatable))
              g > 0
                ? movePos >= t.length && ((movePos = 0), initInfoText(t))
                : ((curInfoText = -1), 0 == movePos && (movePos = t.length));
            else if ((g > 0 && movePos >= t.length) || (g < 0 && 0 == movePos))
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
            if (((h = !1), -1 == t[movePos])) {
              if ((paint(), !moveOne))
                for (n = Date.now(); Date.now() - n < 1e3; );
            } else
              t[movePos] >= 1e3
                ? (curInfoText = g > 0 ? t[movePos] - 1e3 : -1)
                : (h = !0);
            if (h) {
              (o = (t[movePos] % 4) + 1), (a = Math.floor(t[movePos] / 4) % 7);
              var r = o < 3;
              if (
                (4 == o && (o = 2),
                g < 0 && ((r = !r), (o = 4 - o)),
                (i = Math.floor(t[movePos] / 28)),
                (twisting = !1),
                (natural = !0),
                (spinning = !0),
                (originalAngle = 0),
                faceTwistDirs[i] > 0 && (r = !r),
                moveAnimated)
              ) {
                (d = Math.PI / 2), (c = r ? 1 : -1);
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
                ? (++movePos < t.length &&
                    t[movePos] >= 1e3 &&
                    ((curInfoText = t[movePos] - 1e3), movePos++),
                  movePos == t.length && (demo ? clearDemo(t) : (p = !0)))
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
              void (1 == movePos && t[0] >= 1e3 && movePos--)
            );
          requestAnimationFrame(e);
        });
      var h = !1,
        v = !0,
        f = !0,
        m = !1,
        p = !1,
        b = !1;
      t = demo ? demoMove[0] : move[curMove];
    }
  }
  function clearDemo(e) {
    movePos = 0;
    for (var r = 0; r < 6; r++)
      for (var t = 0; t < 16; t++)
        (cube[r][t] = initialCube[r][t]), (scube[r][t] = initialSCube[r][t]);
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
      for (var r = originalAngle; r < 0; ) r += 32 * Math.PI;
      var t = Math.floor((8 * r) / Math.PI) % 16;
      (snap || t % 4 == 0 || t % 4 == 3) &&
        ((t = Math.floor((t + 2) / 4)),
        faceTwistDirs[twistedLayer] > 0 && (t = (4 - t) % 4),
        (originalAngle = 0),
        (natural = !0),
        twistLayers(cube, twistedLayer, t, twistedMode)),
        paint();
    }
  }
  function mousedown(e) {
    var r = canvas.getBoundingClientRect(),
      t = Math.floor(r.left),
      o = Math.floor(r.top);
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
      (offsetX = t),
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
        : (mirrored && (lastDragX = lastX = width - lastX),
          void 0 === e.touches
            ? !editable ||
              animating ||
              0 != e.button ||
              e.shiftKey ||
              (toTwist = !0)
            : editable && !animating && (toTwist = !0)));
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
      var r = realMoveLength(move[curMove]),
        t = Math.floor((((lastX - 1) * r * 2) / (width - 2) + 1) / 2);
      (t = Math.max(0, Math.min(r, t))) > 0 &&
        (t = arrayMovePos(move[curMove], t)),
        t > movePos && doMove(cube, move[curMove], movePos, t - movePos, !1),
        t < movePos && doMove(cube, move[curMove], t, movePos - t, !0),
        (movePos = t),
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
      initSliceNormals(),
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
  function randMoves(e, r) {
    var t,
      o,
      a = ["R", "L", "F", "B", "U", "D"],
      i = ["", "m", "n"],
      n = ["", "2", "'"],
      s = -1,
      l = -1,
      c = -1,
      d = "";
    0 == r && (r = 10 * e);
    for (var u = 0; u < r; u++) {
      for (; s == l || (Math.floor(s / 2) == Math.floor(l / 2) && s == c); )
        s = Math.floor(6 * Math.random());
      (c = l),
        (l = s),
        (t = Math.floor(3 * Math.random())),
        e <= 3
          ? (d += "" + a[s] + n[t] + " ")
          : ((o = Math.floor(Math.random() * (e > 4 ? 3 : 2))),
            5 == e && 1 == o && (o = 0),
            (d += "" + a[s] + i[o] + n[t] + " "));
    }
    return d;
  }
  window.addEventListener("resize", resize);
  var searchParams = [];
  function parseSearchParams() {
    for (var e = params.split("&"), r = 0; r < e.length; r++) {
      var t = e[r].split("=");
      void 0 !== t[1] && (searchParams[t[0]] = decodeURIComponent(t[1].trim()));
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
      var r = document.getElementsByTagName("script"),
        t = r[r.length - 1];
      parNode = t.parentNode;
    }
    for (var o = 0; o < 6; o++)
      (cube[o] = []),
        (scube[o] = []),
        (initialCube[o] = []),
        (initialSCube[o] = []);
    for (o = 0; o < 24; o++) (dragCornersX[o] = []), (dragCornersY[o] = []);
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

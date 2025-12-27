from __future__ import division, print_function
from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)
title = ["蔡倫魔方", "花式魔方", "LBL", "CFOP CROSS", "CFOP F2L",
         "CFOP OLL", "CFOP PLL", "找不到頁面!!", "其它"]
menu = [["/special", "/lbl","/", "/cross", "/other"],
        ["花式", "LBL","", "CFOP","其它"]
        ]
cfopmenu = [["/cross", "/f2l","/", "/oll", "/pll"],
        ["CROSS", "F2L","", "OLL","PLL"]
        ]

@app.route('/favicon.png')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.png', mimetype='image/vnd.microsoft.icon')


@app.route('/apple-touch-icon.png')
def favicon1():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'apple-touch-icon.png', mimetype='image/vnd.microsoft.icon')


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', title=title[0], menu=menu)


@app.route('/other', methods=['GET'])
def other():
    return render_template('other.html', title=title[8], menu=menu)


@app.route('/special', methods=['GET'])
def special():
    return render_template('special.html', title=title[1], menu=menu)


@app.route('/lbl', methods=['GET'])
def lbl():
    return render_template('lbl.html', title=title[2], menu=menu)


@app.route('/cross', methods=['GET'])
def cross():
    return render_template('cross.html', title=title[3], menu=cfopmenu)


@app.route('/f2l', methods=['GET'])
def f2l():
    return render_template('f2l.html', title=title[4], menu=cfopmenu)


@app.route('/oll', methods=['GET'])
def oll():
    return render_template('oll.html', title=title[5], menu=cfopmenu)


@app.route('/pll', methods=['GET'])
def pll():
    return render_template('pll.html', title=title[6], menu=cfopmenu)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html', title=title[7], menu=menu), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

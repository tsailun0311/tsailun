from __future__ import division, print_function
from flask import Flask, render_template, request
from json import loads, dumps

app = Flask(__name__)
title = ["蔡倫魔方", "花式魔方", "LBL", "CFOP CROSS", "CFOP F2L",
         "CFOP OLL", "CFOP PLL", "CFOP 六格觀察法", "找不到頁面!!"]


@app.route('/', methods=['GET'])
def index():
    ip = request.remote_addr
    with open('./static/people.json') as f:
        people = loads(f.read())
    if ip != people[0]:
        people[1] = people[1] + 1
        people[0] = ip
        with open('./static/people.json', 'w') as f:
            f.write(dumps(people, indent=2))
        with open('./static/document.json') as f:
            document = loads(f.read())
        document.append(people[0]+", "+str(people[1]))
        with open('./static/document.json', 'w') as f:
            f.write(dumps(document, indent=2))
    return render_template('index.html', title=title[0], people=str(people[1]))


@app.route('/special', methods=['GET'])
def special():
    return render_template('special.html', title=title[1])


@app.route('/lbl', methods=['GET'])
def lbl():
    return render_template('lbl.html', title=title[2])


@app.route('/cross', methods=['GET'])
def cross():
    return render_template('cross.html', title=title[3])


@app.route('/f2l', methods=['GET'])
def f2l():
    return render_template('f2l.html', title=title[4])


@app.route('/oll', methods=['GET'])
def oll():
    return render_template('oll.html', title=title[5])


@app.route('/pll', methods=['GET'])
def pll():
    return render_template('pll.html', title=title[6])


@app.route('/pll2', methods=['GET'])
def pll2():
    return render_template('pll2.html', title=title[7])


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html', title=title[8]), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

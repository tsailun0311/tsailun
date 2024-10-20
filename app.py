from __future__ import division, print_function
from flask import Flask, Response, render_template

app = Flask(__name__)
title = ["蔡倫魔方", "花式魔方", "LBL", "CFOP CROSS", "CFOP F2L",
         "CFOP OLL", "CFOP PLL", "找不到頁面!!"]
color_mapping = {
    'b': '#07f',
    'o': 'orange',
    'r': 'red',
    'g': '#0d0',
}


def generate_rubiks_cube_svg(cube_colors):
    colors = [color_mapping.get(
        cube_colors[i], 'white') for i in range(6)]
    svg_content = f'''
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="-1 -1  122 122">
        <polygon points="0,50 20,40 40,50 20,60" fill="yellow" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="20,40 40,30 60,40 40,50" fill="yellow" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="20,60 40,50 60,60 40,70" fill="yellow" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="40,30 60,20 80,30 60,40" fill="yellow" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="40,50 60,40 80,50 60,60" fill="yellow" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="40,70 60,60 80,70 60,80" fill="yellow" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="60,40 80,30 100,40 80,50" fill="yellow" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="60,60 80,50 100,60 80,70" fill="yellow" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="80,50 100,40 120,50 100,60" fill="yellow" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="0,50 20,60 20,80 0,70" fill="{colors[0]}" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="20,60 40,70 40,90 20,80" fill="{colors[1]}" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="40,70 60,80 60,100 40,90" fill="{colors[2]}" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="60,80 80,70 80,90 60,100" fill="{colors[3]}" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="80,70 100,60 100,80 80,90" fill="{colors[4]}" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="100,60 120,50 120,70 100,80" fill="{colors[5]}" stroke="black" stroke-width="2" stroke-linejoin="round"/>
    </svg>
    '''
    return svg_content


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', title=title[0])


@app.route('/other', methods=['GET'])
def other():
    return render_template('other.html', title=title[0])


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


@app.route('/<cube_colors>.svg')
def cube_svg(cube_colors):
    svg_data = generate_rubiks_cube_svg(cube_colors)
    return Response(svg_data, mimetype='image/svg+xml')


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html', title=title[7]), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

from __future__ import division, print_function
from flask import Flask, render_template, send_from_directory, request
import os
import csv
from linebot import LineBotApi, WebhookHandler
from linebot.models import *

app = Flask(__name__)

@app.route('/favicon.png')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.png', mimetype='image/vnd.microsoft.icon')

@app.route('/apple-touch-icon.png')
def favicon1():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'apple-touch-icon.png', mimetype='image/vnd.microsoft.icon')

@app.route('/1.jpg')
def jpg1():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               '1.jpg', mimetype='image/vnd.microsoft.icon')

@app.route('/2.jpg')
def jpg2():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               '2.jpg', mimetype='image/vnd.microsoft.icon')

title = ["蔡倫魔方", "花式魔方", "LBL", "CFOP CROSS", "CFOP F2L",
         "CFOP OLL", "CFOP PLL", "找不到頁面!!", "其它"]

menu = [["/special", "/lbl","/", "/cross", "/other"],
        ["花式", "LBL","", "CFOP","其它"]
        ]

cfopmenu = [["/cross", "/f2l","/", "/oll", "/pll"],
        ["CROSS", "F2L","", "OLL","PLL"]
        ]

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



@app.route("/tueng", methods=['POST'])
def linebot():
    body = request.get_data(as_text=True)
    signature = request.headers['X-Line-Signature']
    try:
        handler.handle(body, signature)
    except Exception as e:
        print(e)
        print(body)
    return 'OK'

@handler.add(MessageEvent, message=TextMessage)
def handle_text_message(event):
    msg = event.message.text.strip()
    if msg == "快速查詢":
        line_bot_api.reply_message(
            event.reply_token,
            TextSendMessage(
                text='👇請選擇👇',
                quick_reply=QuickReply(items=[
                    QuickReplyButton(action=MessageAction(label="🦶", text="步行")),
                    QuickReplyButton(action=MessageAction(label="🚗", text="汽車")),
                    QuickReplyButton(action=MessageAction(label="🚂", text="火車")),
                    QuickReplyButton(action=MessageAction(label="✈️", text="外島")),
                    QuickReplyButton(action=MessageAction(label="❌", text="不支援"))
                ])
            )
        )
    elif msg == "照片":
        line_bot_api.reply_message(
            event.reply_token,
            [TextSendMessage(text='畫質盡力了'),
            ImageSendMessage(
                original_content_url='https://tsailun.pythonanywhere.com/1.jpg',
                preview_image_url='https://tsailun.pythonanywhere.com/1.jpg'
            ),
            ImageSendMessage(
                original_content_url='https://tsailun.pythonanywhere.com/2.jpg',
                preview_image_url='https://tsailun.pythonanywhere.com/2.jpg'
            )]
        )
    else:
        reply = search_csv("static/tueng.csv", msg)
        if reply == "找不到相關資料":
            line_bot_api.reply_message(event.reply_token,TextSendMessage(text=reply))
        else:
            line_bot_api.reply_message(event.reply_token,flex(reply,msg))

@handler.add(PostbackEvent)
def handle_postback(event):
    data = event.postback.data
    reply = search_csv("static/tueng1.csv", data)
    line_bot_api.reply_message(event.reply_token,flex1(reply))

def search_csv(x,keyword):
    results = []
    with open(x, newline='', encoding='cp950') as f:
        reader = csv.reader(f)
        next(reader)
        if keyword == "步行":
            keywords = ["徒步", "自取", "陸勤部", "六軍團"]
            for row in reader:
                if any(keyword in cell for keyword in keywords for cell in row):
                    results.append(row)
        elif keyword == "汽車":
            keywords = ["國防部", "海空憲後"]
            for row in reader:
                if any(keyword in cell for keyword in keywords for cell in row):
                    results.append(row)
        elif keyword == "火車":
            keywords = ["八軍團", "十軍團"]
            for row in reader:
                if any(keyword in cell for keyword in keywords for cell in row):
                    results.append(row)
        elif keyword == "外島":
            keywords = ["金門", "馬祖", "澎湖", "花蓮", "東引"]
            for row in reader:
                if any(keyword in cell for keyword in keywords for cell in row):
                    results.append(row)
        else:
            for row in reader:
                if keyword == "全部" or any(keyword in cell for cell in row):
                    results.append(row)
    if not results:
        return "找不到相關資料"
    return results

def flex(results,msg):
    grouped = {}
    for row in results:
        if len(row) < 3:
            continue
        category = row[0].strip()
        code_desc = f"{row[1].strip()} {row[2].strip()}"
        if category in grouped:
            grouped[category].append(code_desc)
        else:
            grouped[category] = [code_desc]
    final_result = []
    for category, lines in grouped.items():
        combined_text = "\n".join(lines)
        final_result.append((category, combined_text))
    c2 = []
    for i in final_result:
        category = i[0]
        items = i[1]
        c2.append({
            "type": "box",
            "layout": "horizontal",
            "contents": [
                {
                  "type": "text",
                  "text": category,
                  "size": "xs",
                  "color": "#526d98",
                  "flex": 2,
                  "margin": "sm"
                },
                {
                  "type": "text",
                  "text": items,
                  "size": "xs",
                  "color": "#666666",
                  "wrap": True,
                  "flex": 9
                },
            ],
            "backgroundColor": "#e7e5e3",
            "margin": "sm",
            "cornerRadius": "sm"
        })
    flex_content = {
        "type": "bubble",
        "size": "giga",
        "header": {
            "type": "box",
            "layout": "baseline",
            "contents": [
                {
                    "type": "text",
                    "text": "查詢結果",
                    "size": "md",
                    "weight": "bold",
                    "color": "#e7e5e3",
                    "align": "center"
                }
            ]
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": c2
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "button",
                    "action": {
                    "type": "postback",
                    "label": "👇按區號排列",
                    "data": msg
                    },
                    "style": "secondary",
                    "height": "sm",
                    "color": "#526d98"
                }
            ]  
        },
        "styles": {
            "header": {"backgroundColor": "#526d98"},
            "body": {"backgroundColor": "#b7ccdd"},
            "footer": {"backgroundColor": "#b7ccdd"}
        }
    }
    flex_message = FlexSendMessage(alt_text="查詢結果", contents=flex_content)
    return flex_message

def flex1(results):
    grouped = []
    for row in results:
        code_desc = f"{row[0].strip()} {row[1].strip()} {row[2].strip()}"
        grouped.append(code_desc)
    final_result = "\n".join(grouped)
    flex_content = {
        "type": "bubble",
        "size": "giga",
        "header": {
            "type": "box",
            "layout": "baseline",
            "contents": [
                {
                    "type": "text",
                    "text": "區號排列",
                    "size": "md",
                    "weight": "bold",
                    "color": "#e7e5e3",
                    "align": "center"
                }
            ]
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                    {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                    "type": "text",
                    "text": final_result,
                    "size": "xs",
                    "margin": "sm",
                    "wrap": True
                    }
                ],
                "backgroundColor": "#e7e5e3",
                "margin": "sm",
                "cornerRadius": "sm"}
            ]
        },
        "styles": {
            "header": {"backgroundColor": "#526d98"},
            "body": {"backgroundColor": "#b7ccdd"}
        }
    }
    flex_message = FlexSendMessage(alt_text="查詢結果", contents=flex_content)
    return flex_message

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

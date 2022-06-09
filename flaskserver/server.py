from crypt import methods
from unicodedata import name
from flask import Flask, request
from flask_cors import CORS
from service.alpha_predict import stock_predict
from service.alpha_predict import get_current_price


app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route("/ticker/price/<string:name>", methods = ['GET'])
def get_curr_price(name: str):
    return get_current_price(name)

@app.route("/ticker/all", methods = ['GET'])
def all_tickers():
    return {'codes': ['WMT', 'AAPL', 'TSLA', 'MRK', 'LNG', 'ABG', 'AMZN', 'GD', 'PANW', 'TGT', 'ISRG', 'XOM', 'PLAN','BX']}

@app.route("/ticker/<string:name>",methods=["GET"])
def home_trend(name: str):
    return stock_predict(name)

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=8000, debug=True)
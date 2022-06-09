from cProfile import label
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.techindicators import TechIndicators
import yfinance as yf
from pandas.tseries.holiday import USFederalHolidayCalendar
from pandas.tseries.offsets import CustomBusinessDay
from sklearn.metrics import mean_squared_error
from matplotlib.pyplot import figure
import matplotlib.pyplot as plt
from matplotlib.widgets import Cursor
import numpy as np
import pandas as pd

from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model

############################ CONSTANT ############################
API_KEY = 'R680A7OABBQ58NL3'
TICKER = 'AAPL'
ts = TimeSeries(API_KEY, output_format='pandas')
ti = TechIndicators(API_KEY)
n_future = 1
MODE = "TRAINING"
TYPE = 'Close'
############################ CONSTANT ############################

def create_dataset(dataset, n_past):
    x = []
    y = []
    for i in range(n_past, len(dataset) - n_future+1):
        x.append(dataset[i-n_past:i, 0:dataset.shape[1]])
        y.append(dataset[i+n_future-1:i+n_future, 0])
    return np.array(x), np.array(y)

def get_current_price(TICKER):
    data = yf.Ticker(TICKER).history('1mo')
    df = data[[TYPE]].astype(float).sort_index(ascending=True, axis=0).tail(2)
    return df.reset_index()['Close'].to_dict()

def stock_predict(TICKER):
    data = yf.Ticker(TICKER).history(period="max")

    # Use Close Data for training and scale data
    df_for_training = data[[TYPE]].astype(float).sort_index(ascending=True, axis=0).tail(1500)
    scaler=MinMaxScaler(feature_range=(0,1))
    df_for_training_scaled=scaler.fit_transform(np.array(df_for_training).reshape(-1,1))

    # Use first 60 points to predict the 101th one, etc......
    n_past = 60
    x_all, y_all = create_dataset(df_for_training_scaled, n_past)
    model = load_model(f'service/Models/{TICKER}.h5')

    # Determine past and future data to plot and plug back into the date dataframe
    us_bd = CustomBusinessDay(calendar = USFederalHolidayCalendar())
    # to_past = 60
    to_future = 7
    forecast_period_dates = pd.date_range(df_for_training.index[-1], periods=to_future, freq=us_bd).tolist()
    # past_period_dates = pd.date_range(df_for_training.index[-to_past], periods=to_past, freq=us_bd).tolist()
    prediction = []
    current_batch = x_all[-1:]
    for i in range(to_future):
        current_pred = model.predict(current_batch)[0]
        prediction.append(current_pred)
        current_batch = np.append(current_batch[:,1:,:],[[current_pred]],axis=1)

    y_pred_future = scaler.inverse_transform(prediction)

    # Plug back in future forecast dates
    future_forecast_dates = []
    for time_i in forecast_period_dates:
        future_forecast_dates.append(time_i.date())
        
    df_forecast = pd.DataFrame({'Date': np.array(future_forecast_dates), 'Close': y_pred_future[:,0]})
    df_forecast['Date'] = pd.to_datetime(df_forecast['Date'])

    return df_forecast.to_dict()
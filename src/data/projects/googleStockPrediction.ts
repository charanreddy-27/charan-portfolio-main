export const googleStockPredictionProject = {
  id: 4,
  title: "Google Stock Price Prediction using LSTM and PyTorch",
  description:
    "A project to predict the future stock prices of Google (GOOG) using historical stock data and machine learning techniques.",
  image: "https://images.unsplash.com/photo-1580894908360-3c6b8240b81b", // Image related to stock market
  tools: ["PyTorch", "Keras", "yfinance", "MinMaxScaler", "Matplotlib", "Pandas"],
  slug: "google-stock-prediction",
  overview:
    "This project predicts Google's stock prices using LSTM models built with Keras and PyTorch. The process includes data collection, preprocessing, feature engineering, and model evaluation.",
  challenges: [
    "Handling missing values and scaling data for effective model performance.",
    "Feature engineering, selecting relevant features to improve model accuracy.",
    "Model selection and hyperparameter tuning for optimal performance.",
    "Preventing overfitting to ensure generalization to unseen data.",
  ],
  solution:
    "Missing values were handled and data was scaled using MinMaxScaler. SMAs and daily returns were added as features. LSTM models were built using Keras and PyTorch, and overfitting was tackled using dropout and early stopping.",
  outcome:
    "The models achieved reasonable accuracy in predicting future stock prices, with visualizations such as line charts and candlestick charts showing the effectiveness of the prediction. The project provided valuable insights into stock price forecasting and the potential of LSTM models.",
};

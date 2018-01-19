import { MetricDistance, MetricLength, MetricPressure, MetricTemp } from './model';

export const DEFAULT_METRICS = {
  temp: MetricTemp.F,
  length: MetricLength.IN,
  distance: MetricDistance.MI,
  time: 12,
  pressure: MetricPressure.MBAR
};

export const FORECAST_CONFIG = {
  API_ENDPOINT: 'https://api.darksky.net/forecast/',
  API_KEY: '11471c56c5c16eedc5f1b4a714010a4f'
};

export const CONFIG = {
  METRICS: 'metrics',
  HOME_LOCATION: 'homeLocation'
};

export const REFRESH_THRESHOLD: number = 3 * 60 * 60 * 1000; //3 hours

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const dailyApi = axios.create({
  baseURL: 'https://api.daily.co/v1',
  timeout: 5000,
  headers: { Authorization: `Bearer ${process.env.DAILY_API_KEY}` },
});
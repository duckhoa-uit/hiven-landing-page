import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHivenDetails = createAsyncThunk('hiven/fetchDetails', async () => {
   try {
      const res = await axios.get(
         `/hivens?populate=hero_slider.banners&populate=business_area_images.image&populate=mission_value_image&populate=investment_region&populate=about_us_banner&populate=corporate_profile.image&populate=corporate_profile.logo&populate=news_banner&populate=contact_banner`,
         {
            baseURL: 'https://hiven-api.herokuapp.com/api',
         }
      );
      return res.data.data[0];
   } catch (error) {
      return {};
   }
});

export const fetchHivenNews = createAsyncThunk('hiven/fetchNews', async () => {
   try {
      const res = await axios.get(`/news?populate=*`, {
         baseURL: 'https://hiven-api.herokuapp.com/api',
      });
      return res.data.data.map((item) => ({ id: item.id, ...item.attributes }));
   } catch (error) {
      return [];
   }
});
export const deleteNews = createAsyncThunk('hiven/deleteNews', async (id) => {
   try {
      const res = await axios.delete(`/news/${id}`, {
         baseURL: 'https://hiven-api.herokuapp.com/api',
      });
      console.log(res);
      return id;
   } catch (error) {
      return '';
   }
});

const hivenSlice = createSlice({
   name: 'counter',
   initialState: {
      data: {},
      news: [],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchHivenNews.fulfilled, (state, action) => {
         state.news = action.payload;
      });
      builder.addCase(deleteNews.fulfilled, (state, action) => {
         const deletedId = action.payload;
         state.news = state.news.filter((item) => item.id !== deletedId);
      });
      builder.addCase(fetchHivenDetails.fulfilled, (state, action) => {
         state.data = action.payload;
      });
   },
});

export default hivenSlice.reducer;

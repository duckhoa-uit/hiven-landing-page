import axiosClient from '@components/api-client/axios-client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const fetchHivenDetails = createAsyncThunk('hiven/fetchDetails', async () => {
   try {
      const res = await axiosClient.get(
         `/hivens?populate=hero_slider.banners&populate=investment_region.image&populate=business_area_images.image&populate=mission_value_image&populate=investment_region&populate=about_us_banner&populate=corporate_profile.image&populate=corporate_profile.logo&populate=news_banner&populate=contact_banner`
      );
      return res.data[0];
   } catch (error) {
      return {};
   }
});

export const fetchHivenNews = createAsyncThunk('hiven/fetchNews', async () => {
   try {
      const res = await axiosClient.get(`/news?populate=*`);
      return res.data.map((item) => ({ id: item.id, ...item.attributes }));
   } catch (error) {
      return [];
   }
});
export const deleteNews = createAsyncThunk('hiven/deleteNews', async (id) => {
   try {
      const res = await axiosClient.delete(`/news/${id}`);
      toast.success('Delete News Success.');
      return id;
   } catch ({ error }) {
      toast.error(error.message);
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

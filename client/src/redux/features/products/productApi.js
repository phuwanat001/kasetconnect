import {createApi} from '@reduxjs/toolkit/query/react';
import getBaseURL from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl : `${getBaseURL()}/api/products`,
    credential : 'include',
    preperHeaders : (Headers) => {
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery,
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query : () => '/',
            providesTags: ['Product']
        })
    })
})

export const {useFetchAllProductsQuery ,} = productsApi;

export default productsApi;


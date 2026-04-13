import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_PRODUCTS_URL

export const productApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints : (builder) => ({
        getAllProducts: builder.query({
            query : () => ("/products")
        }),
        login:builder.mutation({
            query: (body)=>({
                url:"/auth/login",
                method:"POST",
                body:body
            })
        })
    })
})

export const {useGetAllProductsQuery, useLoginMutation} = productApi

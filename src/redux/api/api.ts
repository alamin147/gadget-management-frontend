import { baseApi } from "./baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGadgets: builder.query({
      query: (data: any) => {
        // console.log("from param 7", data);
        return {
          url: "/gadgets",
          method: "GET",
          params: data,
        };
      },
      providesTags: ["gadgets"],
    }),
    getMyGadgets: builder.query({
      query: (createdBy: any) => {
        // console.log("from param", data);
        return {
          url: `/myProduct/${createdBy}`,
          method: "GET",
        };
      },
      providesTags: ["gadgets"],
    }),
    getMyCart: builder.query({
      query: (user: any) => {
        // console.log("from param", data);
        return {
          url: `/cart/${user}`,
          method: "GET",
        };
      },
      providesTags: ["carts"],
    }),

    createGadgets: builder.mutation({
      query: (data: any) => {
        // console.log("duplicate data", data);
        return {
          url: "/addGadget",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["gadgets"],
    }),

    getSingleGadget: builder.query({
      query: (id) => {
        return {
          url: `/gadgets/${id}`,
          method: "GET",
        };
      },
    }),
    updateSingleGadget: builder.mutation({
      query: (data: any) => {
        // console.log("from param 31", data?.updatedData);
        const updatedData = data?.updatedData;
        return {
          url: `/updateGadget/${data?.id}`,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: ["gadgets"],
    }),
    deleteSingleGadget: builder.mutation({
      query: (id: string) => {
        // console.log("from param 39", id);
        return {
          url: `/deleteGadget/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["gadgets"],
    }),
    deleteSelectedAll: builder.mutation({
      query: (selectedids: any) => {
        // console.log("from 61", selectedids);
        return {
          url: "/deleteSelected",
          method: "DELETE",
          body: selectedids,
        };
      },
      invalidatesTags: ["gadgets"],
    }),

    addToCart: builder.mutation({
      query: (data: any) => {
        // console.log("from 93", data);
        return {
          url: "/addTOCart",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["carts", "gadgets"],
    }),
    getSellProduct: builder.query({
      query: () => {
        // console.log("from 73", data);
        return {
          url: "/sellProduct",
          method: "GET",
        };
      },
      providesTags: ["sells"],
    }),
    payment: builder.mutation({
      query: (paymentData) => {
        return {
          url: "/checkout",
          method: "POST",
          body: paymentData,
        };
      },
      invalidatesTags: ["carts", "sells", "gadgets"],
    }),
    deleteCartProduct: builder.mutation({
      query: (itemFromCart) => {
        let updatedItemCartData = itemFromCart.itemCartData.filter(
          (items: any) => items.itemId !== itemFromCart.currItemData.itemId
        );
        // console.log(updatedItemCartData);
        // console.log("from 114", updatedItemCartData);
        return {
          url: "/deleteCart",
          method: "DELETE",
          body: updatedItemCartData,
        };
      },
      invalidatesTags: ["carts", "gadgets"],
    }),
    deleteAllCart: builder.mutation({
      query: () => {
        return {
          url: "/deleteAllCart",
          method: "DELETE",
        };
      },
      invalidatesTags: ["carts","gadgets"],
    }),
  }),
});

export const {
  useCreateGadgetsMutation,
  useGetGadgetsQuery,
  useGetMyGadgetsQuery,
  useDeleteSelectedAllMutation,
  useGetSingleGadgetQuery,
  useUpdateSingleGadgetMutation,
  useAddToCartMutation,
  useDeleteSingleGadgetMutation,
  useGetSellProductQuery,
  useGetMyCartQuery,
  useDeleteCartProductMutation,
  usePaymentMutation,
  useDeleteAllCartMutation
} = api;

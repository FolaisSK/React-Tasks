import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await fetch(import.meta.env.VITE_APP_PRODUCTS_URL + '/products')
  return await res.json()
})

export const fetchProductById = createAsyncThunk('products/fetchById', async (id) => {
  const res = await fetch(import.meta.env.VITE_APP_PRODUCTS_URL + '/products/' + id)
  return await res.json()
})

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const res = await fetch(import.meta.env.VITE_APP_PRODUCTS_URL + '/products/categories')
  return await res.json()
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProduct: null,
    categories: [],
    status: 'idle',
    selectedStatus: 'idle',
    error: null,
    searchQuery: '',
    selectedCategory: 'all',
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading' })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchProductById.pending, (state) => { state.selectedStatus = 'loading' })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedStatus = 'succeeded'
        state.selectedProduct = action.payload
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const { setSearchQuery, setSelectedCategory, clearSelectedProduct } = productsSlice.actions
export default productsSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const makeStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  })

  export type AppStore = ReturnType<typeof makeStore>
  export type AppState = ReturnType<AppStore['getState']>
  export type AppDispatch = AppStore['dispatch']

  setupListeners(makeStore().dispatch)

  

// import { configureStore } from '@reduxjs/toolkit'
// import {reducer} from './rootReducer'
// import { baseApi } from './api/baseApi'


// export const store = configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(baseApi.middleware),
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
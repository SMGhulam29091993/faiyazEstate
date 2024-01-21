import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { userReducers } from "./user/userSlice";
import {} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({user : userReducers});

const persistConfig = {
    key : 'root',
    storage,
    version : 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck : false,
    })
})

export const persistor = persistStore(store);
import React from "react";
import './App.css'
import { MainContextProvider } from "./context/MainContext"
import MainView from './components/MainView'

export default function App(){
    return(
        <MainContextProvider>
            <MainView />
        </MainContextProvider>
    );
}
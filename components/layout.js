import  {useState, useEffect} from 'react';
import config from '../configuration';
import Footer from './footer';
import Header from './header';

let Web3 = require('web3');

export default function Layout(props) {

    return (
        <>  
            <div className={"h-screen " + props.headerBgClass}>
                { props.noHeader ? null : <Header bgClass={props.headerBgClass} />}
                {props.children}
            </div>
            <Footer bgClass={"bg-blue-400"} colorClass={"text-black"} />
        </>
    )
}
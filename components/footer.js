import  {useState, useEffect} from 'react';
import config from '../configuration';

// Props
// bgClass
// colorClass
export default function Footer(props) {
    return (
        <div className={props.bgClass}>
            <div className={"container xl:px-48 mx-auto"}>
                <div className={"flex flex-col sm:flex-row justify-around items-center py-8 sm:py-16"}>
                    <a target={"_blank"} href={"https://opensea.io/collection/pixel-pizzas"}
                    className={"text-2xl font-bold pb-4 sm:pb-0 " + props.colorClass}>OpenSea</a>
                    <a target={"_blank"} href={"https://polygonscan.com/token/" + config.contractAddress}
                    className={"text-2xl font-bold " + props.colorClass}>PolygonScan</a>
                    <a target={"_blank"} href={"https://github.com/mbvissers/PixelPizzasSite"}
                    className={"text-2xl font-bold " + props.colorClass}>GitHub</a>
                </div>
            </div>
        </div>
    )
}
import Service from './Service.js';
import Headers from "./Headers";

export default function DashBoard(){

    return(
        <>
        <div className="container-fluid">
            <Headers/>
        </div>
        <div className="container-fluid">
        <Service/>
        </div>
        </>
    );
}

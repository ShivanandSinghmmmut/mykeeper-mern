import axios from "axios";
import React from "react";
import '../App.css';

const ShowKeeper = ({keeperList,setKeeperList})=>{
    const deleteKeeper=(id)=>{
        axios.post("http://localhost:5000/api/delete",{id}).then(res=>setKeeperList(res.data))
    }
    return(
        <>
            <div className="showKeeper">
            {
                keeperList.map((keeper)=>{
                    return(
                        <>
                        <div className="keeperCard" key={keeper._id}>
                    <h1 className="title">{keeper.title}<i className="deleteIcon fa fa-trash" area-hidden="true" onClick={()=>(deleteKeeper(keeper._id))}></i></h1>
                    <textarea className="descriptionBox">{keeper.description}</textarea>
                </div>
                        </>
                    )
                })
            }
            </div>    
        </>
    )
}


export default ShowKeeper;

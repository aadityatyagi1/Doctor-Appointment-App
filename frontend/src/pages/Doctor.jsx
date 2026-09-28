import React,{useContext,useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import {AppContext} from "../context/AppContext";
const Doctor=()=>{

    const navigator=useNavigate();
     const {specility}=useParams();
    
     const {doctors}=useContext(AppContext);
     const [filterDoc,setFilterDoc]=useState([]);

     const [showFilter,setShowFilter]=useState(false);

     const applyFilter=()=>{
        if(specility){
            setFilterDoc(doctors.filter(doc=> doc.speciality === specility));
        }else{
            setFilterDoc(doctors);
        }
     }

     useEffect(()=>{
        applyFilter()
     },[doctors,specility]);


     
    return(
     <div>
        <div>
            <p className="text-gray-600">Browse through the doctors specialist.</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                 <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter?'bg-primary text-white':''}`} onClick={()=>setShowFilter(prev =>!prev)}>Filter</button>
                <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter?'flex':'hidden sm:flex'}`}>
                   
                    <p onClick={()=> specility==="General physician"? navigator("/doctor"):navigator("/doctor/General physician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>General physician</p>
                    <p onClick={()=>navigator("/doctor/Gynecologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Gynecologist</p>
                    <p onClick={()=>navigator("/doctor/Dermatologist")}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Dermatologist</p>
                    <p onClick={()=>navigator("/doctor/Pediatricians")}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Pediatricians</p>
                    <p onClick={()=>navigator("/doctor/Neurologist")}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Neurologist</p>
                    <p onClick={()=>navigator("/doctor/Gastroenterologist")}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Gastroenterologist</p>
                    

                </div>
               <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {
                        filterDoc.map((item,index)=>(
                    <div onClick={()=>navigator(`/appointment/${item._id}`)} key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                    
                        <img className="bg-blue-50" src={item.image}/>
                         <div className="p-4">
                            <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                            <p>Available</p>
                            </div>
                            <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                            <p className="text-gray-600-sm">{item.speciality}</p>
                        </div>
                    </div>
                   

                
                
                ))}
                </div>
            </div>
        </div>
        
     </div>
       
    );
};

export default Doctor;
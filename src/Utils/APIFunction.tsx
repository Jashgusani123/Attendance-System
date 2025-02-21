export const GetLiveClasses =  async(enrollmentNumber:number)=>{
    const jsonResponse = await fetch(`${import.meta.env.VITE_SERVER}/class/getliveclasses` , {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(enrollmentNumber),
    });
    const data = await jsonResponse.json();
    
    if(data.success){
        return data.LiveClasses
    }

}

interface VariableType {
    "fullName"?:string,
    "email"?:string,
    "departmentName"?:string, 
    "collegeName"?:string, 
    "gender"?:string
}

export const Capitalize = ( str : any)=>{
    
    let returnStr = "";
    let ArrayofStr = [];
     const strArray = str.split(" ");
        if(strArray?.length! > 1){
            for(let i = 0 ; i < strArray?.length! ; i++){
               ArrayofStr.push(strArray![i].charAt(0).toUpperCase().concat(strArray![i].slice(1).toLowerCase()));
            }
        }
        else{
            ArrayofStr.push(strArray![0].charAt(0).toUpperCase().concat(strArray![0].slice(1).toLowerCase()));
        }
  
    
    returnStr = ArrayofStr.join(" ");
    
    return returnStr;
}

export const WordsCapitalize = (User : VariableType  , Variable : keyof VariableType )=>{
    let returnStr = "";
    let ArrayofStr = [];
    if(User){
        let count = User[Variable]?.split(" ")
        
        if(count?.length! > 1){
            for(let i = 0 ; i < count?.length! ; i++){
               ArrayofStr.push(count![i].charAt(0).toUpperCase().concat(count![i].slice(1).toLowerCase()));
            }
        }
        else{
            ArrayofStr.push(count![0].charAt(0).toUpperCase().concat(count![0].slice(1).toLowerCase()));
        }
    }else{
        return "";
    }
    
    returnStr = ArrayofStr.join(" ");
    
    return returnStr ;
}

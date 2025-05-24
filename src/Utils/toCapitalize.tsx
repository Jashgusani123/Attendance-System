
interface VariableType {
    "fullName"?:string,
    "email"?:string,
    "departmentName"?:string, 
    "collegeName"?:string, 
    "gender"?:string
}

export const Capitalize = (User : VariableType  , Variable : keyof VariableType )=>{
    return User ?(  User[Variable]?.charAt(0).toUpperCase())?.concat(User[Variable].slice(1).toLowerCase()): "";
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

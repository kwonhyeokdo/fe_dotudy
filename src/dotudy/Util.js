/**
 *  
 *  @param 객체, 배열, 문자열
 *  @description 객체나 배열이 비어있거나 빈문자열일 경우 true를 반환, 아니면 false를 반환
 *  @return boolean
 */
export const util_isEmpty = function(obj){
    let result = null;
    if(obj === null){
        result = true;
    }else{
        switch(typeof(obj)){
            case "object":
                if(Object.keys(obj).length === 0){
                    result = true;
                }
                break;
            case "undefined":
                result = true;
                break;
            case "string":
                if(obj.length === 0){
                    result = true;
                }
                break;
            default:
                result = false;
                break;
        }
    }
    return result;
};
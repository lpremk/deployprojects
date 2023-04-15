import {decode as base64_decode, encode as base64_encode} from 'base-64';


export function getPayloadFromJwtToken(jwtToken){
    let jwtArr=jwtToken.split('.');
    let encodedPayload=jwtArr[1];
    let decodedPayload=base64_decode(''+encodedPayload);
    return decodedPayload;
}
export function hasAnyRole(jwtToken,inputRolesArray){
    let roles=JSON.parse(getPayloadFromJwtToken(jwtToken)).roles;
    let result=false;
    for(let i=0;i<roles.length;i++){
        for(let j=0;j<inputRolesArray.length;j++){ 
            if(roles[i]==inputRolesArray[j]){
                result=true;
            }
        }
    }
    return result;
}

export function hasRole(jwtToken,inputRole){
    let roles=JSON.parse(getPayloadFromJwtToken(jwtToken)).roles;
    let result=false;
    for(let i=0;i<roles.length;i++){
        if(roles[i]==inputRole){
            result=true;
        }
    }
    return result;
}

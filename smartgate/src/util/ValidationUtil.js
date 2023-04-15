/*
The following conditions must satisfy for a Mobile Number to be termed as valid.
1. It should be 10 digits long.
2. The first digit should be a number. 6 to 9.
3. The rest 9 digits should be any number. 0 to 9.
4. It can have 11 digits including 0 at the starting.
5. It can have 12 digits including 91 at the starting.
Examples: 9876543210, 09876543210, 919876543210
*/
export function validateMobileNumber(mobileNumber,elementId) {
        var errorMessage = document.getElementById(elementId);
        /*mobileNumber==undefined -- mobileNumber==""
        true false -- false
        false true -- false
        false false -- true
        true true -- Not exist*/
        if(!(mobileNumber===undefined || mobileNumber==="")){
            errorMessage.innerHTML = "";
            var expr = /^(0|91)?[6-9][0-9]{9}$/;
            if (!expr.test(mobileNumber)) {
                errorMessage.innerHTML = `<p style="color:red;">Invalid Mobile Number.</p>`;
                // return false
                throw new Error();
            }
        }
     
}

export function validateEmail(emailId,elementId) 
{
    var errorMessage = document.getElementById(elementId);
    if(!(emailId===undefined || emailId==="")){
        errorMessage.innerHTML = "";
        var expr=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!expr.test(emailId))
        {
            errorMessage.innerHTML = `<p style="color:red;">You have entered an invalid email address!</p>`;
            // return false
            throw new Error();
        }
    }
}
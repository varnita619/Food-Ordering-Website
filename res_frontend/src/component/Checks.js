export function isEmpty(txt)
{
   if(txt.length==0)
   {return true}
   else
   {return false}
}
export function isAlphabets(txt)
 {
   if(/^[a-z A-Z]+/.test(txt))
     {return true}
     else
     {return false}
 }

 export function isMobile(txt)
 {
   if(/^[0-9]{10}/.test(txt))
     {return true}
     else
     {return false}
 }

 export function isEmail(txt)
 {
   if(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(txt))
    {
       return true
    }
    else
    {return false}


 }

 export function isNumeric(txt)
 {
   if(/^[0-9]+/.test(txt))
     {return true}
     else
     {return false}
 }

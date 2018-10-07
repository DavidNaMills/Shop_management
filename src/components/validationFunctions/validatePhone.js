export const validatePhone=(number)=>{
    const re = /(^[0-9]{11})/;
    return re.test(number)&&number.length===11?true:false;   
}
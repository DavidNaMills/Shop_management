export const validatePassword=(password)=>{
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;
    /**
     * 1 + lowercase
     * 1 + uppercase
     * 1 + number
     * 1 + !@#$%^&*
     * least 8 characters long
     */
    return re.test(String(password));
}
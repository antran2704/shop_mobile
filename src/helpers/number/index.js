const checkValidNumber = (value) => {
    const regexNumber = /^[0-9]*\.?[0-9]*$/;
    
    return regexNumber.test(value.toString());
}

export default checkValidNumber;
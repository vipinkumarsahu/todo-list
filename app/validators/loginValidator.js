var validators = {
    //login validator
    login:{
        'email': {
            notEmpty: true,
            isEmail: true
        },
        'password': {
            notEmpty: true,
            matches: {
                //options: [{ min: 2, max: 20 }] // pass options to the validator with the options property as an array
                // options: [/example/i] // matches also accepts the full expression in the first parameter
            },
            errorMessage: 'Invalid Password'
        }
    }
}
module.exports = validators;
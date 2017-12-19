var validators = {
    //login validator
    login:{
        'username': {
            notEmpty: true
        },
        'password': {
            notEmpty: true,
            matches: {
                //options: [{ min: 2, max: 20 }] // pass options to the validator with the options property as an array
                // options: [/example/i] // matches also accepts the full expression in the first parameter
            },
            errorMessage: 'Invalid Password'
        }
    },
    addcompany:{
        'officialName': { //
            notEmpty: true, // won't validate if field is empty
            isLength: {
                options: [{
                    min: 3,
                    max: 50
                }],
                errorMessage: 'Official Name Must be between 3 and 50 chars long' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: 'Invalid Official Name'
        },
         'businessDesc': { //
            notEmpty: true, // won't validate if field is empty
            isLength: {
                options: [{
                    min: 10,
                    max: 200
                }],
                errorMessage: 'Business Description  Must be between 10 and 200 chars long' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: 'Invalid Business Description'
        },
        'collName': { //
            notEmpty: true, // won't validate if field is empty
            isLength: {
                options: [{
                    min: 3,
                    max: 50
                }],
                errorMessage: 'Colloquial name should be minimum 3 chars long' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: 'Invalid Colloquial name'
        },
        'ddTicker': { //
            notEmpty: true, // won't validate if field is empty
            isLength: {
                options: [{
                    min: 3,
                    max: 50
                }],
                errorMessage: 'ddTicker name Must be between 3 and 50 chars long' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: 'Invalid ddTicker name'
        }
    },
    setting:{
            'fname':{
            notEmpty: true, // won't validate if field is empty
            errorMessage: 'First name should not be left blank',
            isLength: {
                options: [{
                    min: 4,
                    max: 20
                }]
            }, 
            errorMessage: 'FirstName should be between 4 and 20 characters' 
        },
        'lname':{
            notEmpty: true, // won't validate if field is empty
            errorMessage: 'Last name should not be left blank',
            isLength: {
                options: [{
                    min: 4,
                    max: 30
                }]
            }, 
            errorMessage: 'lastName should be between 4 and 30 characters' 
        },
            'email': {
            notEmpty: true,
            isEmail:{
                errorMessage: 'Invalid Email'
            }
        },
            'address': { //
            notEmpty: true, // won't validate if field is empty
            isLength: {
                options: [{
                    min: 4,
                    max:100
                }],
                errorMessage: 'address should be between 4 to 100 characters' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: 'Invalid Address'
        },
            'phone': { //
            notEmpty: true, // won't validate if field is empty
            isLength: {
                options: [{
                    min: 10,
                    max: 10
                }]
            },
            errorMessage: 'Enter a 10 digit phone number'
        }           
    }
    
}
module.exports = validators;
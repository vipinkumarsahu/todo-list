var validators = {
    adduser: {
        'name': {
            notEmpty: true, // won't validate if field is empty
            errorMessage: 'Name column should not be left blank',
            isLength: {
                options: [{
                    min: 4,
                    max: 30
                }]
            },
            errorMessage: 'Name should be between 4 and 30 characters'
        },
        'email': {
            notEmpty: true,
            errorMessage: 'Email column should not be left blank',
            isEmail: {
                errorMessage: 'Invalid Email'
            }
        },
        'address': { //
            notEmpty: true, // won't validate if field is empty
            isLength: {
                options: [{
                    min: 4,
                    max: 100
                }],
                errorMessage: 'address should be between 4 to 100 characters' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: 'Invalid Address'
        },
        'phone': { //
            notEmpty: true, // won't validate if field is empty
            errorMessage: 'Phone column should not be left blank',
            isLength: {
                options: [{
                    min: 7,
                    max: 15
                }]
            },
            errorMessage: 'Phone number should be minimum 7 and maximum 15 digits'
        },
        'password': {
            notEmpty: true,
            matches: {
                options: [{ min: 4, max: 20 }], // pass options to the validator with the options property as an array
                options: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/i] // matches also accepts the full expression in the first parameter
            },
            errorMessage: 'Invalid Password'
        }
    },
    edituser: {
        'name': {
            notEmpty: true, // won't validate if field is empty
            errorMessage: 'Name column should not be left blank',
            isLength: {
                options: [{
                    min: 4,
                    max: 30
                }]
            },
            errorMessage: 'Name should be between 4 and 30 characters'
        },
        'email': {
            notEmpty: true,
            errorMessage: 'Email column should not be left blank',
            isEmail: {
                errorMessage: 'Invalid Email'
            }
        },
        'address': { //
            notEmpty: true, // won't validate if field is empty
            isLength: {
                options: [{
                    min: 4,
                    max: 100
                }],
                errorMessage: 'address should be between 4 to 100 characters' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: 'Invalid Address'
        },
        'phone': { //
            notEmpty: true, // won't validate if field is empty
            errorMessage: 'Phone column should not be left blank',
            isLength: {
                options: [{
                    min: 7,
                    max: 15
                }]
            },
            errorMessage: 'Phone number should be minimum 7 and maximum 15 digits'
        }
    }
}
module.exports = validators;
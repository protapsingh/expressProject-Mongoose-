const mongoose= require('mongoose');
var userSchema =new mongoose.Schema({
    username:{type: String,
    required:'Fullname field is required!'
    },
    email:{type: String,
    required:'Email field is required!'
    },
    password:{type: String,
        required:'Email field is required!'
        },

    mobile:{type: String,
    required:'Mobile field is required!'
    },
    city:{type: String,
    required:'City field is required!'
    },
    image:{type: String,
    required:'field is required!'
    }
});
mongoose.model('User',userSchema);
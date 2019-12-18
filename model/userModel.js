const mongoose= require('mongoose');
var userSchema =new mongoose.Schema({
    fullname:{type: String,
    required:'Fullname field is required!'
    },
    email:{type: String,
    required:'Email field is required!'
    },
    password:{type: String,
        required:'Password field is required!'
        },

    city:{type: String,
    required:'City field is required!'
    },
    mobile:{type: String,
    required:'Mobile field is required!'
    },
    image:{type: String,
    required:'Image field is required!'
    }
});
mongoose.model('User',userSchema);
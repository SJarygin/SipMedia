const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  clients: [{}]
});

// Здесь не будем пользоваться стрелочными функциями из-за автоматической привязки к лексической области видимости
Schema.pre('save', function (ANext) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (AError, ASalt) => {
      if (AError) return ANext(AError);

      bcrypt.hash(user.password, ASalt, (AError, AHash) => {
        if (AError) return ANext(AError);
        user.password = AHash;
        ANext();
      });
    });
  } else {
    return ANext();
  }
});

Schema.methods.comparePassword = function (APassword, ACallback) {
  bcrypt.compare(APassword, this.password, (AError, AMatches) => {
    if (AError) return ACallback(AError);
    ACallback(null, AMatches);
  });
};

mongoose.model('User', Schema);
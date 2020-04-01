const { mongoose, User } = require('../db/mongoose');

const rl = require('readline-sync');

const username = rl.question('Username for the new admin: ');

const password = rl.question('Password for the new admin: ', {
    hideEchoBack: true,
});

const passwordConfirmed = rl.question('Confirm the password: ', {
    hideEchoBack: true,
});

if (password !== passwordConfirmed) {
    console.log('Password does not match.');
    mongoose.disconnect();
} else {
    const u = new User({ username, password, type: 'admin' });
    u.save()
        .then(() => {
            console.log('The admin has been added.');
            mongoose.disconnect();
        })
        .catch(e => {
            console.log('Error creating the admin: ', e);
            mongoose.disconnect();
        });
}

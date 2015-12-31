var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //定义Schema
    var kittySchema = mongoose.Schema({
        name: String
    });

    //给Schema添加方法
    kittySchema.methods.speak = function () {
        var greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    };

    //将Schema编译成mongodb model
    var Kitten = mongoose.model('Kitten', kittySchema);

    //model实例document
    var silence = new Kitten({name: 'Silence'});

    //保存document
    silence.save(function (e, silence) {
        if (e) {
            console.log(e);
        } else {
            silence.speak();
        }
    });

    //查询
    Kitten.find(function (err, kittens) {
        if (err)
            console.error(err);
        console.log(kittens);
    });
});


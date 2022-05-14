import express  from 'express';
import mongoose from 'mongoose';

const app = express();


// async funtion mongoose() {
//     return connect(
//                 'mongodb+srv://Mohamed:35212523@cluster0.kxkhb.mongodb.net/Blog?retryWrites=true&w=majority'
//             )
//             .then(() => app.listen(5000))
//             .then(() =>
//                 console.log("Connected to Database and listening to localhost 5000 "))
//             .catch((err) => console.log("err")) ;
// }

mongoose
    .connect(
        'mongodb+srv://Mohamed:35212523@cluster0.kxkhb.mongodb.net/Blog?retryWrites=true&w=majority'
    )
    .then(() => app.listen(4000))
    .then(() =>
        console.log("Connected to Database and listening to localhost 4000 "))
    .catch((err) => console.log("err")) ;


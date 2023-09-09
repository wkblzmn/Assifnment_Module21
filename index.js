import mongoose from "mongoose";

await mongoose.connect('mongodb+srv://wkblzmn:wkblzmn@cluster0.ef1psze.mongodb.net/?retryWrites=true&w=majority')

.then(
    (resolve) => {
        console.log("Connection Successful")
    }
) .catch(
    (reject) => {
        console.log("Connection Unsuccessful")
    }
)


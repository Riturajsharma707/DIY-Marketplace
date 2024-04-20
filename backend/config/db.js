import mongoose from 'mongoose'

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Successfylly connnected to mangoDB :) `)

    } catch (error) {
        console.log(`ERROR : ${error.message}`)
        process.exit(1)
    }


}


export default connectDB;
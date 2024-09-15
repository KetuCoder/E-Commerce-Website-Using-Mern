import { v2 as clodniary } from 'cloudinary';

const ConnectCloudinary = async () => {
    clodniary.config({
        cloud_name : process.env.CLOUD_NAME,
        api_key : process.env.API_KEY,
        api_secret : process.env.API_SECRET
    })
}

export default ConnectCloudinary;
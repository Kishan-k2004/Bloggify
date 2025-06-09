import axios from "axios";
import conf from "../conf/conf.js";

const handleSendOTP = async (email) => {
    try {
        const res = await axios.post(conf.sendEmailApi,{email})
        return res

    } catch (error) {
        throw error
    }
};


const handleVerifyOTP = async (email,otp) => {
    try {

        const res = await axios.post(conf.verifyEmailApi,{email,otp})
        return res

    } catch (error) {
        throw error
    }
};


const startServer = () =>{
    try {
        axios.get(conf.mailUrl)
        console.log('server request sent')
    } catch (error) {
        throw error
    }
}

export {handleSendOTP,handleVerifyOTP,startServer}
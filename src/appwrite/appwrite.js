import { Client, Account, ID, OAuthProvider } from "appwrite";
import conf from '../conf/conf.js';

export class AuthService{
    client = new Client()
    account

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    //create+login user using email,password.
    async createAccount({email,password,fullName,gender,dateofbirth,confirmPassword}){
        try {
            const createUser = await this.account.create(ID.unique(),email,password,fullName,dateofbirth,gender)
            if (createUser) {
                console.log(createUser)
                const session = await this.userLogin({email,password})
                return session

            } else {
                return createUser
            }

        } catch (error) {
            throw error
        }
    }
    // https://bloggify-one.vercel.app
    //http://localhost:5173

    // OAuth2 session creation
    async createOAuth2(){
        this.account.createOAuth2Session(OAuthProvider.Google,'https://bloggify-one.vercel.app/authentication-successful','https://bloggify-one.vercel.app/authentication-failed')
        
    }

    //Login user
    async userLogin({email,password}){
        try{
            const User = await this.account.createEmailPasswordSession(email,password)
            return User
        } catch (error) {
            throw error
        }
    }

    // get user details
    async getUser(){
        try {
            const User = await this.account.get()
            return User
        } catch (error) {
            throw error
        }

    }

    // logout user
    async userLogout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

    async forgetRequest(email){
        try {
            const tocken = await this.account.createRecovery(email,'https://bloggify-one.vercel.app/reset-password')

            return tocken? true : false
        } catch (error) {
            throw error
        }
    }

    async resetPassword(userid,secret,password){
        try {
            const res = await this.account.updateRecovery(userid,secret,password)
            return res? true: false
        } catch (error) {
            throw error
        }
    }

}


const authService = new AuthService()
export default authService
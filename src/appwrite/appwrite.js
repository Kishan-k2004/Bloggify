import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js';

export class AuthService{
    client = new Client()
    account

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    //create+login user using email,password.
    async createAccount({email,password,fullName,phone}){
        try {
            const createUser = await this.account.create(ID.unique(),email,password,fullName)
            if(createUser){
                console.log(createUser)
                const session = await this.UserLogin({email,password})
                if(session){
                    console.log(session)
                    await this.account.updatePhone(`+91${phone}`,password)
                }
                return session
                
            }else{
                return createUser
            }
        } catch (error) {
            throw error;
        }
    }
    //
    async userLogin({email,password}){
        try{
            const User = await this.account.createEmailPasswordSession(email,password)
            return User
        } catch (error) {
            throw error
        }
    }

    async getUser(){
        try {
            const User = await this.account.get()
            return User
        } catch (error) {
            throw error
        }

    }

}


const authService = new AuthService()
export default authService
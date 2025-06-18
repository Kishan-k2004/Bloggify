import conf from "../conf/conf";
import { Client,Databases,Query } from "appwrite";

export class ProfileService{

    client = new Client()
    database

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.database = new Databases(this.client)
    }


    async addAccount({fullname,dateofbirth,gender,email,userId}){
        try {

            const User = await this.haveUser(email)
            if(User){
                return
            }
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserProfileCollectionId,
                userId,
                {
                    fullname,
                    dateofbirth,
                    gender,
                    email
                }
            )
        } catch (error) {
            throw error
        }
    }


    async haveUser(email){
        try {
            const User = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserProfileCollectionId,
                [ Query.equal("email",[email])]
            )
            return User.documents.length > 0 ? User.documents[0] : null;
        } catch (error) {
            throw error
        }
    }


    async updateUserData({userId,...props}){
        try {
            if (!userId || Object.keys(props).length === 0) {
                throw new Error("Invalid input: userId and at least one field to update are required.");
            }

            const userData = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserProfileCollectionId,
                userId,
                {...props}
            )
            return userData
            
        } catch (error) {
            throw error
        }
    }

    async getUserData(userId){
        try {
            
            const userData = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserProfileCollectionId,
                userId
            )

            const {fullname,gender,bio,email,profileImg,coverImage,dateofbirth,$id,follower,blogs} = userData
            
            return {fullname,gender,bio,email,profileImg,coverImage,dateofbirth,$id,follower,blogs}
            
        } catch (error) {
            throw error
        }
    }


}

const profileService = new ProfileService()

export default profileService
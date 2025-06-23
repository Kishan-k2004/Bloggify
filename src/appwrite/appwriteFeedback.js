import { Client, Databases, Query } from "appwrite";
import conf from '../conf/conf.js';

export class Feedback{
    client = new Client()
    database

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.database = new Databases(this.client)
    }

    async getAllFeedback(){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.feedbackCollectionId,
                conf.feedbackDocumentId

            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async updateFeedback({...props}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.feedbackCollectionId,
                conf.feedbackDocumentId,
                {...props}
            )

        } catch (error) {
            console.log(error)
            return false
        }
    }

    async ValidateUser(userId){
        try {
            const res =  await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.feedbackCollectionId,
                [Query.equal('userId',[userId])]
            ) 
            return res.documents.length > 0 ? res.documents[0] : false;

        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getFeedbackScore(){
        try {
            const data = await this.getAllFeedback()
            
            if(data){
                const score = {
                    Design : data.Design.reduce((acc,curr)=> acc+curr,0),
                    SmoothLogin : data.SmoothLogin.reduce((acc,curr)=> acc+curr,0),
                    Responsive : data.Responsive.reduce((acc,curr)=> acc+curr,0),
                    visuallyAppealing : data.visuallyAppealing.reduce((acc,curr)=> acc+curr,0),
                    total : data.userId.length * 3
                }

                return score
            }else{
                return data
            }

        } catch (error) {
            console.log(error)
            return false
        }
    }


}


const feedbackService = new Feedback()

export default feedbackService
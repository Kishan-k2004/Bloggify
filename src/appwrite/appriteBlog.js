import conf from "../conf/conf";
import { Client,Databases,Query,ID } from "appwrite";

export class BlogService{

    client = new Client()
    database

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        
        this.database = new Databases(this.client)
    }



    async publishBlog({Title,Content,Image,AutherId,keywords}){

        function getcurrentdateinfo(){
            const today = new Date()

            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const day = days[today.getDay()]

            const dd = String(today.getDate()).padStart(2, '0')
            const mm = String(today.getMonth() + 1).padStart(2, '0')
            const yyyy = today.getFullYear()

            return `${day},${dd}/${mm}/${yyyy}`
        }

        try {
            const formattedDate = getcurrentdateinfo()
            const keywordsArray = keywords.split(',').map(k => k.trim())

            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                ID.unique(),
                {
                    Title,
                    Content,
                    Image,
                    AutherId,
                    Status:true,
                    keywords:keywordsArray,
                    Date:formattedDate
                }
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }


    async draftBlog(title,content,image,autherId,keywords){

        function getcurrentdateinfo(){
            const today = new Date()

            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const day = days[today.getDay()]

            const dd = String(today.getDate()).padStart(2, '0')
            const mm = String(today.getMonth() + 1).padStart(2, '0')
            const yyyy = today.getFullYear()

            return `${day},${dd}/${mm}/${yyyy}`
        }

        try {
            const formattedDate = getcurrentdateinfo()
            const keywordsArray = keywords.split(',').map(k => k.trim())

            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                ID.unique(),
                {
                    Title:title,
                    Content:content,
                    Image:image,
                    AutherId:autherId,
                    Status:false,
                    keywords:keywordsArray,
                    Date:formattedDate
                }
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getBlog(blogId){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                blogId
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }


    
}

const blogService = new BlogService()

export default blogService
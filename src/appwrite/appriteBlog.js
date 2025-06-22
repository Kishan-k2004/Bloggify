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

    async deleteBlog(blogId){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                blogId
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async updateBlog({blogId,Title,Content,Image,keywords,Status}){

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
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                blogId,
                {
                    Title,
                    Content,
                    Image,
                    keywords:keywordsArray,
                    Date:formattedDate,
                    Status
                }

            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async changeBlogStatus({blogId,Status}){
        try {

            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                blogId,
                {Status}

            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async toggleLikeDislike({blogId,...props}){
        try {

            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                blogId,
                {...props}

            )
        } catch (error) {
            console.log(error)
            return false
        }
    }
    
    async getSimilarBlog(keywords){
        if(keywords.length === 0) return false
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                [Query.equal('keywords',keywords)]
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getRecentBlog(){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                [
                    Query.equal('Status',[true]),
                    Query.orderDesc('$updatedAt'),
                    Query.limit(4)
                ]
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getallBlogs(page){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                [
                    Query.equal('Status',[true]),
                    Query.limit(6),
                    Query.offset(4+(page - 1) * 6),
                    Query.orderDesc('$updatedAt')
                ]
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async remainingBlogCount(){
        try {
            const res = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                [
                    Query.equal('Status',[true]),
                    Query.limit(1)
                ]
            )

            return Math.max(0,res?.total-4)
        } catch (error) {
            console.log(error)
            return false
        }
    }
    


    
}

const blogService = new BlogService()

export default blogService
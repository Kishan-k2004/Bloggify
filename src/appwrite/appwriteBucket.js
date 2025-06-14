import { Client, Account, ID, Storage } from "appwrite";
import conf from '../conf/conf.js';

export class Bucket{

    client = new Client()
    storage

    constructor(){
        this.client = this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.storage = new Storage(this.client)
    }


    async uploadFile(file) {
        try {
            const Image = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

            return Image

        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getFile(fileId){
        try {
            return await this.storage.getFile(
                conf.appwriteBucketId,
                fileId
            )

        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getFilePreview(fileId){
        try {
            return this.storage.getFileView(
                conf.appwriteBucketId,
                fileId
            )

        } catch (error) {
            console.log(error)
            return false
        }
    }
}

const bucket = new Bucket()

export default bucket
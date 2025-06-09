const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    sendEmailApi : String(import.meta.env.VITE_SENDEMAIL_API),
    verifyEmailApi : String(import.meta.env.VITE_VERIFYEMAIL_API),
    mailUrl : String(import.meta.env.VITE_MAIL_ENDPOINT)
}

export default conf
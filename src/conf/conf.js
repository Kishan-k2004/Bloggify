const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBlogCollectionId : String(import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID),
    appwriteUserProfileCollectionId : String(import.meta.env.VITE_APPWRITE_USER_PROFILE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    sendEmailApi : String(import.meta.env.VITE_SENDEMAIL_API),
    verifyEmailApi : String(import.meta.env.VITE_VERIFYEMAIL_API),
    mailUrl : String(import.meta.env.VITE_MAIL_ENDPOINT),
    defaultBanner: String(import.meta.env.VITE_DEFAULT_COVERIMAGE)
}

export default conf
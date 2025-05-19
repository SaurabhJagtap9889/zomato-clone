const { MongoClient } = require('mongodb');

// Local MongoDB connection string (update this with your local MongoDB URI)
const localUri = "mongodb://localhost:27017";
// Atlas MongoDB connection string
const atlasUri = "mongodb+srv://saurabhjagtap9889:iqJZhS94pOAFJR5v@cluster0.iracph8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function migrateData() {
    const localClient = new MongoClient(localUri);
    const atlasClient = new MongoClient(atlasUri);

    try {
        // Connect to both databases
        await localClient.connect();
        await atlasClient.connect();
        console.log("✅ Connected to both databases");

        // Get list of all databases from local MongoDB
        const localDbs = await localClient.db().admin().listDatabases();
        
        for (const dbInfo of localDbs.databases) {
            const dbName = dbInfo.name;
            
            // Skip system databases
            if (['admin', 'local', 'config'].includes(dbName)) continue;
            
            console.log(`\nMigrating database: ${dbName}`);
            
            const localDb = localClient.db(dbName);
            const atlasDb = atlasClient.db(dbName);
            
            // Get all collections in the database
            const collections = await localDb.listCollections().toArray();
            
            for (const collection of collections) {
                const collectionName = collection.name;
                console.log(`Migrating collection: ${collectionName}`);
                
                // Get all documents from local collection
                const documents = await localDb.collection(collectionName).find({}).toArray();
                
                if (documents.length > 0) {
                    // Insert documents into Atlas
                    await atlasDb.collection(collectionName).insertMany(documents);
                    console.log(`✅ Migrated ${documents.length} documents to ${collectionName}`);
                } else {
                    console.log(`No documents to migrate in ${collectionName}`);
                }
            }
        }
        
        console.log("\n✅ Migration completed successfully!");
        
    } catch (error) {
        console.error("❌ Migration failed:", error);
    } finally {
        await localClient.close();
        await atlasClient.close();
        console.log("Database connections closed");
    }
}

migrateData().catch(console.error); 
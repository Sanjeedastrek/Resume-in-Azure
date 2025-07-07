const { app, input, output } = require('@azure/functions');

// Define Cosmos DB input binding (reads from DB) must
const cosmosInput = input.cosmosDB({
    databaseName: 'db-cloud-resume',         // Your DB name
    containerName: 'counter',                // Your container name
    id: '1',                                 // Document ID to fetch
    partitionKey: '1',                       // Partition key (matches 'id' here)
    connection: 'AzureResumeConnectionString' // Must match key in local.settings.json
});

// Define Cosmos DB output binding (writes back to DB)
const cosmosOutput = output.cosmosDB({
    databaseName: 'db-cloud-resume',
    containerName: 'counter',
    partitionKey: '1',
    createIfNotExists: false,
    connection: 'AzureResumeConnectionString'
});

// Define the HTTP-triggered function
app.http('getResumeCounter', {
    methods: ['GET', 'POST'],

    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    extraOutputs: [cosmosOutput],

    handler: async (request, context) => {
        const currentCounter = context.extraInputs.get(cosmosInput);

        // Prepare updated counter object
        const updatedCounter = {
            id: currentCounter.id,
            count: currentCounter.count + 1
        };

        // Output to Cosmos DB
        context.extraOutputs.set(cosmosOutput, updatedCounter);

        // Return old count
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ count: input.count })
        

            body: JSON.stringify({ count: currentCounter.count})
    
        };
    }
});

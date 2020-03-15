require("dotenv").config();
var azure = require("azure-storage");

export const tableService = azure.createTableService(
	process.env.AZURE_STORAGE_ACCOUNT,
	process.env.AZURE_STORAGE_ACCESS_KEY
);

export const entGen = azure.TableUtilities.entityGenerator;

export const tableName: string = "SynonymTable";

import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { tableService, tableName } from "../utils/tableService";
import { getRequestResponse, errorResponse } from "../interfaces/interfaces";
var azure = require("azure-storage");

const httpTrigger: AzureFunction = async function(
	context: Context,
	req: HttpRequest
): Promise<void> {
	if (req.query.searchTerm) {
		await fetchSynonymsFromTable(req.query.searchTerm, tableName)
			.then(async (res: getRequestResponse) => {
				const parsedResponse = res.entries.map(entry => {
					let rowKeyValue = entry.RowKey._;
					let partitionKeyValue = entry.PartitionKey._;
					if (rowKeyValue === req.query.searchTerm) {
						return partitionKeyValue;
					} else {
						return rowKeyValue;
					}
				});

				let filterDuplicates: Function = (item: string[]) => [...new Set(item)];

				context.res = {
					status: 200,
					body: {
						term: req.query.searchTerm,
						synonyms: filterDuplicates(parsedResponse)
					}
				};
			})
			.catch(
				(err: errorResponse) =>
					(context.res = {
						status: err.statusCode,
						body: err.message
					})
			);
	} else {
		context.res = {
			status: 400,
			body: "Bad request, request params is invalid or was not passed."
		};
	}
};

export default httpTrigger;

const fetchSynonymsFromTable = (word: string, tableName: string) => {
	var query = new azure.TableQuery()
		.where("PartitionKey eq ?", word)
		.or("RowKey eq ?", word);

	return new Promise((resolve, reject) => {
		tableService.queryEntities(tableName, query, null, function(
			error: object,
			result: getRequestResponse
		) {
			if (!error) {
				resolve(result);
			} else {
				reject(error);
			}
		});
	});
};

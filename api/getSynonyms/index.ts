import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { tableService, tableName } from "../utils/tableService";
import { getRequestResponse, errorResponse } from "../interfaces/interfaces";
var azure = require("azure-storage");

const httpTrigger: AzureFunction = async function(
	context: Context,
	req: HttpRequest
): Promise<void> {
	if (req.query.searchTerm) {
		var n1SynonymsQuery = new azure.TableQuery()
			.where("PartitionKey eq ?", req.query.searchTerm)
			.or("RowKey eq ?", req.query.searchTerm);

		await fetchSynonymsFromTable(tableName, n1SynonymsQuery)
			.then(async (res: getRequestResponse) => {
				const parsedResponse: string[] = formatResponse(
					res,
					req.query.searchTerm
				);
				var combinedFilter = [];
				parsedResponse.forEach((word: string) => {
					combinedFilter.push(
						`PartitionKey eq '${word}' or RowKey eq '${word}'`
					);
				});
				var queryString = combinedFilter.join(" or ");
				var n2SynonymsQuery = new azure.TableQuery().where(queryString);

				await fetchSynonymsFromTable(tableName, n2SynonymsQuery)
					.then((res: getRequestResponse) => {
						context.res = {
							status: 200,
							body: {
								term: req.query.searchTerm,
								synonyms: formatResponse(res, req.query.searchTerm)
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

const fetchSynonymsFromTable = (tableName: string, query: any) => {
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

const filterDuplicates: Function = (item: string[]) => [...new Set(item)];

const formatResponse = (response: getRequestResponse, searchTerm: string) => {
	let a = response.entries.map(entry => {
		let rowKeyValue = entry.RowKey._;
		let partitionKeyValue = entry.PartitionKey._;
		if (rowKeyValue === searchTerm) {
			return partitionKeyValue;
		} else {
			return rowKeyValue;
		}
	});
	return filterDuplicates(a);
};

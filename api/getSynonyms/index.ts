import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { tableService, entGen } from "../utils/tableService";
var azure = require("azure-storage");

const httpTrigger: AzureFunction = async function(
	context: Context,
	req: HttpRequest
): Promise<void> {
	if (req.query.searchTerm) {
		await fetchEntitiesFromTable(req.query.searchTerm, "SynonymTable")
			.then((res: any) => {
				const responseBody = res.entries.map(item => {
					let rkValue = item["RowKey"]["_"];
					let pkValue = item["PartitionKey"]["_"];
					if (rkValue === req.query.searchTerm) {
						return pkValue;
					} else {
						return rkValue;
					}
				});

				let uniq = a => [...new Set(a)];

				context.res = {
					status: 200,
					body: uniq(responseBody)
				};
			})
			.catch(
				err =>
					(context.res = {
						status: 500,
						body: err
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

const fetchEntitiesFromTable = (word: string, tableName: string) => {
	var query = new azure.TableQuery()
		.where("PartitionKey eq ?", word)
		.or("RowKey eq ?", word);

	return new Promise((resolve, reject) => {
		tableService.queryEntities(tableName, query, null, function(
			error,
			result,
			response
		) {
			if (!error) {
				resolve(result);
			} else {
				console.log(error);
				reject({
					status: 500,
					body: error
				});
			}
		});
	});
};

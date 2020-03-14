import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { tableService, entGen } from "../utils/tableService";
var azure = require("azure-storage");

const httpTrigger: AzureFunction = async function(
	context: Context,
	req: HttpRequest
): Promise<void> {
	if (req.body && req.body.synonyms && req.body.word) {
		await insertEntitiesInTable(
			req.body.word,
			req.body.synonyms,
			"SynonymTable"
		)
			.then(
				res =>
					(context.res = {
						status: 204
					})
			)
			.catch(
				err =>
					(context.res = {
						status: 500,
						body: `Oops, something went wrong. Error message: ${err}`
					})
			);
	} else {
		context.res = {
			status: 400,
			response: "Bad request, request body is invalid or was not passed."
		};
	}
};

export default httpTrigger;

const insertEntitiesInTable = (
	word: string,
	synonyms: Array<string>,
	tableName: string
) => {
	let batch = new azure.TableBatch();

	synonyms.map(synonym => {
		let task = {
			PartitionKey: entGen.String(word),
			RowKey: entGen.String(synonym)
		};
		batch.insertOrReplaceEntity(task, { echoContent: true });
	});

	return new Promise((resolve, reject) => {
		tableService.executeBatch(tableName, batch, function(
			error,
			result,
			response
		) {
			if (!error) {
				resolve();
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

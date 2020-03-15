import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { tableService, entGen, tableName } from '../utils/tableService';
import { requestBody, errorResponse } from '../interfaces/interfaces';

const azure = require('azure-storage');

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  const requestBody: requestBody = req.body;
  if (req.body && requestBody.term && requestBody.synonyms) {
    await insertSynonymsInTable(
      requestBody.term,
      requestBody.synonyms,
      tableName,
    )
      .then(
        (res: null) => (context.res = {
          status: 204,
        }),
      )
      .catch(
        (err: errorResponse) => (context.res = {
          status: err.statusCode,
          body: `Oops, something went wrong. Error message: ${err.message}`,
        }),
      );
  } else {
    context.res = {
      status: 400,
      response: 'Bad request, request body is invalid or was not passed.',
    };
  }
};

export default httpTrigger;

const insertSynonymsInTable = (
  term: string,
  synonyms: Array<string>,
  tableName: string,
) => {
  const batch = new azure.TableBatch();

  synonyms.map((synonym) => {
    const task = {
      PartitionKey: entGen.String(term),
      RowKey: entGen.String(synonym),
    };
    batch.insertOrReplaceEntity(task, { echoContent: true });
  });

  return new Promise((resolve, reject) => {
    tableService.executeBatch(tableName, batch, (error: object) => {
      if (!error) {
        resolve();
      } else {
        reject(error);
      }
    });
  });
};

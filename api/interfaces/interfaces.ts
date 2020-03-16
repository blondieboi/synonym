export interface tableEntryElements {
	$: string;
	_: string;
}

export interface tableEntry {
	PartitionKey: tableEntryElements;
	RowKey: tableEntryElements;
	Timestamp: tableEntryElements;
	'.metadata': {
		etag: string;
	};
}

export interface getRequestResponse {
	entries: tableEntry[];
	continuationToken: boolean;
}

export interface requestBody {
	term: string;
	synonyms: string[];
}

export interface errorResponse {
	name: string;
	message: string;
	code: string;
	statusCode: number;
}

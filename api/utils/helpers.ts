import { getRequestResponse } from '../interfaces/interfaces'

export const filterDuplicates: Function = (item: string[]) => [...new Set(item)];

export const formatResponse = (response: getRequestResponse, searchTerm: string) => {
    const a = response.entries.map((entry) => {
      const rowKeyValue = entry.RowKey._;
      const partitionKeyValue = entry.PartitionKey._;
      if (rowKeyValue === searchTerm) {
        return partitionKeyValue;
      }
      return rowKeyValue;
    });
    return filterDuplicates(a);
  };
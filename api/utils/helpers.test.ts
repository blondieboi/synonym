import { filterDuplicates, formatResponse } from './helpers'
import {getRequestResponse} from '../interfaces/interfaces'

test('Function filters duplicates', () => {
    expect(filterDuplicates(['a', 'a', 'b'])).toEqual(['a','b'])
})

test('Format response', () => {
    let response: getRequestResponse = {
        entries: [
            {
                "PartitionKey": {
                    "$": "Edm.String",
                    "_": "a"
                },
                "RowKey": {
                    "$": "Edm.String",
                    "_": "b"
                },
                "Timestamp": {
                    "$": "Edm.DateTime",
                    "_": "2020-03-15T19:17:35.692Z"
                },
                ".metadata": {
                    "etag": "W/\"datetime'2020-03-15T19%3A17%3A35.692346Z'\""
                }
            },
            {
                "PartitionKey": {
                    "$": "Edm.String",
                    "_": "b"
                },
                "RowKey": {
                    "$": "Edm.String",
                    "_": "c"
                },
                "Timestamp": {
                    "$": "Edm.DateTime",
                    "_": "2020-03-15T19:17:39.730Z"
                },
                ".metadata": {
                    "etag": "W/\"datetime'2020-03-15T19%3A17%3A39.7302114Z'\""
                }
            }
        ],
        "continuationToken": null
    }

    let formatedResponse = ["b","c"]
    
    expect(formatResponse(response, 'a')).toEqual(formatedResponse)
})
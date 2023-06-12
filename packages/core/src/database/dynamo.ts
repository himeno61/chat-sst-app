import { EntityConfiguration } from "electrodb";
import { Table } from "sst/node/table";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const Client = new DynamoDBClient({});

export const Configuration: EntityConfiguration = {
    table: Table.StorageTable.tableName,
    client: Client,
};
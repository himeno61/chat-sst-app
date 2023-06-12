import { StackContext, Table } from "sst/constructs";
import { RemovalPolicy } from "aws-cdk-lib";

export function StorageStack({ stack }: StackContext) {
    // Create the table
    const database = new Table(stack, "StorageTable", {
        fields: {
            pk: "string",
            sk: "string",
            gsi1pk: "string",
            gsi1sk: "string",
        },
        primaryIndex: { partitionKey: "pk", sortKey: "sk" },
        globalIndexes: {
            "gsi1pk-gsi1sk-index": {
                partitionKey: "gsi1pk",
                sortKey: "gsi1sk",
            },
        },
        cdk: {
            table: {
                removalPolicy: stack.stage === "prod" ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
            },
        },
    });

    stack.addOutputs({
        DatabaseName: database.tableName,
    });

    return { database };
}
import { Entity, EntityItem } from "electrodb";
import { v4 as uuidv4 } from "uuid";

export const Message = new Entity({
    model: {
        entity: "Message",
        version: "1",
        service: "chatapp",
    },
    attributes: {
        id: {
            type: "string",
            default: () => uuidv4(),
            readOnly: true,
        },
        message: {
            type: "string",
            required: true,
            readOnly: true,
        },
        senderId: {
            type: "string",
            required: true,
            readOnly: true,
        },
        createdAtInternal: {
            type: "number",
            default: () => Date.now(),
            // cannot be modified after created
            readOnly: true,
        },
        updatedAtInternal: {
            type: "number",
            // watch for changes to any attribute
            watch: "*",
            // set current timestamp when updated
            set: () => Date.now(),
            readOnly: true,
        },
    },
    indexes: {
        byId: {
            pk: {
                field: "pk",
                composite: ["id"],
                casing: "none",
            },
            sk: {
                field: "sk",
                composite: [],
                casing: "none",
            },
        },
        bySender: {
            collection: "bySender",
            index: "gsi1pk-gsi1sk-index",
            pk: {
                field: "gsi1pk",
                composite: ["senderId"],
                casing: "none",
            },
            sk: {
                field: "gsi1sk",
                composite: ["createdAtInternal"],
                casing: "none",
            },
        },
    },
});

export type Message = EntityItem<typeof Message>;
import {Entity, EntityItem} from "electrodb";

export const ChatConnection = new Entity({
    model: {
        entity: "ChatConnection",
        version: "1",
        service: "chatapp",
    },
    attributes: {
        id: {
            type: "string",
        },
        createdAtInternal: {
            type: "number",
            default: () => Date.now(),
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
    },
});

export type ChatConnection = EntityItem<typeof ChatConnection>;
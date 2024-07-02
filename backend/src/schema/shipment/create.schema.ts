const createShipmentSchema = {
    type: "object",
    properties: {
        companyName: { type: "string" },
        shipmentDate: { type: "string" },
        statusId: { type: "number" },
        products: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    productId: { type: "number" },
                    quantity: { type: "number" },
                },
                required: ["productId", "quantity"],
                additionalProperties: false,
            },
        },
    },
    required: ["companyName", "shipmentDate", "statusId", "products"],
    additionalProperties: false,
};

export default createShipmentSchema;

const createProductSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        description: { type: "string" },
        quantity: { type: "number" },
        price: { type: "number" },
    },
    required: ["name", "quantity", "price"],
    additionalProperties: false,
};

export default createProductSchema;

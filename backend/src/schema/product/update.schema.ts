const updateProductSchema = {
    type: "object",
    properties: {
        id: { type: "number" },
        name: { type: "string" },
        description: { type: "string" },
        quantity: { type: "number" },
        price: { type: "number" },
    },
    required: ["id"],
    additionalProperties: false,
};

export default updateProductSchema;

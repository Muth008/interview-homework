const updateProductSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        quantity: { type: "string" },
        price: { type: "string" },
        imageUrl: { type: "string" },
        image: { type: "string", format: "binary" },
    },
    required: ["id"],
    additionalProperties: false,
};

export default updateProductSchema;

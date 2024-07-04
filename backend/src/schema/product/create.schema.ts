const createProductSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        description: { type: "string" },
        quantity: { type: "string" },
        price: { type: "string" },
        imageUrl: { type: "string" },
        image: { type: "string", format: "binary" },
    },
    required: ["name", "quantity", "price"],
    additionalProperties: false,
};

export default createProductSchema;

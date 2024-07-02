const listProductSchema = {
  type: 'object',
  properties: {
    id: {
      oneOf: [{ type: 'string' }, { type: 'number' }],
    },
    name: { type: 'string' },
    description: { type: 'string' },
    quantity: { type: 'number' },
    price: { type: 'number' },
  },
  additionalProperties: false,
};

export default listProductSchema;

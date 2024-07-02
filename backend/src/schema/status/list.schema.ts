const listStatusSchema = {
  type: 'object',
  properties: {
    id: {
      oneOf: [{ type: 'string' }, { type: 'number' }],
    },
    name: { type: 'string' },
  },
  additionalProperties: false,
};

export default listStatusSchema;

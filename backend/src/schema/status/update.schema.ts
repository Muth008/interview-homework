const updateStatusSchema = {
  type: 'object',
  properties: {
    id: {
      oneOf: [{ type: 'string' }, { type: 'number' }],
    },
    name: { type: 'string' },
  },
  required: ['name'],
  additionalProperties: false,
};

export default updateStatusSchema;

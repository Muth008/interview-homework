const createStatusSchema = {
  type: 'object',
  properties: {
    name: { type: 'number' },
  },
  required: ['name'],
  additionalProperties: false,
};

export default createStatusSchema;

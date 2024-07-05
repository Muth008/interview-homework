const deleteProductSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
  },
  required: ['id'],
  additionalProperties: false,
};

export default deleteProductSchema;

const getShipmentSchema = {
  type: 'object',
  properties: {
    id: {
      oneOf: [{ type: 'string' }, { type: 'number' }],
    },
  },
  required: ['id'],
  additionalProperties: false,
};

export default getShipmentSchema;

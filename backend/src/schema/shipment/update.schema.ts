const updateShipmentSchema = {
  type: 'object',
  properties: {
    id: {
      oneOf: [{ type: 'string' }, { type: 'number' }],
    },
    companyName: { type: 'string' },
    shipmentDate: { type: 'string' },
    statusId: { type: 'number' },
    products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          productId: { type: 'number' },
          quantity: { type: 'number' },
        },
        required: ['productId', 'quantity'],
        additionalProperties: false,
      },
    },
  },
  required: ['id'],
  additionalProperties: false,
};

export default updateShipmentSchema;

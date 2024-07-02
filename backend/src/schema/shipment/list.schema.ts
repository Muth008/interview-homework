const listShipmentSchema = {
  type: 'object',
  properties: {
    id: {
      oneOf: [{ type: 'string' }, { type: 'number' }],
    },
    shipmentId: { type: 'string' },
    companyName: { type: 'string' },
    shipmentDate: { type: 'string' },
    statusId: { type: 'number' },
  },
  additionalProperties: false,
};

export default listShipmentSchema;

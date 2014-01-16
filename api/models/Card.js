/**
 * Card
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    schema: true,

    attributes: {
        type: 'string',
        title: {
            type: 'string',
            required: true
        },
        imagePath: {
            type: 'string',
            required: true
        },
        attack: 'integer',
        defense: 'integer',
        cost: 'integer',
        quote: 'string',
        modifierSlots: 'integer',
        specialAbilities: 'array',
        createdBy: {
            type: 'string',
            required: true
        },
        createdAt: 'DATE',
        private: {
            type: 'boolean',
            defaultsTo: false
        }
  },


    // Lifecycle Callbacks
    beforeCreate: function(values, next) {
            values.createdAt = new Date;
            next();
    }

};

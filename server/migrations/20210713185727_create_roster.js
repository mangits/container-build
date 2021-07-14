
exports.up = function(knex) {
  return knex.schema.createTable('roster', table => {
    table.string('first')
    table.string('last');
  });
};

exports.down = function(knex) {

};

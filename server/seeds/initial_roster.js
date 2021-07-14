
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roster').del()
    .then(function () {
      // Inserts seed entries
      return knex('roster').insert([
        {first: 'Dua', last: 'Lipa'},
        {first: 'Ariana', last: 'Grande'},
        {first: 'Blake', last: 'Shelton'},
        {first: 'Sam', last: 'Hunt'},
        {first: 'Excision', last: ''},
        {first: 'Marshmallow', last: ''},
      ]);
    });
};
const AttorneyGenerals = require('../data/attorneyGenerals');
const UsAttorneys = require('../data/usAttorneys');
const DistrictAttorneys = require('../data/districtAttorneys');
let { buildSchema } = require('graphql');

const schema = buildSchema(`
  type AttorneyGeneral {
    id: String
    name: String
    state: String
  }

  type UsAttorney {
    id: String
    name: String
    state: String
    district: String
    appointed: String
  }

  type DistrictAttorney {
    id: String
    name: String
    state: String
    county: String
    role: String
  }

  type Prosecutor {
    id: String
    name: String
    role: String
    state: String
    district: String
    appointed: String
  }

  type Query {
    attorneyGeneral(id: String): AttorneyGeneral
    attorneyGenerals: [AttorneyGeneral]
    usAttorney(id: String): UsAttorney
    usAttorneys: [UsAttorney]
    districtAttorney(id: String): DistrictAttorney
    districtAttorneys: [DistrictAttorney]
    prosecutor(id: String!): Prosecutor
    prosecutors: [Prosecutor]
  }
`);

var global = {
  attorneyGeneral: ({id}) => AttorneyGenerals.find(g => g.id === id),
  attorneyGenerals: () => AttorneyGenerals,
  usAttorney: ({id}) => UsAttorneys.find(g => g.id === id),
  usAttorneys: () => UsAttorneys,
  districtAttorney: ({id}) => DistrictAttorneys.find(g => g.id === id),
  districtAttorneys: () => DistrictAttorneys,
  prosecutor: ({id}) => thing,
  prosecutors: () => [thing],
};

const thing = {
    attorneyId: "ua-al-m",
    name: "A. Clark Morris",
    role: "U.S. Attorney",
    state: "Alabama",
    district: "Middle District",
    appointed: "2017-03-11"
}

module.exports = { schema, global }

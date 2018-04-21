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
`)

var global = {
  attorneyGeneral: ({id}) => AttorneyGenerals.find(g => g.id === id),
  attorneyGenerals: () => AttorneyGenerals,
  usAttorney: ({id}) => UsAttorneys.find(g => g.id === id),
  usAttorneys: () => UsAttorneys,
  districtAttorney: ({id}) => DistrictAttorneys.find(g => g.id === id),
  districtAttorneys: () => DistrictAttorneys,
  prosecutor: ({id}, ctx) => getById(id, ctx),
  prosecutors: ({}, ctx) => get(ctx),
}

const getById = async (id, ctx) => {
  return await ctx.db.collection('documents').findOne({'attorney-id': id})
}

const get = async (ctx) => {
  return await ctx.db.collection('documents').find().toArray()
}

module.exports = { schema, global }

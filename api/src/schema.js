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
    prosecutors(id: String, state: String, name: String, role: String,
      disctrict: String): [Prosecutor]
  }
`)

var global = {
  attorneyGeneral: ({id}) => AttorneyGenerals.find(g => g.id === id),
  attorneyGenerals: () => AttorneyGenerals,
  usAttorney: ({id}) => UsAttorneys.find(g => g.id === id),
  usAttorneys: () => UsAttorneys,
  districtAttorney: ({id}) => DistrictAttorneys.find(g => g.id === id),
  districtAttorneys: () => DistrictAttorneys,
  prosecutors: (args, ctx) => getByField(args, ctx),
}

const getByField = async (args, ctx) => {
  if (args.id) {
    args['attorney-id'] = args.id
    let thing = args
    delete args.id
  }
  let arr = await ctx.db.collection('documents').find(args).toArray()
  arr.forEach((p) => p.id = p["attorney-id"])
  return arr
}

module.exports = { schema, global }

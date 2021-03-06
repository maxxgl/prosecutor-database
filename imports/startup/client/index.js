import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Attorneys } from '../../api/attorneys.js';

import '/client/main.html';

/**
 * HELPERS
 */

Template.registerHelper( 'findAttorneyType', (attorneyType) => {
  if (attorneyType === "Attorney General") {
    return Attorneys.find( {
      "role" : "Attorney General"
    } );
  } else if (attorneyType === "US Attorney") {
    return Attorneys.find( {
      "role": "U.S. Attorney"
    } );
  } else if (attorneyType === "District Attorney") {
    return Attorneys.find( {
      "role": "District Attorney"
    } );
  } else if(attorneyType === "Municipal Attorney") {
    return Attorneys.find( {
      "role": "Municipal Attorney"
    } );
  }
});

Template.currentProsecutors.helpers({
  allAttorneys() {
    return Attorneys.find().fetch();
  },
  recentAttorneys() {
    return Attorneys.find({}, {sort: {timestamp : 1}, limit: 6 }).fetch();
  }
});

Template.attorneyView.helpers({
  Attorneys() {
    return Attorneys.find().fetch();
  }
});

/**
 * ROUTES
 */
Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/:state/:role/:name', {
  name: 'attorneyView',
  template: 'attorneyView',
  data: function() {
    return Attorneys.findOne( { name: this.params.name } );
  },
  waitOn: function() {
    return Meteor.subscribe('Attorneys', this.params.name);
  }
});

Router.route('/about', {
  name: 'about',
  template: 'about'
});

Router.route('/contributors', {
  name: 'contributors',
  template: 'contributors'
});

Router.route('/glossary', {
  name: 'glossary',
  template: 'glossary'
});

Router.configure({
  layoutTemplate: 'main'
});

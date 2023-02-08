const express = require('express');
const db = require('../models/models');
const mongoose = require('mongoose');
const { User, Pet, Visit } = require('../models/models.js');
const { ObjectId } = require('mongodb');
const petController = {};

//returns petObj
petController.createPet = (req, res, next) => {
  console.log('Trying to create pet.....');
  const { Name, Age, Weight, Breed, AssignedVet } = req.body;
  const { ssid } = req.cookies;
  if (!Name || !ssid) {
    return next({
      log: 'Error in petController.createPet, missing Name input or SSID',
      status: 400,
      message: 'Missing input.',
    });
  }
  Pet.create({
    Name,
    Age,
    Weight,
    Breed,
    AssignedVet,
    Owner: ssid, //is the _id of UserObj, can betakeben from cookie, does not need to be user input
  })
    .then((pet) => {
      console.log('pet created!');
      res.locals.petObj = pet;
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.createPet encountering error',
        message: { err: 'Could not create pet' },
      });
    });
};

//get all pets using cookie as user identifier
petController.getUserPets = (req, res, next) => {
  console.log('attempting to retrieve all your pets...');
  const { ssid } = req.cookies;
  if (!ssid) {
    return next({
      log: 'Error in petController.getUserPets, when retrieving ssid',
      status: 400,
      message: { err: 'Error when retrieving pets.' },
    });
  }
  Pet.find({ Owner: ssid })
    .then((data) => {
      console.log('pets collected, ', data);
      res.locals.allPets = data; //array of documents
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.getPet failed',
        message: { err: 'Could not retrive pet that you asked for' },
      });
    });
};

//delete pet but taking in Pet._id
petController.deletePet = (req, res, next) => {
  console.log('trying to delete pet');
  const { _id } = req.body;
  if (!_id) {
    return next({
      log: 'Err in petController.deletePet, when acquiring _id',
      status: 418,
      message: {
        err: 'Could choose pet to delete.',
      },
    });
  }
  Pet.findOneAndDelete({ _id })
    .then((pet) => {
      consople.log('pet deleted. GOOD BYE', pet);
      res.locals.deletedPet = pet;
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.deletePet failed',
        message: { err: 'Could not find and delete pet' },
      });
    });
};

petController.updatePet = (req, res, next) => {
  console.log('Trying to update the pet');
  const { _id, Name, Age, Weight, Breed, LastVisit, AssignedVet } = req.body;
  //for testing purposes
  // const s_id = _id.toString();
  console.log('req.body:', req.body);
  // if (LastVisit.date) {
  //   Visit.create({
  //     Pet: _id,
  //     Date: LastVisit.date,
  //     Description: LastVisit.description,
  //     Vet: LastVisit.vet,
  //   }).then((visit) => {
  //     console.log('new visit created', visit);
  //     res.locals.newVisit = visit;
  //   });
  // }
  Pet.findOneAndUpdate(
    //for testing puporses
    { _id },
    //{ _id },
    { $set: { Name, Age, Weight, Breed, AssignedVet } },
    //returns the new updated pet
    { new: true }
  )
    .then((pet) => {
      if (!pet) {
        return next({
          log: 'pets.controller updatepets could not update pet',
          message: {
            err: 'Could not update pet, please look into input/params',
          },
        });
      } else {
        console.log('pet info updated', pet);
        return next();
      }
    })
    .catch((err) => {
      next({
        log: 'petsController.updatePet failed',
        message: { err: 'Could not update pet' },
      });
    });
};

petController.updateVisits = (req, res, next) => {
  const { newVisit } = res.locals;
  if (!newVisit) {
    console.log('Visits were not updated');
    return next();
  }
  Visit.findOneAndUpdate(
    { Pet: newVisit.Pet },
    {
      Date: newVisit.Date,
      Description: newVisit.Description,
      Vet: newVisit.Vet,
    }
  )
    .exec()
    .then((visit) => {
      console.log('visit updated', visit);
    })
    .catch((err) => {
      return next({
        log: 'Error in petController.updateVisits, unable to update',
        status: 418,
        message: {
          err: 'Cannot update',
        },
      });
    });
};
module.exports = petController;

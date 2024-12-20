import type { Request, Response } from 'express';

import User from '../models/User.js';

import { signToken } from '../services/auth.js';

// get a single user by either their id or their username
export const getSingleUser = async (req: Request, res: Response) => {
  const foundUser = await User.findOne({
    $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }],
  });

    if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    return res.json(foundUser);
}

// create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
export const createUser = async (req: Request, res: Response) => {
    const user = await User.create(req.body);

    if (!user) {
        return res.status(400).json({ message: 'Something is wrong! Unable to create your account!' });
    }
    const token = signToken(user.username, user.password, user._id);
    return res.json({ token, user });
}

// login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// {body} is destructured req.body
export const login = async (req: Request, res: Response) => {
    const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (!user) {
        return res.status(400).json({ message: "Unable to login, please enter a valid username or password" });
    }

    const correctPw = await user.isCorrectPassword(req.body.password);

    if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user.username, user.password, user._id);
    return res.json({ token, user });
}

// save a menu item to a user's `menu` field by adding it to the set (to prevent duplicates)
// user comes from `req.user` created in the auth middleware function
export const saveMenu = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $addToSet: { meal: req.body } },
            { new: true, runValidators: true }
        );
        return res.json(updatedUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// update a menu item in a user's `menu` field
export const updateMenu = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id, "meal._id": req.params.id },
            { $set: { "meal.$": req.body } },
            { new: true }
        );
        return res.json(updatedUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// remove a menu item from a user's `menu` field by pulling it from the set
export const removeMenu = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { meal: { _id: req.params.id } } },
            { new: true }
        );
        return res.json(updatedUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// save a reservation to a user's `reservation` field by adding it to the set (to prevent duplicates)
// user comes from `req.user` created in the auth middleware function
export const saveReservation = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $addToSet: { reservation: req.body } },
            { new: true, runValidators: true }
        );
        return res.json(updatedUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// remove a reservation from a user's `reservation` field by pulling it from the set
export const removeReservation = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { reservation: { _id: req.params.id } } },
            { new: true }
        );
        return res.json(updatedUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// update a reservation in a user's `reservation` field
export const updateReservation = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id, "reservation._id": req.params.id },
            { $set: { "reservation.$": req.body } },
            { new: true }
        );
        return res.json(updatedUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}


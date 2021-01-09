import { Db } from 'mongodb'

import { codeGenerator } from '../utils/Helpers'

export const getUserById = async (db: Db, id: string) => {
    return db.collection('users').findOne({ _id: id })
}

export const getAllUsers = async (db: Db) => {
    return db
        .collection('users')
        .aggregate([
            { $match: { status: 'ACTIVE' } },
            {
                $lookup: {
                    from: 'families',
                    localField: 'family_id',
                    foreignField: '_id',
                    as: 'family',
                },
            },
            { $unwind: '$family' },
            { $sort: { firstName: 1 } },
        ])
        .toArray()
}

export const addUser = async (db: Db, user) => {
    const newUser = await db
        .collection('users')
        .insertOne({ ...user, code: codeGenerator('user') })
        .then(({ ops }) => ops[0])
    return newUser
}

export const findUserById = async (db: Db, _id) => {
    return db.collection('users').findOne({ _id })
}

export const updateUser = async (db: Db, _id, new_records) => {
    return db.collection('users').updateOne(_id, new_records)
}

export const deleteUser = async (db: Db, _id) => {
    return db.collection('users').deleteOne({ _id })
}

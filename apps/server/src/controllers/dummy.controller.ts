import { Request, Response } from 'express'
import { db } from '../model'
import { Prisma, User } from '@prisma/client'
import { faker } from '@faker-js/faker'

export const DummyController = (req: Request, res: Response) => {
  switch (req.method) {
    case 'GET':
      return Get(req, res)
    case 'POST':
      return Post(req, res)
    case 'DELETE':
      return Delete(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const Get = async (req: Request, res: Response) => {
  const {
    id
  }: {
    id: string
  } = req.body

  const user = await db.user.findUnique({
    where: {
      id
    }
  })

  if (!user) return res.status(404).json({ error: 'User not found' })

  res.status(200).json(user)
}

const Post = async (req: Request, res: Response) => {
  const user: User = {
    id: faker.datatype.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email()
  }

  await db.user.create({
    data: user
  })

  res.status(200).json(user)
}

const Delete = async (req: Request, res: Response) => {
  const {
    id
  }: {
    id: string
  } = req.body

  try {
    const user = await db.user.delete({
      where: {
        id
      }
    })

    if (!user) return res.status(404).json({ error: 'User not found' })
    res.status(200).json({ message: 'User deleted' })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

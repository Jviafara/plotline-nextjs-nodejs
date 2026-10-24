import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany()

    const teamsWithUsernames = await Promise.all(
      teams.map(async team => {
        const productOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: {
            username: true,
          },
        })
        const productManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: {
            username: true,
          },
        })

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          productManagerUsername: productManager?.username,
        }
      }),
    )

    res.json(teamsWithUsernames)
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving teams: ${error.message}` })
  }
}

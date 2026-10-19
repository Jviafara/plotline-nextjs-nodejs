import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  console.log('Get Projects')
  try {
    const projects = await prisma.project.findMany()

    console.log(projects)

    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects!' })
  }
}

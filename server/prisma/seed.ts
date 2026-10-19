import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../prisma/generated/prisma/client.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const __dirname = import.meta.dirname

const orderedFileNames = [
  'team.json',
  'project.json',
  'projectTeam.json',
  'user.json',
  'task.json',
  'attachment.json',
  'comment.json',
  'taskAssignment.json',
]

const modelNameOf = (fileName: string) => path.basename(fileName, path.extname(fileName))

async function deleteAllData() {
  for (const fileName of [...orderedFileNames].reverse()) {
    const modelName = modelNameOf(fileName)
    const model = (prisma as any)[modelName]
    try {
      await model.deleteMany({})
      console.log(`Cleared data from ${modelName}`)
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error)
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, 'seedData')

  await deleteAllData()

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName)
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const modelName = modelNameOf(fileName)
    const model = (prisma as any)[modelName]

    try {
      for (const data of jsonData) {
        await model.create({ data })
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`)
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error)
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())

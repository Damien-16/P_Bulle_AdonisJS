import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
export default class extends BaseSeeder {
  async run() {
    // Création de users
    await User.createMany([
      { username: 'Albert', password: 'user1234', isAdmin: false },
      { username: 'Edouard', password: 'admin1234', isAdmin: true },
    ])
  }
}

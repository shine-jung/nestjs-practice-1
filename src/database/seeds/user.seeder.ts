import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager, // factory로 fake 데이터에 대한 규칙을 설정할 수 있음
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    // 하나의 데이터 또는 여러 데이터를 생성할 수 있음
    await repository.insert([
      {
        username: 'admin',
        password: '1234',
        name: '관리자',
      },
      {
        username: 'user',
        password: '1234',
        name: '사용자',
      },
      {
        username: 'user2',
        password: '1234',
        name: '사용자2',
      },
    ]);
  }
}

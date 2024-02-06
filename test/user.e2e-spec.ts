import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateUserDto } from '../src/user/dtos/create-user.dto';
import { User } from '../src/user/user.entity';
import { UserModule } from '../src/user/user.module';
import { AuthGuard } from '@nestjs/passport';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesGuard } from '../src/auth/guards/roles.guard';

const mockUsers: User[] = [
  {
    id: 1,
    username: 'myuser',
    email: 'mu@mail.com',
    password: '1234',
    photo: '',
    role: 'user',
    loans: [],
    hashPassword: () => Promise.resolve(),
  },
];
describe('UserController (e2e)', () => {
  let app: INestApplication;
  const mockRepositoryUser = {
    save: jest.fn().mockImplementation((createUserDTO: CreateUserDto) => {
      return Promise.resolve({
        id: 1,
        loans: [],
        ...createUserDTO,
      });
    }),
    find: jest.fn().mockImplementation(() => mockUsers),
  };
  let moduleFixture: TestingModule;
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockRepositoryUser)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.statusCode).toBe(200);
    console.log(response.body);

    expect(JSON.stringify(response.body)).toBe(JSON.stringify(mockUsers));
  });
  it('/users (GET) should not be accessible', async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => false })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockRepositoryUser)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    return request(app.getHttpServer()).get('/users').expect(403);
  });
});

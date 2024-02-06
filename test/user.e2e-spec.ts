import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { AppModule } from '../src/app.module';
import { UserModule } from '../src/user/user.module';
import {
  MongooseModule,
  // getConnectionToken,
  getModelToken,
} from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

const users: Array<User & { _id: Types.ObjectId }> = [
  {
    _id: new Types.ObjectId('65b6a894a9e97d5837470527'),
    username: 'Juan',
    email: 'juan@mail.com',
    password: '$2b$10$uYUoQ/mZFSS3Jb6Abd/cRO.ymB8gsCpPrCkbcd8EecGx6vwWqYHya',
    photo: '',
    role: 'user',
    loans: [],
  },
  {
    _id: new Types.ObjectId('65b8b6454d26a3aaae340e42'),
    username: 'myuser',
    email: 'mu@mail.com',
    password: '$2b$10$sg0JDPUJB2kaVf/uiPXQbeoDW3LgnToX9ckdzaRw/0r6Ma4CXK56.',
    photo: '',
    role: 'user',
    loans: [],
  },
];

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let mockUserModel: Partial<Model<User>>;
  const mockBookModel = {};
  beforeEach(async () => {
    mockUserModel = {
      find: jest
        .fn()
        .mockImplementation(() => ({ exec: () => Promise.resolve(users) })),
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        MongooseModule.forRoot('mongodb://localhost:27017/library'),
      ],
    })
      // .overrideModule(

      // )
      // .useModule(UserModule)

      // .overrideProvider(getConnectionToken())
      // .useValue({
      //   getRepository: jest.fn().mockReturnValue({
      //     find: jest.fn().mockResolvedValue([]),
      //     findOne: jest.fn().mockResolvedValue({}),
      //   }),
      // })
      .overrideProvider(getModelToken('User'))
      .useValue(mockUserModel)
      .overrideProvider(getModelToken('Book'))
      .useValue(mockBookModel)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', async () => {
    // return request(app.getHttpServer())
    //   .get('/')
    //   .expect(200)
    //   .expect('Hello World!');
    const response = await request(app.getHttpServer()).get('/users');
    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body)).toBe(JSON.stringify(users));
  });
});

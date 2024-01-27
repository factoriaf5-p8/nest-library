import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

const mockUsers: User[] = [
  {
    id: 1,
    username: 'laura',
    email: 'laura@mail.com',
    password: '4321',
    photo: '',
    role: 'user',
    loans: [],
  },
];
describe('UserService', () => {
  let service: UserService;
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
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepositoryUser,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('method create', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    it('should create one user', async () => {
      const createUserDto = {
        username: 'laura',
        email: 'laura@mail.com',
        password: '4321',
        photo: '',
        role: 'user',
      };
      const result = await service.create(createUserDto);
      expect(result).toMatchObject(mockUsers[0]);
    });
    //TO-DO otro TEST: hacer el test para probar userService.findAll()
    describe('method findAll', () =>
      it('should return a list of users', async () => {
        expect(await service.findAll()).toMatchObject(mockUsers);
      }));
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './create-user.dto';
describe('UserService', () => {
  let service: UserService;
  const mockRepositoryUser = {
    save: jest.fn().mockImplementation((createUserDTO: CreateUserDto) => {
      return Promise.resolve({
        id: 1,
        loan: [],
        ...createUserDTO,
      });
    }),
    find: jest.fn() //FALTA LA IMPLEMENTACION
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
      expect(result).toMatchObject({
        id: 1,
        username: 'laura',
        email: 'laura@mail.com',
        password: '4321',
        photo: '',
        role: 'user',
        loan: [],
        // id: expect.any(Number),
      });
      //TO-DO otro TEST: hacer el test para probar userService.findAll()
      
    });
  });
});

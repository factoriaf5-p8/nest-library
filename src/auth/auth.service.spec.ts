import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserService: Partial<UserService>;
  let mockJwtService: Partial<JwtService>;
  const username = 'test';
  const password = '1234';
  // let hashedPassword: string;
  let verifyPasswordSpy: jest.SpyInstance<Promise<boolean>>;

  beforeEach(async () => {
    // hashedPassword = await hash(password, 10);

    mockUserService = {
      findUser: (username: string): Promise<User> =>
        Promise.resolve({
          id: 1,
          email: 'mi@mail.com',
          password: 'hashedPassword',
          username,
          photo: '',
          role: 'user',
          loans: [],
          hashPassword: () => Promise.resolve(),
        }),
    };

    mockJwtService = {
      sign: jest.fn().mockReturnValue('token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    verifyPasswordSpy = jest.spyOn(service, 'verifyPassword');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser()', () => {
    it('throws an Unauthorized Exception if no user is found', async () => {
      mockUserService.findUser = () => null;
      expect(service.validateUser(username, password)).rejects.toThrow();
    });
    it('throws an Unauthorized Exception if password does not match user.password', async () => {
      verifyPasswordSpy.mockResolvedValue(false);
      expect(
        service.validateUser(username, 'invalidPassword'),
      ).rejects.toThrow();
    });

    it('returns a user if user is found and passwords match', async () => {
      verifyPasswordSpy.mockResolvedValue(true);
      const user = await service.validateUser(username, password);
      expect(user).toBeDefined();
    });

    it('returns a user with no password if user is found', async () => {
      verifyPasswordSpy.mockResolvedValue(true);
      const user = await service.validateUser(username, password);
      expect({ password }).not.toMatchObject(user);
    });
    it('calls verifyPassword method with password and user.password', async () => {
      const user = await mockUserService.findUser(username);
      verifyPasswordSpy.mockResolvedValue(true);
      await service.validateUser(username, password);
      expect(verifyPasswordSpy).toHaveBeenCalledWith(password, user.password);
    });

    describe('signin()', () => {
      it('calls jwtService.sign with passed in user', async () => {
        const user = await mockUserService.findUser(username);
        service.signin(user);
        const payload = {
          username: user.username,
          sub: user.id,
          role: user.role,
        };
        expect(mockJwtService.sign).toHaveBeenCalledWith(payload);
      });
    });
  });
});

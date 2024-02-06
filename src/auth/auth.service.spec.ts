import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService: Partial<UserService> = {};
  let mockJwtService: Partial<JwtService>;

  beforeEach(async () => {
    mockJwtService = {
      sign: jest.fn().mockImplementation((payload) => null),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('validateUser()', () => {
    const user = {
      _id: new Types.ObjectId('65afabba53650812f1d1a2e1'),
      username: 'lola',
      email: 'lola@mail.com',
      password: '1234',
      photo: '',
      role: 'user',
      loans: [],
      __v: 1,
    };

    it('throws an Unauthorized exception if no user is found', async () => {
      mockUserService.findOne = jest.fn().mockResolvedValue(null);
      service.verifyPassword = jest.fn().mockResolvedValue(false);

      try {
        await service.validateUser('test', '1234');
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
    it('returns an user with no password when a user is found', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      mockUserService.findOne = jest.fn().mockResolvedValue(user);
      service.verifyPassword = jest.fn().mockResolvedValue(true);
      expect(await service.validateUser('lola', '1234')).toMatchObject(result);
    });
    it('calls verifyPassword method with password and user.password', async () => {
      mockUserService.findOne = jest.fn().mockResolvedValue(user);
      service.verifyPassword = jest.fn().mockResolvedValue(true);
      const password = '1234';
      await service.validateUser('lola', password);
      expect(service.verifyPassword).toHaveBeenCalledWith(
        password,
        user.password,
      );
    });
  });
  describe('signin', () => {
    const user = {
      _id: new Types.ObjectId('65afabba53650812f1d1a2e1'),
      username: 'lola',
      email: 'lola@mail.com',
      password: '1234',
      photo: '',
      role: 'user',
      loans: [],
      __v: 1,
    };

    it('should call jwtService.sign with a payload', async () => {
      const payload = { username: user.username, sub: user._id };
      // mockJwtService.sign = (payload) => null;
      service.signIn(user);
      expect(mockJwtService.sign).toHaveBeenCalledWith(payload);
    });
  });
});

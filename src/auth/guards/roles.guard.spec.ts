import { ExecutionContext } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { Role } from '../constants/role.enum';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow if roles match', () => {
    // jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.Admin]);
    const context = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            role: Role.Admin,
          },
        }),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(context)).toBeTruthy();
  });

  it('should deny if roles do not match', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.Admin]);
    const context = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            role: Role.User,
          },
        }),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(context)).toBeFalsy();
  });
});

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard {
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
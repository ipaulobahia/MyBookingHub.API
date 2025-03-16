import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetBusinessId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const businessId = request.headers['x-businessid'];
    return businessId;
  },
);

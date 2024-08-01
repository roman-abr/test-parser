import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const BodyParse = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (!request.body?.url) {
    throw new BadRequestException(`Missing required param: 'url'`);
  }
  try {
    new URL(request.body.url);
  } catch (e) {
    throw new BadRequestException(`Invalid param: 'url'`);
  }

  return {
    url: request.body.url,
  };
});

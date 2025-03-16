import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedRepositoryModule } from 'src/shared/repositories/shared-repository.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [SharedRepositoryModule, PassportModule],
  controllers: [],
  providers: [JwtStrategy],
})
export class AuthModule { }
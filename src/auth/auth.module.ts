import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedRepositoryModule } from 'src/shared/repositories/shared-repository.module';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [SharedRepositoryModule, PassportModule, HttpModule],
  controllers: [],
  providers: [JwtStrategy, AuthService]
})
export class AuthModule { }
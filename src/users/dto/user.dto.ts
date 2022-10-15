import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends OmitType(CreateUserDto, ['password']) {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @Exclude()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;
}

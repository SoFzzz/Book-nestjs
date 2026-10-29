import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;

    @ValidateNested()
    @Type(() => CreateProfileDto)
    @IsNotEmpty()
    profile: CreateProfileDto;


}

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;

    @ValidateNested()
    @Type(() => CreateProfileDto)
    @IsNotEmpty()
    profile: CreateProfileDto;
}
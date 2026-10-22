import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  

  private users: User[] = [
    {
      id: 1,
      name: 'Daza',
      email: 'bananoUcc@gmail.com',
      isActive: true,
    },
    {
      id: 2,
      name: 'Camilo',
      email: 'camilo.dev@gmail.com',
      isActive: true,
    },
    {
      id: 3,
      name: 'Valentina',
      email: 'valen.ing@gmail.com',
      isActive: true,
    },
    {
      id: 4,
      name: 'Mateo',
      email: 'mateo.ucc@gmail.com',
      isActive: true,
    },
    {
      id: 5,
      name: 'Lucia',
      email: 'lucia.codes@gmail.com',
      isActive: true,
    },
    {
      id: 6,
      name: 'Andres',
      email: 'andres.soft@gmail.com',
      isActive: true,
    },
    {
      id: 7,
      name: 'Mariana',
      email: 'mariana.datos@gmail.com',
      isActive: true,
    },
    {
      id: 8,
      name: 'Julian',
      email: 'julian.net@gmail.com',
      isActive: true,
    },
    {
      id: 9,
      name: 'Daniela',
      email: 'dani.systems@gmail.com',
      isActive: true,
    },
    {
      id: 10,
      name: 'Sebastian',
      email: 'sebas.code@gmail.com',
      isActive: true,
    },
  ];

  async findAll(){
    const users = await this.userRepository.find();
    return users;
  }

  async findById(id: number) {
    console.log('.:: User ID: ', id);
    const user = await this.findOne(id);
    console.log('.:: usuario buscado: ', user);
    if (user === undefined) {
      // Simulación de usuario no encontrado, error 404
      throw new NotFoundException(`Usuario con ID ${id} no existe`);
    }

    // Simulación para error de permisos
    if (user.id === 1) {
      throw new ForbiddenException(
        `No tienes permisos para acceder al usuario con ID ${id}`,
      );
    }
    return user;
  }

  search(name: string): any | undefined {
    const data = this.users.find((user) => user.name === name);
    if (!data) {
      throw new NotFoundException(`Usuario con nombre ${name} no existe`);
    }
    return { result: data.email };
  }

  create(userPayload: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(userPayload);
      return newUser;
    } catch (error) {
      throw new ForbiddenException(
        `Error al crear el usuario`,
      );
    }
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException(`Usuario con ID ${id} no existe`);
    }
    this.userRepository.delete(user.id);

    return {
      msg: 'Usuario eliminado correctamente',
    };
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    const updateUser = this.userRepository.merge(user, changes);
    await this.userRepository.save(updateUser);

    return {
      msg: 'Usuario actualizado',
      data: updateUser,
    };
  }

  nicknameGenerator(name: string): string {
    return name.substring(0, 3) + '123';
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no existe`);
    }
    return user;
  }
}

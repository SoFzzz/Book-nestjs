import { Controller, Get, Param } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {

    private users: User[] = [
        {
            id: '1',
            name: 'Daza',
            email: 'bananoUcc@gmail.com'
        },

        {
            "id": "2",
            "name": "Camilo",
            "email": "camilo.dev@gmail.com"
        },

        {
            "id": "3",
            "name": "Valentina",
            "email": "valen.ing@gmail.com"
        },

        {
            "id": "4",
            "name": "Mateo",
            "email": "mateo.ucc@gmail.com"
        },

        {
            "id": "5",
            "name": "Lucia",
            "email": "lucia.codes@gmail.com"
        },

        {
            "id": "6",
            "name": "Andres",
            "email": "andres.soft@gmail.com"
        },

        {
            "id": "7",
            "name": "Mariana",
            "email": "mariana.datos@gmail.com"
        },

        {
            "id": "8",
            "name": "Julian",
            "email": "julian.net@gmail.com"
        },

        {
            "id": "9",
            "name": "Daniela",
            "email": "dani.systems@gmail.com"
        },

        {
            "id": "10",
            "name": "Sebastian",
            "email": "sebas.code@gmail.com"
        }
    ]

    @Get()
    getUsers(){
    return this.users;
}

    @Get(':id')
    getUserById(@Param('id') id: string){
        console.log(',:: UserID:', id);
        const data = this.users.find((user) => user.id === id);
        console.log('.:: data: ', data);
        
        return data;
    }

    @Get('search/:name')
    getEmailByName(@Param('name') name: string){
        console.log(',:: UserName:', name);
        const data = this.users.find((user) => user.name === name);
        return data?.email;
    }

}


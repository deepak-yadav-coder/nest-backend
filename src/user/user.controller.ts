import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getAllUsers() {
        return this.userService.getUsers();
    }

    @Get(':name')
    getUserByName(@Param('name') name: string) {
        return this.userService.getUserByName(name);
    }

    @Post()
    createUser(@Body() body: { name: string; age: number }) {
        return this.userService.createUser(body);
    }

    @Put(':name')
    updateUser(@Param('name') name: string, @Body() body: { name: string, age: number }) {
        return this.userService.updateUser(name, body);
    }

    @Delete(':name')
    deleteUser(@Param('name') name: string) {
        return this.userService.deleteUser(name)
    }
}

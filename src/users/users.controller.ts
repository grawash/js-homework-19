import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./DTOs/create-user.dto";
import { UpdateUserDto } from "./DTOs/update-user.dto";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(){
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    getUserById(@Param() params){
        const id = Number(params.id)
        return this.usersService.getUserById(id)
    }

    @Post()
    createUser(@Body() body: CreateUserDto){
        return this.usersService.createUser(body)
    }

    @Delete(':id')
    deleteUserById(@Param() params){
        const id = Number(params.id)
        return this.usersService.deleteUserById(id)
    }

    @Put(':id')
    updateUser(@Param() params, @Body() body: UpdateUserDto){
        const id = Number(params.id)
        return this.usersService.updateUser(id,body)
    }
}
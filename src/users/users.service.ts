import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./DTOs/create-user.dto";
import { UpdateUserDto } from "./DTOs/update-user.dto";

@Injectable()
export class UsersService{
    private users = [
        {id: 1, name: 'john', age:24},
        {id: 2, name: 'susan', age:27}
    ]

    getAllUsers(){
        return this.users
    }
    getUserById(id: number){
        const user = this.users.find(el => el.id === id)
        if(!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        return user
    }

    createUser(body: CreateUserDto){
        const lastId = this.users[this.users.length-1]?.id || 0
        const newUser = {
            id: lastId+1,
            name: body.name,
            age: body.age
        }
        this.users.push(newUser)
        return newUser
    }

    deleteUserById(id: number){
        const index = this.users.findIndex(el => el.id === id)
        if(index === -1){
            throw new HttpException('invalid user id provided', HttpStatus.BAD_REQUEST)
        }
        const deletedUser = this.users.splice(index, 1)
        return deletedUser
    }

    updateUser(id: number, body: UpdateUserDto){
        const index = this.users.findIndex(el => el.id === id)
        if(index === -1){
            throw new HttpException('invalid user id provided', HttpStatus.BAD_REQUEST)
        }
        const updatedUser = {
            id: id,
            name: body.name || this.users[index].name,
            age: body.age || this.users[index].age
        }
        this.users[index] = updatedUser;
        return updatedUser
    }
}
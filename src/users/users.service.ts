import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./DTOs/create-user.dto";
import { UpdateUserDto } from "./DTOs/update-user.dto";

@Injectable()
export class UsersService {
    private users = [
        { id: 1, firstName: 'John', lastName: "Doe", email: 'example@example.com', gender: "male" },
        { id: 2, firstName: 'Susan', lastName: "Doe", email: 'example@example.com', gender: "female" },
    ];

    getAllUsers() {
        return this.users;
    }

    getUserById(id: number) {
        const user = this.users.find(el => el.id === id);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return user;
    }

    createUser(body: CreateUserDto) {
        const lastId = this.users[this.users.length - 1]?.id || 0;
        const newUser = {
            id: lastId + 1,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender
        };
        this.users.push(newUser);
        return newUser;
    }

    deleteUserById(id: number) {
        const index = this.users.findIndex(el => el.id === id);
        if (index === -1) {
            throw new HttpException('Invalid user ID provided', HttpStatus.BAD_REQUEST);
        }
        const deletedUser = this.users.splice(index, 1);
        return deletedUser;
    }

    updateUser(id: number, body: UpdateUserDto) {
        const index = this.users.findIndex(el => el.id === id);
        if (index === -1) {
            throw new HttpException('Invalid user ID provided', HttpStatus.BAD_REQUEST);
        }
        const updatedUser = {
            ...this.users[index], // Keep existing values
            firstName: body.firstName || this.users[index].firstName,
            lastName: body.lastName || this.users[index].lastName,
            email: body.email || this.users[index].email,
            gender: body.gender || this.users[index].gender
        };
        this.users[index] = updatedUser;
        return updatedUser;
    }
}

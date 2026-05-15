import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UserService {
    users: any[] = [];
    user: any = {};

    constructor() {
        this.users = [
            { id: 1, name: 'deepak', age: 23 },
            { id: 2, name: 'name2', age: 22 },
            { id: 3, name: 'name3', age: 12 },
            { id: 4, name: 'name4', age: 13 },
        ]
    }

    getUsers() {
        return this.users
    }

    getUserByName(name) {

        this.user = this.users.find(user => user.name == name);
        if (this.user) {
            return this.user
        } else {
            throw new InternalServerErrorException('data not found')
        }
    }

    createUser(data: any) {
        let newUser = { id: Date.now(), ...data }
        this.users.push(newUser)

        return {
            message: 'user created successfully',
            user: newUser
        }

    }


    updateUser(name, body) {
        let message;
        this.users.forEach(user => {
            if (user.name == name) {
                Object.assign(user, body);
                message = 'user has been update successfully.';
            }
        })

        return {
            message: message ?? `user not exist with name ${name}.`,
            user: body
        }
    }

    deleteUser(name) {
        let idx = this.users.indexOf(this.getUserByName(name));
        let deleted = this.users.splice(idx, 1)

        return {
            message: 'user has been deleted successfully',
            user: {
                ...deleted
            }
        }
    }
}

import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { ValidatePromise, IsEmpty, IsEmail, IsNotEmpty, Max, MinLength, MaxLength, validate, Validate } from "class-validator";
import { hash } from "bcrypt";
import { CustomEmail } from "../validator/type-orm-custom-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty({ message: "First name is required" })
    firstName: string

    @Column()
    lastName: string

    @Column()
    @IsNotEmpty({ message: "Username is required" })
    username: string

    @Column({ nullable: true, type: "varchar" })
    dob: string

    @Column()
    @MinLength(11, { message: "Mobile Number must be at least 11 characters long" })
    mobile_number: string

    @Column({ unique: true })
    @IsEmail({}, { message: "Email is not valid" })
    email: string

    @Column({ nullable: true })
    image: string

    @Column()
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await hash(this.password, 12);
    }

}

import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({
    type:'bigint',
    name: 'id',
  })
  id: string;
  
  @Column({
    nullable: false,
    default: '',
    name:'first_name'
  })
  firstName: string;

  @Column({
    nullable: false,
    default: '',
    name:'last_name'
  })
  lastName: string;

  @Column({
    name: 'email',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: true,
    name:'profile_picture'
  })
  profile: string;

 @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

 @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

 @DeleteDateColumn ({
    type: 'timestamp with time zone',
    name: 'deleted_at',
    nullable:false,
 })
 deletedAt: Date
}
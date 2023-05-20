import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Coins } from './index';

@Entity('user_coin_mapping')
export class UserCoinMapping {
  @PrimaryGeneratedColumn({
    type:'bigint',
    name: 'id',
  })
  id: string;
  
  @Column({
    type:'bigint',
    nullable: false,
    name:'coin_id'
  })
  coinId: string;

  @Column({
    type:'bigint',
    nullable: false,
    name:'user_id'
  })
  userId: string;


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

 @ManyToOne(() => User, (user) => user.userCoinMapping)
 @JoinColumn({
     name: 'user_id',
     referencedColumnName:'id'
 })
 user: User;

 @ManyToOne(() => Coins, (coin) => coin.userCoinMapping)
 @JoinColumn({
    name: 'coin_id',
    referencedColumnName:'id'
 })
 coin:Coins;
}
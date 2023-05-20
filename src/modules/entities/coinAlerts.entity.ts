import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Coins } from './coins.entity';

@Entity('coin_alerts')
export class CoinAlerts {
  @PrimaryGeneratedColumn({
    type:'bigint',
    name: 'id',
  })
  id: string;
  
  @Column({
    nullable: false,
    type:'bigint',
    name:'coin_id'
  })
  coinId: string;

  @Column({
    nullable: false,
    name:'user_id',
    type:'bigint',
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



 @ManyToOne(() => Coins, (coin) => coin.coinAlerts)
 @JoinColumn({
    name: 'coin_id',
    referencedColumnName:'id'
 })
 coin:Coins;
}
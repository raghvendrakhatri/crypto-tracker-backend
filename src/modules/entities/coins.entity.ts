import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { UserCoinMapping } from './userCoinMapping.entity';
import { CoinAlerts } from './coinAlerts.entity';

@Entity('coins')
@Unique(['coinSymbol'])
export class Coins {
  @PrimaryGeneratedColumn({
    type:'bigint',
    name: 'id',
  })
  id: string;
  
  @Column({
    nullable: false,
    default: '',
    name:'coin_name'
  })
  coinName: string;

  @Column({
    nullable: false,
    name:'coin_id'
  })
  coinId: string;

  @Column({
    name: 'coin_symbol',
    nullable: false,
    default: '',
  })
  coinSymbol: string;

  @Column({
    nullable: true,
    type:'float',
    name:'coin_price'
  })
  coinPrice: number;


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


 @OneToMany(() => UserCoinMapping, (userCoinMapping) => userCoinMapping.coin)
 userCoinMapping: UserCoinMapping[];

 @OneToMany(() => CoinAlerts, (coinAlerts) => coinAlerts.coin)
 coinAlerts: CoinAlerts[];
}
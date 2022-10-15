import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { EStatusOrder } from '../enum/comfirm-order.enum';

export class ConfirmOrder {
  @ApiProperty({
    enum: EStatusOrder,
    example: `${EStatusOrder.CANCEL}|${EStatusOrder.APPROVE}`,
  })
  @IsIn([EStatusOrder])
  orderStatus: EStatusOrder;
}

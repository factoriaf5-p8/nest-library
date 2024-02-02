import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({
    example: 'Esta edición del Ingenioso hidalgo don Quijote de la Mancha ...',
  })
  readonly description: string;

  @ApiProperty({ example: 'www.imagen.com/quijote.png' })
  readonly image_url: string;
}

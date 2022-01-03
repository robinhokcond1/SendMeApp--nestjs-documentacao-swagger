import { ApiProperty } from "@nestjs/swagger";

export class CreateMensagemDto {
    @ApiProperty({
        example: 'Rafaela Alves',
        description: `O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa cadastrada.`,
    })
    readonly nick: string;

    @ApiProperty({
        example: 'O amanhã pertence somente a você!',
        description: `Mensagem a ser cadastrada.`,
    })
    readonly mensagem: string;
}

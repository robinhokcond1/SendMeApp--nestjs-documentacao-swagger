import { Body, Controller, Delete, Get, HttpStatus, Res, Post, Put, Param, ParseUUIDPipe, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMensagemDto } from './dto/create-mensagem-dto';
import { MensagemService } from './mensagem.service';

@Controller('mensagem')

@ApiTags('Mensagens')
export class MensagemController {
    constructor (private mensagemService: MensagemService){

    }

    @Post()
    create (@Body() createMensagemDto: CreateMensagemDto, @Res() response){
        this.mensagemService.createMensagem(createMensagemDto).then( mensagem =>{
            response.status(HttpStatus.CREATED).json(mensagem);
        }).catch( () =>{
            response.status(HttpStatus.FORBIDDEN).json({mensagem: 'Erro na criação da mensagem'});
        });
    }

    @Get()
    getAll(@Res() response){
        this.mensagemService.getAll().then(mensagemList => {
            response.status(HttpStatus.OK).json(mensagemList);
        }).catch( () =>{
            response.status(HttpStatus.FORBIDDEN).json({mensagem: 'Erro ao listar mensagem !'});
        });
    }

    @Get(':id')
    async show(@Param('id', new ParseIntPipe()) id: number){
        return await this.mensagemService.findOne(id);
    }

    @Put(':id')
    update(@Body()  updateMensagemDto: CreateMensagemDto, @Res() response, @Param('id',  new ParseIntPipe()) idMensagem: number){
        this.mensagemService.updateMensagem(idMensagem, updateMensagemDto).then(mensagem => {
            response.status(HttpStatus.OK).json(mensagem);
        }).catch(() =>{
            response.status(HttpStatus.FORBIDDEN).json({mensagem: 'Erro na edição da mensagem !'});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id',  new ParseIntPipe()) idMensagem: number){
        this.mensagemService.deleteMensagem(idMensagem).then(res => {
            response.status(HttpStatus.OK).json(res);
        }).catch(() =>{
            response.status(HttpStatus.FORBIDDEN).json({mensagem: 'Erro ao deletar a mensagem !'});
        });
    }


}

import { Request, Response } from 'express';

import { DiaSemanaPrisma, HorariosDisponiveis } from '../service/prisma';
const diaSemanaPrisma = new DiaSemanaPrisma();
const horariosDisponiveis = new HorariosDisponiveis();

export class CalendarioController {
  async getDiaSemana(req: Request, res: Response) {
    try {
      const calendario = await diaSemanaPrisma.getDias();
      if (calendario) {
        res.status(200).json(calendario);
      } else {
        res.status(404).json('Error encontrado, tente novamente');
      }
    } catch (error) {
      res.status(501).json(`Error interno encontrado: ${error}`);
    }
  }

  async gethorarioDsponivel(req: Request, res: Response) {
    const { diaSemanaId } = req.query;
    try {
      if (typeof diaSemanaId === 'string') {
        const diaSemanaIdNumber = parseInt(diaSemanaId); // Convertendo para número
        const horarios = await horariosDisponiveis.getHorarios(
          diaSemanaIdNumber
        );
        if (horarios) {
          res.status(200).json(horarios);
        } else {
          res.status(404).json('Error encontrado, tente novamente');
        }
      } else {
        res.status(400).json('Parâmetro diaSemanaId inválido');
      }
    } catch (error) {
      res.status(501).json(`Error interno encontrado: ${error}`);
    }
  }

  async putHorarioDisponivel(req: Request, res: Response) {
    const { id } = req.query;
    const { userId } = req.body;

    try {
      if (typeof id === 'string') {
        const horarioId = parseInt(id);
        const disponivel = await horariosDisponiveis.horarioDisponivel(
          horarioId,
          userId
        );
        if (disponivel) {
          res.status(200).json('SUCESSO: Horário marcado');
        } else {
          res.status(404).json('Erro encontrado, tente novamente');
        }
      }
    } catch (error) {
      res.status(500).send('Erro ao marcar horário.');
    }
  }
}

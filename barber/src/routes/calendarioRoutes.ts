import { Router } from 'express';
import { CalendarioController } from '../controllers/calendarioController';

export const calendarioRouter = Router();
const calendarioController = new CalendarioController();

calendarioRouter.get('/calendario', calendarioController.getDiaSemana);
calendarioRouter.get(
  '/horariosDisponiveis',
  calendarioController.gethorarioDsponivel
);
calendarioRouter.patch('/horarios', calendarioController.putHorarioDisponivel);

import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserPrisma {
  async createuser(
    name: string,
    apelido: string,
    numero: number,
    passwordNoHash: string
  ) {
    const password = await bcrypt.hash(passwordNoHash, 10);
    try {
      const user = await prisma.user.create({
        data: {
          name,
          apelido,
          numero,
          password,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUniqueUser(name: string, password: string) {
    try {
      const user = await prisma.user.findUnique({ where: { name } });

      if (!user) {
        return null; // Usuário não encontrado
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Senha incorreta'); // Senha incorreta
      }

      return user; // Retorna o usuário se tudo estiver correto
    } catch (error) {
      throw new Error(`Erro ao procurar usuário: ${error}`); // Lidar com erros
    }
  }

  async getUserById(userId: number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }
}
export class DiaSemanaPrisma {
  async getDias() {
    try {
      const getDia = await prisma.diaSemana.findMany();
      if (getDia) {
        return getDia;
      } else {
        return console.log('Nehum dia encontrado');
      }
    } catch (error) {
      console.log(`Error na requisição com o banco de dados: ${error}`);
    }
  }
}
export class HorariosDisponiveis {
  async getHorarios(diaSemanaId: number) {
    try {
      const getHorario = await prisma.horarioDisponivel.findMany({
        where: {
          diaSemanaId: diaSemanaId, // Converte para número, se necessário
        },
      });
      if (getHorario) {
        return getHorario;
      } else {
        return console.log('Nenhum horário encontrado');
      }
    } catch (error) {
      console.log(`Error na requisição com o banco de dados: ${error}`);
    }
  }

  async horarioDisponivel(horarioId: number, userId: number) {
    try {
      const changeDisponibilidade = await prisma.horarioDisponivel.update({
        where: { id: horarioId },
        data: { disponivel: false, userId: userId },
      });
      return changeDisponibilidade;
    } catch (error) {
      throw error;
    }
  }
}

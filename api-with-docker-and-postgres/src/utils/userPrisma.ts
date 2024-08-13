import { prisma } from "../config/prisma";

interface data {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export const createUser = (data: data) => {
  try {
    const user = prisma.user.create({
      data,
    });
    return user;
  } catch (error) {
    console.log(`O erro ao cadastrar encontado foi: ${error}`);
  }
};

export const getUser = () => {
  try {
    const user = prisma.user.findMany({});
    return user;
  } catch (error) {
    console.log(`O erro ao buscar encontado foi: ${error}`);
  }
};

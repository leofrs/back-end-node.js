-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaSemana" (
    "id" SERIAL NOT NULL,
    "dia" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiaSemana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorarioDisponivel" (
    "id" SERIAL NOT NULL,
    "periodo" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "diaSemanaId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "HorarioDisponivel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_numero_key" ON "User"("numero");

-- AddForeignKey
ALTER TABLE "HorarioDisponivel" ADD CONSTRAINT "HorarioDisponivel_diaSemanaId_fkey" FOREIGN KEY ("diaSemanaId") REFERENCES "DiaSemana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioDisponivel" ADD CONSTRAINT "HorarioDisponivel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

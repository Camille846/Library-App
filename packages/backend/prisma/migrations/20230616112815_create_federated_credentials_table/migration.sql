-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Facebook', 'Google', 'ApplicationLogin');

-- CreateTable
CREATE TABLE "FederatedCredentials" (
    "id" TEXT NOT NULL,
    "provider" "Provider" NOT NULL DEFAULT 'ApplicationLogin',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "FederatedCredentials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FederatedCredentials" ADD CONSTRAINT "FederatedCredentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

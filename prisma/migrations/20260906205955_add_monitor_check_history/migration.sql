/*
  Warnings:

  - The `method` column on the `monitor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `monitorId` on table `incident` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MonitorMethod" AS ENUM ('GET', 'PATCH', 'POST', 'DELETE', 'PUT');

-- DropForeignKey
ALTER TABLE "incident" DROP CONSTRAINT "incident_monitorId_fkey";

-- AlterTable
ALTER TABLE "incident" ALTER COLUMN "monitorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "monitor" DROP COLUMN "method",
ADD COLUMN     "method" "MonitorMethod" NOT NULL DEFAULT 'GET';

-- CreateTable
CREATE TABLE "MonitorCheck" (
    "id" TEXT NOT NULL,
    "monitorId" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL,
    "status" "MonitorStatus" NOT NULL,
    "statusCode" INTEGER,
    "responseTimeMs" INTEGER,
    "error" TEXT,

    CONSTRAINT "MonitorCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MonitorCheck_monitorId_checkedAt_idx" ON "MonitorCheck"("monitorId", "checkedAt");

-- AddForeignKey
ALTER TABLE "incident" ADD CONSTRAINT "incident_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitorCheck" ADD CONSTRAINT "MonitorCheck_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

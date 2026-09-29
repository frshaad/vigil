/*
  Warnings:

  - You are about to drop the column `config` on the `notification_channel` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `notification_channel` table. All the data in the column will be lost.
  - Added the required column `email` to the `notification_channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification_channel" DROP COLUMN "config",
DROP COLUMN "type",
ADD COLUMN     "email" TEXT NOT NULL;

-- DropEnum
DROP TYPE "NotificationChannelType";

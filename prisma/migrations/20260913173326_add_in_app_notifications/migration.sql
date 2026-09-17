-- CreateEnum
CREATE TYPE "InAppNotificationType" AS ENUM ('MONITOR_DOWN', 'MONITOR_RECOVERED');

-- CreateTable
CREATE TABLE "in_app_notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "monitorId" TEXT,
    "type" "InAppNotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "in_app_notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "in_app_notification_userId_readAt_createdAt_idx" ON "in_app_notification"("userId", "readAt", "createdAt");

-- CreateIndex
CREATE INDEX "in_app_notification_monitorId_createdAt_idx" ON "in_app_notification"("monitorId", "createdAt");

-- AddForeignKey
ALTER TABLE "in_app_notification" ADD CONSTRAINT "in_app_notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "in_app_notification" ADD CONSTRAINT "in_app_notification_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

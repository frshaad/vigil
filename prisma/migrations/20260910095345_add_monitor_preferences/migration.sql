-- CreateTable
CREATE TABLE "monitor_preference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "monitorId" TEXT NOT NULL,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitor_preference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "monitor_preference_monitorId_key" ON "monitor_preference"("monitorId");

-- CreateIndex
CREATE INDEX "monitor_preference_userId_isPinned_position_idx" ON "monitor_preference"("userId", "isPinned", "position");

-- AddForeignKey
ALTER TABLE "monitor_preference" ADD CONSTRAINT "monitor_preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_preference" ADD CONSTRAINT "monitor_preference_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

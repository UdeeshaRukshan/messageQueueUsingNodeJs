const { Worker } = require('bullmq');
const { refundProcess } = require('./refundProcess');
const { notificationProcess } = require('./notificationProcess');

// Redis connection options
const connection = {
    host: '127.0.0.1',
    port: 6379
};

// Create a worker to process refund jobs
const refundWorker = new Worker('refund-queue', async (job) => {
    try {
        console.log(`Refund Job ${job.id} started`);
        await refundProcess(job.data.id, job.data.amount, job.data.user_id);
        console.log(`Refund Job ${job.id} completed`);
    } catch (error) {
        console.error(`Refund Job ${job.id} failed: ${error.message}`);
    }
}, { connection });

// Create a worker to process notification jobs
const notificationWorker = new Worker('notification-queue', async (job) => {
    try {
        console.log(`Notification Job ${job.id} started`);
        await notificationProcess(job.data.user_id, job.data.order_id);
        console.log(`Notification Job ${job.id} completed`);
    } catch (error) {
        console.error(`Notification Job ${job.id} failed: ${error.message}`);
    }
}, { connection });

exports.refundWorker = refundWorker;
exports.notificationWorker = notificationWorker;

const { Queue } =require("bullmq")

const notificationQueue = new Queue("notification-queue",{
    connection:{
        host:"127.0.0.1",
        port:"6379"
    }
})

async function addNotificationTask(order){
    const response = await notificationQueue.add(`notify-${order.id}`,{
        id:order.id,
        user_id:order.user_id
    })

    console.log("Job added to notificationQueue with id: ",response.id)
}

exports.addNotificationTask=addNotificationTask
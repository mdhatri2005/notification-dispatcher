const queue=[];

let processing=false;

function addTask(task){
    queue.push(task);
    processQueue();
}

function processQueue(){

    if(processing) return;

    if(queue.length===0) return;

    processing=true;

    const task=queue.shift();

    task(()=>{

        processing=false;

        processQueue();

    });

}

module.exports={addTask};
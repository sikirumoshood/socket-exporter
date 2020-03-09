class Task {
    constructor(sock, params){
        this.chunkSize = params.chunk || 50; // Amount to fetch from db
        this.sock = sock; // Current socket connection
        this.db = params.db;
        this.query = params.query,
        this.cq = params.countQuery,
        this.page = 1;
        this.offset = 1;
        this.availablePages = 0;
        this.finished = false;
        this.pageCountHasBeenSet = false;
    }

    sendData (data){
        console.log('================== Sending data to client ... ');
        this.sock.emit('data', {
            count: data[0].count,
            data: data[1]
        });
        this.page++;
        
    }

    updateOffset(){
        this.offset = (this.page - 1) * this.chunkSize;
    }

    tellClientToRequestForMore(){
        this.sock.emit('requestForMore');
    }

    resetIfNecessary(data) {
        if(data.length === 0){
            this.finished = false;
            this.page = 1; 
            this.offset = 1;
            this.done();
        }else{
            this.tellClientToRequestForMore();
        }
    }

    done() {
        this.sock.emit('finished', { success: true });
        console.log('================= Task completed! ');
    }

    fetchData (){
       const Q1 =  this.db.oneOrNone(this.cq);
       const Q2 =  this.db.any(this.query, [ this.offset, this.chunkSize ]);
       const promise = Promise.all([ Q1, Q2 ]);
       return promise;
    }

    setTotalAvailablePages ({ count }) {
        this.availablePages = Math.ceil(parseFloat(count) / this.chunkSize);
        this.pageCountHasBeenSet = true;
        console.log('====================Total Set Available: ', this.availablePages);
    }

    start () {
        this.sock.on('getData', async () => {
            console.log('================== Fetching data from db ... ');      
            const data = await this.fetchData();
            if(!this.pageCountHasBeenSet) this.setTotalAvailablePages(data[0]);
            console.log('================== Finished Fetching data from db');
            this.sendData(data);
            this.updateOffset();
            this.resetIfNecessary(data[1]);          
        });
    }
}

module.exports = Task;
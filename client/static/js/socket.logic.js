$(document).ready(() =>{
    console.log('Loaded!');
});

const socket = io.connect('http://localhost:3000/');
// Uncomment the line below to enable socket debugging.
// localStorage.debug = '*';


function getButton (){
    return $('#fetchDataBtn');
}

function disableButton (btn) {
    btn.prop("disabled", true);
    btn.text("Fetching...");
    btn.css({cursor: "progress"});
}

function enableButton (btn){
    btn.prop("disabled", false);
    btn.text("Download");
    btn.css({cursor: "pointer"});
}

function attachHandlerToButton (btn, handler) {
    btn.on('click', handler );
}

function fetchData () {
    socket.emit('getData');
    // Disable button after first fetch
    disableButton(getButton());
}

function updateProgressCount (data) {
    let elem = $('.counter');
    const formerText = elem.text();
    let  [ count, total ] = formerText.split('/');
    count = Number(count);
    total = Number(total);
    count += Number(data.data.length);
    total = Number(data.count);

    elem.text(`${count}/${total}`);
    return { count, total };
    
}

function updateStatus ( text ) {
    $('.spinner').text(text);
}

function updateProgressBar ( { count, total } ) {   
    const progress = Math.ceil ( ( count / total ) * 100 );
    const actualProgress = Math.ceil ( ( progress / 100 ) * 92 );
    $('.progress__indicator').css("width", `${actualProgress}%`);
}

function processIncomingData () {
    socket.on('data', (data) => {
        console.log('====================DATA: ', data);
        updateStatus('Fetching ...');
        const stats = updateProgressCount(data);
        updateProgressBar(stats);

    });
}

function requestMoreData () {
    socket.on('requestForMore', () => {
        fetchData();
    });
}   

function finish() {
    socket.on('finished', () => {    
        console.log('====================FINISHED!');
        updateStatus('Completed');
        enableButton(getButton());
    });
}


// ===========================================================================

function main () {
    const Button = getButton();
    attachHandlerToButton( Button, fetchData );
    processIncomingData();
    requestMoreData();
    finish();
}

// Start app
main();


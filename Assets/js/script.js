const timeContainer = $('#time-container');
const clock = $('#clock');

// When we first load the page

// Show the clock
setInterval(function () {
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    $('#clock').text(time);
    
    
}, 1000);

// Create rows to display on screen
function createRow(time) {
    
    const timestamp = time + ':00';
    
    const row = $("<div>").attr('class', 'row border');
    
    const timeCol = $("<div>").attr('class', 'col-2 currency1').text(timestamp);
    
    row.append(timeCol);
    
    const inputCol = $("<div>").attr('class', 'col-8 currency2');
    
    
    
    const input = $("<input>").attr('type', 'text').attr('class', 'input-note');

    // If the time has an existing note, add to the input
    const existingNote = getNote(time);
    if (existingNote) {
        input.val(existingNote);
    }
    
    inputCol.append(input);
    
    row.append(inputCol);
    
    const buttonCol = $("<div>").attr('class', 'col-2 currency1');
    
    const button = $("<button>").attr('class', 'btn btn-primary save-note-btn').text("Save");
    
    buttonCol.append(button)
    
    row.append(buttonCol);
    
    
    return row;
}



    for (let time = 9; time < 18; time++) {

        const timeCompare = moment().format('HH')
        
        const row = createRow(time);
        
        if (timeCompare > time) {
            // if timeslot has passed - show grey colour

            $('.currency1').attr('class', 'col-2 past');
            $('.currency2').attr('class', 'col-8 past');

        } else if (timeCompare == time) {
            // if timeslot is current - show red colour

            $('.currency1').attr('class', 'col-2 present');
            $('.currency2').attr('class', 'col-8 present');
            
        } else if (timeCompare < time) {
            // if time is in future - show green colour

            $('.currency1').attr('class', 'col-2 future');
            $('.currency2').attr('class', 'col-8 future');

        }

        timeContainer.append(row)

    }



// Saving note to local storage
function saveNote(note, time) {

    localStorage.setItem(time, note);

}

$('.input-note').on('change', document, function (event) {
    console.log(event.target.value)

    const inputEl = $(event.target);

    const timestamp = (inputEl.parent().prev().text())

    const userInput = inputEl.val();
    // if click the save button?
    // save the note entered in the box to LocalStorage
    saveNote(userInput, timestamp)
    // if user didn't type anything, leave as is

})

// nothing happens







function getNote(time) {

    const timestamp = time + ":00"

    return localStorage.getItem(timestamp)
}

$('.save-note-btn').on("click", document, function (event) {

    const inputEl = $(event.target).parent().prev().children()[0];

    const userInput = $(inputEl).val();

    const timeEl = $(event.target).parent().prev().prev();

    const timestamp = timeEl.text()

    saveNote(userInput, timestamp)

});
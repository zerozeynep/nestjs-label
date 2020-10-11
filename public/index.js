

let labels = [{serialNumber:'6427', quantity:5}]
let labelsWithSum = [{serialNumber:'6427', quantity:5}]
let serialToDelete = null

$('.serial-btn').click(()=>{

  let labelInfo = {
    serialNumber: $('.serial-data').val()
  }

  $.ajax({
    url: '/',
    type: 'POST',
    data: JSON.stringify(labelInfo),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(res) {
  
      labelsWithSum.forEach( val  => {
        // console.log(val.serialNumber, res.serialNumber)
        if(val.serialNumber === res.serialNumber){
          console.log('equal')
          val.quantity += res.quantity
          $( `.merge-table tr:contains(${val.serialNumber})`).children('.quantity').html(val.quantity)
          console.log(val.quantity)
        } else {
          console.log('not equal')
          labelsWithSum.push(res)
          // TODO:: use a function that you pass table selector to it and it appends the row, 
          // use the same function for both merge table and unueque table, that will make it easier for you to debug your code and make it more readable
          $('.merge-table').append(`
          <tr>
          <th scope="row">
            <svg class="delete-row" width="2em" viewBox="0 0 16 16" class="bi bi-dash-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
            </svg>
          </th>
          <td class='serial-number'>${res.serialNumber}</td>
          <td class='quantity'>${res.quantity}</td>
          </tr>
          `)
        }
      })
      $('.unique-table').append(`
      <tr>
      <th scope="row">
        <svg class="delete-row" width="2em" viewBox="0 0 16 16" class="bi bi-dash-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg>
      </th>
      <td>${res.serialNumber}</td>
      <td>${res.quantity}</td>
      </tr>
  `)
    }
  });

})



$('body').on('click', '.delete-row', (element)=>{
  serialToDelete = element.target.closest('tr .serial-number')
  // $(element.target.closest('tr')).remove()
   
 })





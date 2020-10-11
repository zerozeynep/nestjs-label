

let labels = [{serialNumber:'6427', quantity:5}]
let labelsWithSum = [{serialNumber:'6427', quantity:5}]
let serialToDelete = null


function appendRow(selector, res){
 return selector.append(`
  <tr>
  <th scope="row">
    <svg class="delete-row" width="2em" viewBox="0 0 16 16" class="bi bi-dash-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
    </svg>
  </th>
  <td  class='serial-number ${res.serialNumber}'>${res.serialNumber}</td>
  <td class='quantity ${res.serialNumber}'>${res.quantity}</td>
  </tr>
  `)
}

$('.serial-btn').click(()=>{

  let labelInfo = {
    serialNumber: $('.serial-input').val()
  }

  $.ajax({
    url: '/',
    type: 'POST',
    data: JSON.stringify(labelInfo),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: (res)=> {
      appendRow($('.unique-table'),res)
      labels.push(res)
      let found = false
      for(let label of labelsWithSum){
        if(label.serialNumber == res.serialNumber){
          found = true
          console.log(label.serialNumber)
          console.log('eq')
          label.quantity += res.quantity
          $( `.merge-table tr:contains(${label.serialNumber})`).children('.quantity').html(label.quantity)
          break
        }
      }
      if(!found){
        labelsWithSum.push(res)
        appendRow($('.merge-table'),res)
      }
    },
    error: (err)=>console.log(err)
  });

})


$('body').on('click', '.delete-row', (element)=>{
  serialToDelete = $(element.target.closest('tr')).find('.serial-number').html()
  quantityToDelete = parseInt($(element.target.closest('tr')).find('.quantity').html())

  for (let label of labelsWithSum){
    if(serialToDelete == label.serialNumber){
      label.quantity -= quantityToDelete
      $( `.merge-table tr:contains(${label.serialNumber})`).children('.quantity').html(label.quantity)
    }
  }
  $(element.target.closest('tr')).remove()
 })